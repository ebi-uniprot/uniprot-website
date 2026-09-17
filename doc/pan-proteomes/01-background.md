# Background and the data constraint

## Context

UniProt publishes Pan Proteome (PP) clusters on the FTP site
(`.../knowledgebase/pan_proteomes/`), regenerated every release for ~3,740 species. The
directory contains, and only contains:

- `pp2proteomes.tsv` — one row per clustered proteome: `PPid, species_name, UPID, isRP, clusters,
  in_fasta` (77k rows, 3.9 MB)
- `pp<taxid>/pp<taxid>.fasta.gz` — one **representative** sequence per cluster
- `pp<taxid>/pp<taxid>_matrix.tsv.gz` — cluster × proteome **count** matrix
- `pp<taxid>/pp<taxid>_stats.json` — summary statistics
- READMEs, `CHANGELOG`, `CITATION`, `filter_pp_fasta.py`

The website currently exposes **one sentence**: an `InfoList` row on the Proteome entry page
("This proteome is part of the *E. coli* pan proteome") linking to the FTP folder
(`src/proteomes/components/entry/PanProteome.tsx`, rendered at
`src/proteomes/components/entry/Overview.tsx:141`). None of the cluster or statistics data is used
anywhere in `src/`. The help article says: *"Interactive web browsing for all pan proteomes in
UniProt is planned for future UniProt releases."*

There is no backend yet. An output of this work is therefore a concrete **API contract**,
exercised by a local development server, that the backend team can implement.

---

## The data constraint

**Every published file describes a cluster from the representative's side.** The FASTA header
carries the representative's UPI, proteome, source id, and (if UniProtKB) accession, name, gene,
PE, SV — all properties of the one displayed sequence. The matrix row is keyed by the
representative's UPI and holds per-proteome *counts*. In `pp24`: 6,156 rows, 6,156 UPIs, 6,156
FASTA records — but the cells sum to 55,225 proteins. The other ~49,000 proteins appear nowhere.
The help FAQ states it (`context/uniprot-manual/help/pan_proteomes_workflow.md`, FAQ 9): *"The
matrix allows you to identify the representative sequence selected for each protein cluster, but
not each individual protein sequence contributing to the count."*

Consequences:

1. **A UniProtKB accession or UPI can be tied to a cluster only if it is the representative.**
   Coverage is very uneven and skewed to reference proteomes: in `pp24`, `UP000827084` (RP)
   contributes 3687/3687 representatives, `UP000241824` 875/4387, `UP000663399` 4/3688. Across
   the whole PP, 6,156 of 27,722 proteins (22%). The split by database is stark: all 3,687 RP
   representatives carry a UniProtKB block; all 2,469 non-RP representatives are UniParc-only
   (redundant non-RP proteomes have no UniProtKB entries). So in practice the **UniProtKB** card
   appears on reference-proteome entries and the **UniParc** card on the rest.
2. **Mode sequence length** of a cluster is not derivable — it needs member sequences.
3. **The headline use case** — "this entry is poorly annotated, show me its better-annotated
   cluster-mates" — *is* the non-representative case, because the representative is by
   construction the best-annotated member (UniProtKB > UniParc, RP > non-RP, Swiss-Prot > TrEMBL).
   The poorly annotated entry is a TrEMBL entry from a non-redundant non-RP proteome, or a
   UniParc-only sequence from a redundant one; either way it is not the representative. It
   depends entirely on a member → cluster mapping that is not published.

The mapping exists upstream: MMseqs2 `easy-cluster` emits `<prefix>_cluster.tsv` (representative →
member) as a standard output, and the published matrix is an exact pivot of it (verified on
`pp24`: column sums equal proteome sizes, non-zero cells per column equal `pp2proteomes.clusters`).
Mode sequence length is likewise already computed — it is criterion 5 of representative selection.
Both need publishing, not recreating.

**Decision: no heuristics.** Inferring membership client- or server-side (via UniRef, gene names,
re-clustering, or search-assignment) is out. The plan is split into two phases: what the published
data supports honestly today, and what becomes possible once membership is exposed.

Next: [Phase 1 — with the FTP data as published](./02-phase-1-ftp-data.md).
