# transformer-gap

**Ephemeral.** Delete this whole directory once the UniParc annotation page React
components have been adapted to render `UniParcPrecomputedModel` from both the
precomputed endpoint and the UniFire-derived path (see `../spec.md`).

The purpose is to characterise the gap between the two data sources so React
work can be planned and validated.

## Contents

| File | Purpose |
| :--- | :--- |
| `accessions.txt` | One `UPI<hex>-<taxId>` per line. The fetch script's input. |
| `download.py` | Fetches UniFire + precomputed JSON for each accession. |
| `downloads/` | Output of `download.py`: `unifire/`, `precomputed/`, `precomputed_missing.txt`. |
| `analyze.py` | Python "shadow" analyzer — mirrors transformer dispatch logic, no Node needed. |
| `analyze.ts` | High-fidelity analyzer — calls the real `uniFireToPrecomputedConverter`. |

## Running

```bash
# 1) Fetch data (resumable; appends to downloads/)
python3 transformer-gap/download.py            # default: 50 successful completions
python3 transformer-gap/download.py --limit 0  # everything in accessions.txt

# 2) Analyze gaps
python3 transformer-gap/analyze.py             # fast, stdlib only
npx tsx transformer-gap/analyze.ts             # authoritative — runs the real TS transformer

# Optional flags on either analyzer
... --verbose          # per-accession detail
... --out gap.json     # also dump machine-readable report
```

### Running `analyze.ts`

`tsx` is not a project dependency (kept out of `package.json` to avoid adding to
the repo's supply-chain surface). Use `npx tsx` — it caches the download under
`~/.npm/_npx/` on first use, and you can wipe that cache when you're done.

`analyze.ts` only imports Node stdlib + the project's local TS source, so it
runs cleanly via `npx tsx` without Yarn PnP. The script pre-stubs the few
project modules that would otherwise drag in React / Sentry / SCSS at load
time (see comment at top of `analyze.ts`).

## How `analyze.ts` invokes the real transformer

The transformer transitively imports React components and SCSS via
`uniParcConverter` / `subEntry` / `logging`, none of which the transformer
itself executes at runtime. The script pre-registers minimal stubs for those
three modules in `require.cache` before requiring the transformer, so module
load succeeds in Node. The logging stub captures `warn`/`error` calls so
unknown UniFire annotation types surface in the report.

## Cleanup when done

```bash
rm -rf transformer-gap/
rm -rf ~/.npm/_npx        # wipes the npx download cache (tsx + esbuild)
```
