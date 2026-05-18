#!/usr/bin/env python3
"""Characterise the gap between UniFire-derived and precomputed UniParc SAP data.

For each accession we have a UniFire JSON (``downloads/unifire/``) and, when
RefSeq, a precomputed JSON (``downloads/precomputed/``). The TypeScript
transformer at ``src/uniparc/adapters/uniFireToUniProtkbConverter.ts`` converts
UniFire predictions into a ``UniParcPrecomputedModel`` shape so a single
downstream pipeline can render both data sources. UniFire-derived models are
intentionally *thinner* than precomputed ones (no keyword ids, flat-text
subcellular locations, generic evidence sources, fewer fields), and that
thinness is permanent — see ``spec.md``.

This script does not run the TS transformer. Instead it projects what the
transformer would produce by reading UniFire predictions through the same
``UniFireAnnotationTypeToSection`` mapping the TS code uses, and compares that
projection against the actual precomputed JSON. The goal is to produce an
actionable report for the React team adapting the UniParc annotation page.

Outputs (human-readable to stdout, optional JSON via --out):

  1. Corpus summary
  2. UniFire annotationType coverage (with unknown types flagged)
  3. Projected transformer output counts (commentType, featureType, xrefs, ...)
  4. Precomputed structural inventory (fields, comment shapes, xref databases,
     evidence sources)
  5. Per-pair gap analysis aggregated over the corpus
  6. React adaptation checklist derived from 4 + 5

Usage:
    python3 transformer-gap/analyze.py
    python3 transformer-gap/analyze.py --verbose       # per-pair diffs
    python3 transformer-gap/analyze.py --out gap.json  # also dump JSON

Standard library only.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# 1. Load the UniFireAnnotationTypeToSection mapping from the TS source so the
#    Python projection stays in lockstep with the transformer's known types.
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
MAPPING_TS = PROJECT_ROOT / "src/uniparc/config/UniFireAnnotationTypeToSection.ts"

# Regex over the TS source: key, then optional freeTextType / featureType.
_ENTRY_RE = re.compile(
    r"'(?P<key>[^']+)':\s*\{(?P<body>[^}]*)\}",
    re.MULTILINE | re.DOTALL,
)
_FREE_RE = re.compile(r"freeTextType:\s*'(?P<v>[^']+)'")
_FEAT_RE = re.compile(r"featureType:\s*'(?P<v>[^']+)'")


def load_mapping() -> dict[str, dict[str, str]]:
    """Return ``{annotationType: {'freeTextType'?: str, 'featureType'?: str}}``.

    Parsed directly from the TS source so this script never drifts from the
    transformer's known types.
    """
    text = MAPPING_TS.read_text()
    # Restrict to the contents of the annotationTypeToSection literal.
    start = text.index("const annotationTypeToSection")
    end = text.index("export const groupTypesBySection", start)
    body = text[start:end]

    mapping: dict[str, dict[str, str]] = {}
    for m in _ENTRY_RE.finditer(body):
        key = m.group("key")
        entry_body = m.group("body")
        entry: dict[str, str] = {}
        free = _FREE_RE.search(entry_body)
        feat = _FEAT_RE.search(entry_body)
        if free:
            entry["freeTextType"] = free.group("v")
        if feat:
            entry["featureType"] = feat.group("v")
        mapping[key] = entry
    return mapping


# Hard-coded annotation types the transformer handles directly (not via the
# mapping file) — see uniFireToUniProtkbConverter.ts.
DIRECT_TYPES = {
    "keyword",
    "protein.recommendedName.fullName",
    "protein.alternativeName.fullName",
    "xref.GO",
}


# ---------------------------------------------------------------------------
# 2. Project the transformer's output from a UniFire JSON (counts only — we
#    don't need to reconstruct full objects to characterise the gap).
# ---------------------------------------------------------------------------


def project_unifire(
    data: dict[str, Any], mapping: dict[str, dict[str, str]]
) -> dict[str, Any]:
    """Return what the transformer would produce, summarised.

    Mirrors the dispatching logic in uniFireToUniProtkbConverter.ts.
    """
    comments_by_type: Counter[str] = Counter()
    features_by_type: Counter[str] = Counter()
    keywords = 0
    xrefs_by_db: Counter[str] = Counter()
    recommended_names = 0
    alternative_names = 0
    unknown_types: Counter[str] = Counter()
    dropped_predictions = 0  # well-typed annotation but missing required fields

    predictions = data.get("predictions") or []
    for p in predictions:
        atype = p.get("annotationType")
        avalue = p.get("annotationValue")

        if atype == "keyword":
            if isinstance(avalue, str):
                keywords += 1
            else:
                dropped_predictions += 1
            continue

        if atype == "protein.recommendedName.fullName":
            if isinstance(avalue, str):
                recommended_names += 1
            else:
                dropped_predictions += 1
            continue

        if atype == "protein.alternativeName.fullName":
            if isinstance(avalue, str):
                alternative_names += 1
            else:
                dropped_predictions += 1
            continue

        if atype == "xref.GO":
            if isinstance(avalue, str):
                xrefs_by_db["GO"] += 1
            else:
                dropped_predictions += 1
            continue

        section = mapping.get(atype)
        if section is None:
            unknown_types[atype or "<missing>"] += 1
            continue

        if "freeTextType" in section:
            if isinstance(avalue, str):
                comments_by_type[section["freeTextType"]] += 1
            else:
                dropped_predictions += 1
        elif "featureType" in section:
            if p.get("start") is not None and p.get("end") is not None:
                features_by_type[section["featureType"]] += 1
            else:
                dropped_predictions += 1
        else:
            unknown_types[atype] += 1

    # First recommendedName is used; the rest are duplicates the transformer
    # discards by design. Report both numbers so the React team can judge how
    # often this duplicate-drop happens.
    recommended_kept = 1 if recommended_names > 0 else 0
    recommended_discarded = max(0, recommended_names - 1)

    return {
        "commentsByType": dict(comments_by_type),
        "featuresByType": dict(features_by_type),
        "keywords": keywords,
        "xrefsByDb": dict(xrefs_by_db),
        "recommendedKept": recommended_kept,
        "recommendedDiscarded": recommended_discarded,
        "alternativeNames": alternative_names,
        "unknownTypes": dict(unknown_types),
        "droppedPredictions": dropped_predictions,
        "totalPredictions": len(predictions),
    }


# ---------------------------------------------------------------------------
# 3. Summarise the shape of a precomputed JSON.
# ---------------------------------------------------------------------------


def summarise_precomputed(data: dict[str, Any]) -> dict[str, Any]:
    top_fields = set(data.keys())

    comments_by_type: Counter[str] = Counter()
    # commentType -> set of "shape kinds" — texts, subcellularLocations, …
    comment_shapes: dict[str, Counter[str]] = defaultdict(Counter)
    for c in data.get("comments") or []:
        ct = c.get("commentType", "<unknown>")
        comments_by_type[ct] += 1
        for shape_key in (
            "texts",
            "subcellularLocations",
            "reaction",
            "physiologicalReactions",
            "cofactors",
            "interactions",
            "diseases",
            "events",
            "isoforms",
            "note",
        ):
            if shape_key in c:
                comment_shapes[ct][shape_key] += 1
        # Also flag any unknown shape keys so we don't miss something.
        for k in c.keys():
            if k in {"commentType", "molecule"}:
                continue
            if k not in {
                "texts",
                "subcellularLocations",
                "reaction",
                "physiologicalReactions",
                "cofactors",
                "interactions",
                "diseases",
                "events",
                "isoforms",
                "note",
            }:
                comment_shapes[ct][f"other:{k}"] += 1

    features_by_type: Counter[str] = Counter()
    for f in data.get("features") or []:
        features_by_type[f.get("type", "<unknown>")] += 1

    keyword_fields: Counter[str] = Counter()
    keyword_total = 0
    for k in data.get("keywords") or []:
        keyword_total += 1
        for field in ("id", "category", "name", "evidences"):
            if field in k:
                keyword_fields[field] += 1

    xrefs_by_db: Counter[str] = Counter()
    for x in data.get("uniProtKBCrossReferences") or []:
        xrefs_by_db[x.get("database", "<unknown>")] += 1

    # Distinct evidence sources used anywhere in the JSON.
    evidence_sources: Counter[str] = Counter()

    def collect_evidences(obj: Any) -> None:
        if isinstance(obj, dict):
            if obj.get("evidenceCode") and "source" in obj:
                evidence_sources[obj.get("source", "<unknown>")] += 1
            for v in obj.values():
                collect_evidences(v)
        elif isinstance(obj, list):
            for v in obj:
                collect_evidences(v)

    collect_evidences(data)

    has_protein_description = bool(data.get("proteinDescription"))
    has_recommended = bool(
        (data.get("proteinDescription") or {}).get("recommendedName")
    )
    has_alternative = bool(
        (data.get("proteinDescription") or {}).get("alternativeNames")
    )

    return {
        "topFields": top_fields,
        "commentsByType": dict(comments_by_type),
        "commentShapes": {ct: dict(v) for ct, v in comment_shapes.items()},
        "featuresByType": dict(features_by_type),
        "keywordTotal": keyword_total,
        "keywordFieldPresence": dict(keyword_fields),
        "xrefsByDb": dict(xrefs_by_db),
        "evidenceSources": dict(evidence_sources),
        "hasProteinDescription": has_protein_description,
        "hasRecommended": has_recommended,
        "hasAlternative": has_alternative,
    }


# ---------------------------------------------------------------------------
# 4. Aggregate helpers + reporting.
# ---------------------------------------------------------------------------


def merge_counter(dst: Counter[str], src: dict[str, int]) -> None:
    for k, v in src.items():
        dst[k] += v


def merge_nested_counter(
    dst: dict[str, Counter[str]], src: dict[str, dict[str, int]]
) -> None:
    for k, sub in src.items():
        merge_counter(dst[k], sub)


def fmt_counter(c: dict[str, int] | Counter[str], indent: str = "    ") -> str:
    if not c:
        return f"{indent}(none)"
    items = sorted(c.items(), key=lambda kv: (-kv[1], kv[0]))
    width = max(len(k) for k, _ in items)
    return "\n".join(f"{indent}{k.ljust(width)}  {v}" for k, v in items)


# Top-level UniProtKBAPIModel fields the transformer never produces. Anything
# in precomputed beyond this set will be missing from UniFire-derived models.
TRANSFORMER_PRODUCES = {
    "entryType",
    "primaryAccession",
    "uniProtkbId",
    "annotationScore",
    "comments",
    "features",
    "keywords",
    "proteinDescription",
    "uniProtKBCrossReferences",
    "extraAttributes",
}


def report(
    pairs: dict[str, tuple[Path | None, Path | None]],
    mapping: dict[str, dict[str, str]],
    verbose: bool,
) -> dict[str, Any]:
    unifire_only = sum(1 for u, p in pairs.values() if u and not p)
    precomputed_only = sum(1 for u, p in pairs.values() if p and not u)
    both = sum(1 for u, p in pairs.values() if u and p)

    # ------ corpus-wide aggregates ------
    unifire_annotation_type_freq: Counter[str] = Counter()
    projected_comments: Counter[str] = Counter()
    projected_features: Counter[str] = Counter()
    projected_xrefs: Counter[str] = Counter()
    projected_keywords = 0
    projected_alt_names = 0
    projected_recommended_discarded = 0
    projected_dropped = 0
    unknown_types_global: Counter[str] = Counter()

    precomp_top_field_freq: Counter[str] = Counter()
    precomp_comments_by_type: Counter[str] = Counter()
    precomp_comment_shapes: dict[str, Counter[str]] = defaultdict(Counter)
    precomp_features_by_type: Counter[str] = Counter()
    precomp_keyword_field_freq: Counter[str] = Counter()
    precomp_keyword_total = 0
    precomp_xrefs_by_db: Counter[str] = Counter()
    precomp_evidence_sources: Counter[str] = Counter()
    precomp_has_recommended = 0
    precomp_has_alternative = 0

    # ------ per-pair gap aggregates ------
    pair_count = 0
    delta_comments = 0
    delta_features = 0
    delta_keywords = 0
    delta_xrefs = 0
    # commentType -> count of precomputed-only structured shapes (e.g.
    # SUBCELLULAR LOCATION with subcellularLocations)
    structured_shapes_unreachable: dict[str, Counter[str]] = defaultdict(Counter)
    # xref databases in precomputed beyond GO
    extra_xref_dbs: Counter[str] = Counter()
    # evidence sources in precomputed that the transformer does NOT emit
    resolved_evidence_sources: Counter[str] = Counter()
    # top-level fields in precomputed never produced by transformer
    untransformed_fields: Counter[str] = Counter()
    # comment types and feature types in precomputed but absent from
    # the transformer's projection for the same accession
    unreachable_comment_types: Counter[str] = Counter()
    unreachable_feature_types: Counter[str] = Counter()

    per_pair: list[dict[str, Any]] = []

    # The transformer can produce these evidence sources (see
    # constructPredictionEvidences). Anything else is precomputed-only.
    TRANSFORMER_EVIDENCE_SOURCES = {"ARBA", "UniRule"}

    for accession, (u_path, p_path) in sorted(pairs.items()):
        if u_path:
            u_data = json.loads(u_path.read_text())
            for pred in u_data.get("predictions") or []:
                unifire_annotation_type_freq[
                    pred.get("annotationType") or "<missing>"
                ] += 1
            projection = project_unifire(u_data, mapping)
            merge_counter(projected_comments, projection["commentsByType"])
            merge_counter(projected_features, projection["featuresByType"])
            merge_counter(projected_xrefs, projection["xrefsByDb"])
            projected_keywords += projection["keywords"]
            projected_alt_names += projection["alternativeNames"]
            projected_recommended_discarded += projection["recommendedDiscarded"]
            projected_dropped += projection["droppedPredictions"]
            merge_counter(unknown_types_global, projection["unknownTypes"])
        else:
            projection = None

        if p_path:
            p_data = json.loads(p_path.read_text())
            p_summary = summarise_precomputed(p_data)
            for f in p_summary["topFields"]:
                precomp_top_field_freq[f] += 1
            merge_counter(precomp_comments_by_type, p_summary["commentsByType"])
            merge_nested_counter(precomp_comment_shapes, p_summary["commentShapes"])
            merge_counter(precomp_features_by_type, p_summary["featuresByType"])
            merge_counter(
                precomp_keyword_field_freq, p_summary["keywordFieldPresence"]
            )
            precomp_keyword_total += p_summary["keywordTotal"]
            merge_counter(precomp_xrefs_by_db, p_summary["xrefsByDb"])
            merge_counter(precomp_evidence_sources, p_summary["evidenceSources"])
            if p_summary["hasRecommended"]:
                precomp_has_recommended += 1
            if p_summary["hasAlternative"]:
                precomp_has_alternative += 1
        else:
            p_summary = None

        if projection is not None and p_summary is not None:
            pair_count += 1

            n_proj_comments = sum(projection["commentsByType"].values())
            n_pre_comments = sum(p_summary["commentsByType"].values())
            n_proj_features = sum(projection["featuresByType"].values())
            n_pre_features = sum(p_summary["featuresByType"].values())
            n_pre_keywords = p_summary["keywordTotal"]
            n_proj_xrefs = sum(projection["xrefsByDb"].values())
            n_pre_xrefs = sum(p_summary["xrefsByDb"].values())

            delta_comments += n_pre_comments - n_proj_comments
            delta_features += n_pre_features - n_proj_features
            delta_keywords += n_pre_keywords - projection["keywords"]
            delta_xrefs += n_pre_xrefs - n_proj_xrefs

            # Structured comment shapes the transformer can never produce:
            # the transformer only ever emits the `texts` shape.
            for ct, shape_counts in p_summary["commentShapes"].items():
                for shape, n in shape_counts.items():
                    if shape != "texts":
                        structured_shapes_unreachable[ct][shape] += n

            # Comment types in precomputed but not in the projection.
            for ct in p_summary["commentsByType"]:
                if ct not in projection["commentsByType"]:
                    unreachable_comment_types[ct] += p_summary["commentsByType"][ct]

            # Feature types in precomputed but not in the projection.
            for ft in p_summary["featuresByType"]:
                if ft not in projection["featuresByType"]:
                    unreachable_feature_types[ft] += p_summary["featuresByType"][ft]

            # Cross-reference databases beyond what the transformer produces (GO).
            for db, n in p_summary["xrefsByDb"].items():
                if db != "GO":
                    extra_xref_dbs[db] += n

            # Evidence sources the transformer can't emit.
            for src, n in p_summary["evidenceSources"].items():
                if src not in TRANSFORMER_EVIDENCE_SOURCES:
                    resolved_evidence_sources[src] += n

            # Top-level fields the transformer never produces.
            for f in p_summary["topFields"]:
                if f not in TRANSFORMER_PRODUCES:
                    untransformed_fields[f] += 1

            if verbose:
                per_pair.append(
                    {
                        "accession": accession,
                        "projectedComments": n_proj_comments,
                        "precomputedComments": n_pre_comments,
                        "projectedFeatures": n_proj_features,
                        "precomputedFeatures": n_pre_features,
                        "projectedKeywords": projection["keywords"],
                        "precomputedKeywords": n_pre_keywords,
                        "unknownTypes": projection["unknownTypes"],
                        "precomputedExtraTopFields": sorted(
                            f
                            for f in p_summary["topFields"]
                            if f not in TRANSFORMER_PRODUCES
                        ),
                    }
                )

    # ---------------- print human-readable report ----------------
    out = sys.stdout.write

    def section(title: str) -> None:
        out("\n" + "=" * 78 + "\n")
        out(f"  {title}\n")
        out("=" * 78 + "\n")

    section("1. Corpus")
    out(f"  pairs (both files):        {both}\n")
    out(f"  unifire-only:              {unifire_only}\n")
    out(f"  precomputed-only:          {precomputed_only}\n")
    out(f"  total accessions:          {len(pairs)}\n")

    section("2. UniFire annotationType coverage")
    out("  type | count | known? | maps to\n")
    out("  " + "-" * 74 + "\n")
    for atype, n in sorted(
        unifire_annotation_type_freq.items(), key=lambda kv: (-kv[1], kv[0])
    ):
        if atype in DIRECT_TYPES:
            known = "yes"
            target = {
                "keyword": "keywords[]",
                "protein.recommendedName.fullName": "proteinDescription.recommendedName",
                "protein.alternativeName.fullName": "proteinDescription.alternativeNames[]",
                "xref.GO": "uniProtKBCrossReferences[]",
            }[atype]
        elif atype in mapping:
            known = "yes"
            entry = mapping[atype]
            target = (
                f"comments[].{entry['freeTextType']}"
                if "freeTextType" in entry
                else f"features[].{entry.get('featureType', '?')}"
            )
        else:
            known = "NO (would be silently dropped)"
            target = "—"
        out(f"  {atype:48s} {n:5d}  {known:14s} {target}\n")

    if unknown_types_global:
        out("\n  *** Unknown annotation types encountered ***\n")
        for atype, n in sorted(
            unknown_types_global.items(), key=lambda kv: (-kv[1], kv[0])
        ):
            out(f"    {atype}  (n={n})\n")

    section("3. Projected transformer output (from UniFire predictions)")
    out("  commentsByType:\n")
    out(fmt_counter(projected_comments) + "\n")
    out("\n  featuresByType:\n")
    out(fmt_counter(projected_features) + "\n")
    out("\n  uniProtKBCrossReferences (by database):\n")
    out(fmt_counter(projected_xrefs) + "\n")
    out(f"\n  keywords total:                  {projected_keywords}\n")
    out(f"  alternative names total:         {projected_alt_names}\n")
    out(
        f"  recommendedName duplicates dropped (1st kept): "
        f"{projected_recommended_discarded}\n"
    )
    out(f"  predictions skipped (bad shape): {projected_dropped}\n")

    section("4. Precomputed structural inventory")
    out("  top-level fields seen (frequency):\n")
    out(fmt_counter(precomp_top_field_freq) + "\n")
    out("\n  commentsByType:\n")
    out(fmt_counter(precomp_comments_by_type) + "\n")
    out("\n  comment shapes (per commentType):\n")
    for ct in sorted(precomp_comment_shapes):
        shapes = precomp_comment_shapes[ct]
        rendered = ", ".join(
            f"{shape}={n}"
            for shape, n in sorted(shapes.items(), key=lambda kv: (-kv[1], kv[0]))
        )
        out(f"    {ct}: {rendered}\n")
    out("\n  featuresByType:\n")
    out(fmt_counter(precomp_features_by_type) + "\n")
    out(f"\n  keyword total:               {precomp_keyword_total}\n")
    out("  keyword field presence:\n")
    out(fmt_counter(precomp_keyword_field_freq) + "\n")
    out("\n  uniProtKBCrossReferences (by database):\n")
    out(fmt_counter(precomp_xrefs_by_db) + "\n")
    out("\n  evidence sources seen anywhere:\n")
    out(fmt_counter(precomp_evidence_sources) + "\n")
    out(f"\n  has proteinDescription.recommendedName: {precomp_has_recommended}\n")
    out(f"  has proteinDescription.alternativeNames: {precomp_has_alternative}\n")

    section("5. Gap analysis (paired accessions only)")
    out(f"  pairs analysed: {pair_count}\n")
    if pair_count:
        out(
            "\n  totals (precomputed - transformer projection) — positive means\n"
            "  precomputed has more; negative means the transformer projection\n"
            "  has more (likely from UniFire predictions that didn't survive\n"
            "  precomputation):\n"
        )
        out(f"    Δ comments: {delta_comments:+d}\n")
        out(f"    Δ features: {delta_features:+d}\n")
        out(f"    Δ keywords: {delta_keywords:+d}\n")
        out(f"    Δ xrefs:    {delta_xrefs:+d}\n")

        out(
            "\n  comment types in precomputed never produced by the projection\n"
            "  (would render as empty for UniFire-derived entries):\n"
        )
        out(fmt_counter(unreachable_comment_types) + "\n")

        out(
            "\n  feature types in precomputed never produced by the projection:\n"
        )
        out(fmt_counter(unreachable_feature_types) + "\n")

        out(
            "\n  structured comment shapes the transformer CANNOT emit (it\n"
            "  always uses the `texts` shape — anything else here will be\n"
            "  precomputed-only):\n"
        )
        if not structured_shapes_unreachable:
            out("    (none)\n")
        else:
            for ct in sorted(structured_shapes_unreachable):
                shapes = structured_shapes_unreachable[ct]
                rendered = ", ".join(
                    f"{shape}={n}"
                    for shape, n in sorted(
                        shapes.items(), key=lambda kv: (-kv[1], kv[0])
                    )
                )
                out(f"    {ct}: {rendered}\n")

        out("\n  cross-reference databases beyond GO (transformer ignores):\n")
        out(fmt_counter(extra_xref_dbs) + "\n")

        out("\n  evidence sources in precomputed that the transformer never emits:\n")
        out(fmt_counter(resolved_evidence_sources) + "\n")

        out(
            "\n  top-level precomputed fields the transformer never produces\n"
            "  (count = pairs where the field appears):\n"
        )
        out(fmt_counter(untransformed_fields) + "\n")

    section("6. React adaptation checklist")
    checklist: list[str] = []
    if precomp_keyword_total:
        id_present = precomp_keyword_field_freq.get("id", 0)
        cat_present = precomp_keyword_field_freq.get("category", 0)
        checklist.append(
            f"Keywords: handle absent `id`/`category`. Precomputed has id on "
            f"{id_present}/{precomp_keyword_total} keywords, category on "
            f"{cat_present}/{precomp_keyword_total}. UniFire-derived keywords "
            f"will have neither."
        )
    if structured_shapes_unreachable:
        for ct, shapes in structured_shapes_unreachable.items():
            shape_list = ", ".join(sorted(shapes))
            checklist.append(
                f"Comment renderer for {ct!r}: handle BOTH structured "
                f"({shape_list}) and free-text `texts` shapes."
            )
    if extra_xref_dbs:
        top_extra = ", ".join(
            f"{db}({n})"
            for db, n in extra_xref_dbs.most_common(8)
        )
        checklist.append(
            "Cross-references: UniFire-derived entries only carry `GO`. "
            f"Precomputed entries also carry: {top_extra}. Components must "
            "render gracefully when only `GO` (or nothing) is present."
        )
    if resolved_evidence_sources:
        top_src = ", ".join(
            f"{s}({n})" for s, n in resolved_evidence_sources.most_common(6)
        )
        checklist.append(
            "Evidence tags: UniFire-derived entries only emit `ARBA`/`UniRule` "
            f"sources. Precomputed entries also have resolved sources: "
            f"{top_src}. Evidence tag rendering must not assume a resolved "
            "source is available."
        )
    if untransformed_fields:
        top_fields = ", ".join(
            f"{f}({n})" for f, n in untransformed_fields.most_common(12)
        )
        checklist.append(
            "Top-level fields present in precomputed but NEVER produced by "
            f"the transformer: {top_fields}. Sections that read these must "
            "no-op when absent."
        )
    if unreachable_comment_types:
        checklist.append(
            "Comment types only seen in precomputed (transformer projection "
            f"never produced them in this corpus): "
            f"{', '.join(sorted(unreachable_comment_types))}. Confirm this is "
            "expected (precomputation adds annotations) and that absence is "
            "handled."
        )
    if unreachable_feature_types:
        checklist.append(
            "Feature types only seen in precomputed: "
            f"{', '.join(sorted(unreachable_feature_types))}. Same as above."
        )
    if unknown_types_global:
        checklist.append(
            "*** UniFire annotation types unknown to UniFireAnnotationTypeToSection "
            "(silently dropped today): "
            f"{', '.join(sorted(unknown_types_global))}. Either add mappings "
            "or confirm they should remain dropped."
        )
    if projected_recommended_discarded:
        checklist.append(
            f"recommendedName duplicates: {projected_recommended_discarded} "
            "extra predictions were discarded (first-wins). Spec calls this a "
            "known UniFire bug — confirm upstream reporting."
        )

    if not checklist:
        out("  (no actionable items derived from this corpus)\n")
    else:
        for i, item in enumerate(checklist, 1):
            out(f"  {i:2d}. {item}\n\n")

    if verbose and per_pair:
        section("7. Per-pair detail")
        for row in per_pair:
            out(json.dumps(row, sort_keys=True, default=list) + "\n")

    # ---------------- machine-readable bundle ----------------
    return {
        "corpus": {
            "pairs": both,
            "unifireOnly": unifire_only,
            "precomputedOnly": precomputed_only,
            "totalAccessions": len(pairs),
        },
        "unifireAnnotationTypeFreq": dict(unifire_annotation_type_freq),
        "unknownTypes": dict(unknown_types_global),
        "projection": {
            "commentsByType": dict(projected_comments),
            "featuresByType": dict(projected_features),
            "xrefsByDb": dict(projected_xrefs),
            "keywords": projected_keywords,
            "alternativeNames": projected_alt_names,
            "recommendedDiscarded": projected_recommended_discarded,
            "droppedPredictions": projected_dropped,
        },
        "precomputed": {
            "topFieldFreq": dict(precomp_top_field_freq),
            "commentsByType": dict(precomp_comments_by_type),
            "commentShapes": {
                ct: dict(c) for ct, c in precomp_comment_shapes.items()
            },
            "featuresByType": dict(precomp_features_by_type),
            "keywordTotal": precomp_keyword_total,
            "keywordFieldPresence": dict(precomp_keyword_field_freq),
            "xrefsByDb": dict(precomp_xrefs_by_db),
            "evidenceSources": dict(precomp_evidence_sources),
            "hasRecommendedCount": precomp_has_recommended,
            "hasAlternativeCount": precomp_has_alternative,
        },
        "gap": {
            "pairCount": pair_count,
            "deltaComments": delta_comments,
            "deltaFeatures": delta_features,
            "deltaKeywords": delta_keywords,
            "deltaXrefs": delta_xrefs,
            "unreachableCommentTypes": dict(unreachable_comment_types),
            "unreachableFeatureTypes": dict(unreachable_feature_types),
            "structuredShapesUnreachable": {
                ct: dict(c) for ct, c in structured_shapes_unreachable.items()
            },
            "extraXrefDbs": dict(extra_xref_dbs),
            "resolvedEvidenceSources": dict(resolved_evidence_sources),
            "untransformedTopFields": dict(untransformed_fields),
        },
        "checklist": checklist,
        "perPair": per_pair if verbose else [],
    }


# ---------------------------------------------------------------------------
# 5. CLI
# ---------------------------------------------------------------------------


def collect_pairs(
    unifire_dir: Path, precomputed_dir: Path
) -> dict[str, tuple[Path | None, Path | None]]:
    pairs: dict[str, tuple[Path | None, Path | None]] = {}
    if unifire_dir.exists():
        for p in unifire_dir.glob("*.json"):
            pairs[p.stem] = (p, None)
    if precomputed_dir.exists():
        for p in precomputed_dir.glob("*.json"):
            u, _ = pairs.get(p.stem, (None, None))
            pairs[p.stem] = (u, p)
    return pairs


def main() -> int:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        "--downloads",
        type=Path,
        default=SCRIPT_DIR / "downloads",
        help="Directory containing unifire/ and precomputed/ (default: %(default)s)",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Include per-accession detail in the report",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=None,
        help="Optional path to also write the machine-readable JSON report",
    )
    args = parser.parse_args()

    unifire_dir = args.downloads / "unifire"
    precomputed_dir = args.downloads / "precomputed"
    pairs = collect_pairs(unifire_dir, precomputed_dir)
    if not pairs:
        print(f"No JSON files found under {args.downloads}", file=sys.stderr)
        return 2

    mapping = load_mapping()
    bundle = report(pairs, mapping, verbose=args.verbose)

    if args.out:
        args.out.write_text(json.dumps(bundle, indent=2, sort_keys=True, default=list))
        print(f"\nWrote JSON report to {args.out}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    sys.exit(main())
