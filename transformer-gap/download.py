#!/usr/bin/env python3
"""Download UniFire and precomputed annotation JSON for accessions listed in
``accessions.txt``.

Each line in the input file is a ``UPI<digits>-<taxId>`` pair (e.g.
``UPI0000000001-10243``). For every accession this script fetches:

  1. Precomputed https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/precomputed/<UPI>/<tax>
  2. UniFire     https://rest.uniprot.org/uniprotkb/unifire/run?id=<UPI>&taxId=<tax>

If precomputed returns HTTP 404 the accession is recorded in
``<out-dir>/precomputed_missing.txt`` and the UniFire request is skipped — there
is nothing to diff against. On subsequent runs those accessions are skipped
without hitting either endpoint. Transient failures (network, timeout, 5xx)
are NOT recorded so they will be retried next run.

Saved as ``<out-dir>/<endpoint>/<accession>.json``. Existing files are skipped
so the script is safely resumable. Standard library only.

Usage:
    # Default: stop once 50 accessions have completed successfully
    # (both precomputed + unifire on disk). Failures and known-missing
    # accessions are skipped past without consuming the budget.
    python3 transformer-gap/download.py

    # Stop after N successful completions
    python3 transformer-gap/download.py --limit 10

    # No limit — walk every accession in the input file
    python3 transformer-gap/download.py --limit 0

    # Pacing: requests are spaced by --delay seconds (default 1.0)
    python3 transformer-gap/download.py --delay 2
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ACCESSION_RE = re.compile(r"^(UPI[0-9A-F]+)-(\d+)$")

UNIFIRE_URL = "https://rest.uniprot.org/uniprotkb/unifire/run?id={upi}&taxId={tax}"
PRECOMPUTED_URL = (
    "https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/precomputed/{upi}/{tax}"
)

MISSING_FILENAME = "precomputed_missing.txt"

REQUEST_HEADERS = {
    "Accept": "application/json",
    "User-Agent": "uniprot-website-test-download/1.0",
}


def parse_accession(accession: str) -> tuple[str, str]:
    match = ACCESSION_RE.match(accession)
    if not match:
        raise ValueError(
            f"Bad accession {accession!r}; expected 'UPI<hex>-<taxId>' "
            f"(only [0-9A-F] in UPI, digits in taxId)"
        )
    return match.group(1), match.group(2)


def fetch(url: str, timeout: float) -> tuple[int, bytes]:
    req = urllib.request.Request(url, headers=REQUEST_HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read() or b""


def load_missing(path: Path) -> set[str]:
    if not path.exists():
        return set()
    return {
        line.strip()
        for line in path.read_text().splitlines()
        if line.strip()
    }


def append_missing(path: Path, accession: str) -> None:
    with path.open("a") as f:
        f.write(f"{accession}\n")


def download_one(
    url: str,
    out_path: Path,
    label: str,
    accession: str,
    idx: int,
    total: int,
    timeout: float,
) -> int:
    """Fetch ``url`` and write JSON body to ``out_path``.

    Returns the HTTP status on a completed request (200 means saved), 0 on
    transport error, -1 on non-JSON body. Failure messages go to stderr.
    """
    try:
        status, body = fetch(url, timeout=timeout)
    except (urllib.error.URLError, TimeoutError, OSError) as e:
        print(
            f"[{idx}/{total}] error  {label:11s} {accession}: {e}",
            file=sys.stderr,
        )
        return 0

    if status != 200:
        snippet = body[:200].decode("utf-8", errors="replace").strip()
        print(
            f"[{idx}/{total}] HTTP {status} {label:11s} {accession} {snippet!r}",
            file=sys.stderr,
        )
        return status

    try:
        json.loads(body)
    except json.JSONDecodeError as e:
        print(
            f"[{idx}/{total}] bad-json {label:11s} {accession}: {e}",
            file=sys.stderr,
        )
        return -1

    out_path.write_bytes(body)
    print(f"[{idx}/{total}] saved  {label:11s} {accession}")
    return 200


def main() -> int:
    script_dir = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        "--accessions",
        type=Path,
        default=script_dir / "accessions.txt",
        help="File with one UPI-taxId per line (default: %(default)s)",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=script_dir / "downloads",
        help="Output directory (default: %(default)s)",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=50,
        help="Stop after this many accessions complete successfully (both "
        "precomputed and unifire on disk). Failures and known-missing do not "
        "count. 0 means no limit (default: %(default)s)",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        help="Seconds to wait between HTTP requests (default: %(default)s)",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=30.0,
        help="Per-request HTTP timeout in seconds (default: %(default)s)",
    )
    args = parser.parse_args()

    if not args.accessions.exists():
        print(f"accessions file not found: {args.accessions}", file=sys.stderr)
        return 2

    accessions = [
        line.strip()
        for line in args.accessions.read_text().splitlines()
        if line.strip()
    ]

    for label in ("unifire", "precomputed"):
        (args.out_dir / label).mkdir(parents=True, exist_ok=True)

    missing_path = args.out_dir / MISSING_FILENAME
    missing = load_missing(missing_path)

    fetched = skipped = missing_skipped = failed = completed = 0
    needs_delay = False
    total = len(accessions)
    limit = args.limit  # 0 means no limit

    for idx, accession in enumerate(accessions, 1):
        if limit and completed >= limit:
            break

        try:
            upi, tax = parse_accession(accession)
        except ValueError as e:
            print(f"[{idx}/{total}] {e}", file=sys.stderr)
            failed += 1
            continue

        precomputed_path = args.out_dir / "precomputed" / f"{accession}.json"
        unifire_path = args.out_dir / "unifire" / f"{accession}.json"

        # 1) Precomputed first — if missing, there's nothing to diff against.
        if accession in missing:
            print(
                f"[{idx}/{total}] skip   precomputed {accession} (known 404); "
                f"skip unifire too"
            )
            missing_skipped += 1
            continue

        precomputed_ok = False
        if precomputed_path.exists():
            print(
                f"[{idx}/{total}] skip   precomputed {accession} (exists)"
            )
            skipped += 1
            precomputed_ok = True
        else:
            if needs_delay:
                time.sleep(args.delay)
            needs_delay = True

            status = download_one(
                PRECOMPUTED_URL.format(upi=upi, tax=tax),
                precomputed_path,
                "precomputed",
                accession,
                idx,
                total,
                args.timeout,
            )
            if status == 200:
                fetched += 1
                precomputed_ok = True
            elif status == 404:
                missing.add(accession)
                append_missing(missing_path, accession)
                print(
                    f"[{idx}/{total}] recorded {accession} as missing; "
                    f"skip unifire"
                )
                missing_skipped += 1
                continue
            else:
                # transport error, 5xx, or non-JSON — transient, retry later;
                # also skip unifire so we don't waste a request.
                failed += 1
                continue

        # 2) UniFire — only reached when precomputed is in hand.
        unifire_ok = False
        if unifire_path.exists():
            print(f"[{idx}/{total}] skip   unifire     {accession} (exists)")
            skipped += 1
            unifire_ok = True
        else:
            if needs_delay:
                time.sleep(args.delay)
            needs_delay = True

            status = download_one(
                UNIFIRE_URL.format(upi=upi, tax=tax),
                unifire_path,
                "unifire",
                accession,
                idx,
                total,
                args.timeout,
            )
            if status == 200:
                fetched += 1
                unifire_ok = True
            else:
                failed += 1

        if precomputed_ok and unifire_ok:
            completed += 1

    print(
        f"\nDone. completed={completed} fetched={fetched} skipped={skipped} "
        f"missing={missing_skipped} failed={failed}",
        file=sys.stderr,
    )
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
