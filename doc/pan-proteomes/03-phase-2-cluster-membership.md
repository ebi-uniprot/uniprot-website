# Phase 2 — with cluster membership

Prerequisite: the PP pipeline publishes (or the API ingests) the representative → member table
per pan proteome, and ideally the per-cluster mode sequence length. Sizing: ~300M rows over ~28M
clusters across all 3,740 PPs (summing `pp2proteomes`). Large but unremarkable for UniProt. Only
the lookup direction (accession/UPI → cluster) needs indexing; member lists are display-only and
paginated.

## What it unlocks

- **The headline use case.** The cluster card appears on *every* clustered entry, not just
  representatives. A TrEMBL "Uncharacterized protein" from a non-RP strain (UniProtKB page), or a
  UniParc-only sequence from a redundant proteome (UniParc page), gets a pointer to the cluster
  representative — by construction the best-annotated member — plus PF telling the user whether
  it is core or strain-specific.
- **Members table** on the card, headed "Proteins in cluster (N)" to match the count label:
  accession/UPI, `EntryTypeIcon`, proteome, organism, length; reviewed first.
  `src/shared/components/table/TableFromData.tsx` (virtualised above 1000 rows, per-column
  filters). The "Proteomes in cluster" figure stays beside it so the two numbers are never read
  as the same thing.
- **Mode sequence length** and the entry's delta from it (and min/median/max if provided).
- Proteome entry section: unchanged. Its data (stats, `pp2proteomes`) is complete in Phase 1.
- Cluster list (endpoint 4) gains a `member=` filter; a future matrix explorer can show proteins
  in cells rather than counts.

## API contract additions

Additive to the [Phase 1 contract](./02-phase-1-ftp-data.md#api-contract) — no Phase 1 endpoint
changes shape. Endpoint numbers refer to that list.

5. `GET /panproteomes/pp{taxId}/clusters/{UPI}` gains
   `modeSequenceLength`, optional `sequenceLengthStats{min, median, max}`, and
   `members{ total, results[{ uniParcId, proteomeId, sourceId, organism, sequence{length},
   uniProtKBEntry? }], cursor }`.
   Also `GET .../clusters/{UPI}/members?proteome=&reviewed=&cursor=&size=` for the paginated
   list on its own.
6. `GET /panproteomes/clusters/search?uniparc=|accession=|proteome=|taxonomy=` — now resolves
   **any member**, with `isRepresentative` true/false per hit. This is the only behavioural change
   the front end sees; the card code is already written against it.

Preferred alternative, as in Phase 1's contract: put `extraAttributes.panProteome = { panProteomeId,
clusterId, proteinFrequency, isRepresentative }` on the UniProtKB and UniParc entry payloads for
every clustered entry. Then the card fetches (5) directly with the cluster id.

## UI additions

- `PanProteomeClusterCard`: drop the representative-only copy; add **Representative** row (either
  "this entry" or a link), **Mode sequence length** (+ delta), and the members table.
- `PanProteomeSummary`: no change.
- Help article: remove the "not yet browsable" caveat.

Dev server: when a membership file is available for `pp24` / `pp9`, `scripts/pan-proteome-server.mjs`
indexes it and the Phase 2 fields on (5) and non-representative hits on (6) appear. Until then,
Phase 2 UI can be developed against a mock fixture in `__mocks__` — never against synthesised
data served as if real.

## What to ask the PP / backend team for

1. **Publish `_cluster.tsv`** (representative → member) per PP, or expose it via the API as
   member → cluster and cluster → members. The pipeline already produces it.
2. **Mode sequence length** per cluster (criterion 5 of representative selection). Mode over all
   members or distinct sequences? Can min/median/max come too?
3. **Stable cluster identifier.** Today the id *is* the representative's UPI, so it changes when
   the representative changes between releases — breaks bookmarks and any future
   `/panproteomes/...` route.

See also: [Decisions and open questions](./04-open-questions.md).
