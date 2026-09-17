# Phase 1 — with the FTP data as published

Everything in this phase is derivable from the FTP files described in
[Background](./01-background.md). Nothing is stubbed.

## What each file supports

| Source | Derivable, per cluster or PP | Used for |
| --- | --- | --- |
| `pp2proteomes.tsv` | proteome ⇄ PP; per-proteome `isRP`, `clusters`, `in_fasta` | PP existence for any proteome; sibling-proteomes table |
| `_stats.json` | PP size, UniProtKB entries, proteomes clustered / RP, singleton vs non-singleton clusters, proteome-size distribution, PF distribution + pre-binned histogram, RP composition, release | Proteome entry PP section |
| `.fasta.gz` | representative UPI, accession (if UniProtKB), PF, proteome, organism, sequence | accession/UPI → cluster lookup (**representatives only**); cluster card header |
| `_matrix.tsv.gz` | `proteomes_count`, per-proteome counts, **member count** (row sum) | cluster card figures; per-proteome breakdown; cluster list filters |

Not derivable in Phase 1: member lists, member → cluster lookup for non-representatives, mode
sequence length.

## Surfaces

| Surface | What is shown | Completeness |
| --- | --- | --- |
| **Proteome entry** `/proteomes/UP000827084` | New `Pan proteome` **section**: summary stats, protein-frequency (core/accessory) histogram, table of the other proteomes in this PP with RP flag, clusters, representatives contributed, BUSCO/CPD; downloads. Existing Overview row upgraded to a count + in-page anchor. PP existence from `ProteomesAPIModel.panproteomeTaxon.taxonId` (`src/proteomes/adapters/proteomesConverter.ts:98`) — already on the model. | **Complete.** Nothing stubbed. This is the centrepiece of Phase 1. |
| **Proteomes landing page** | Update the pan proteome prose + downloads block: link an example Proteome entry PP section (`/proteomes/UP000000625#pan_proteome`) and the help article alongside the FTP directory. There is no PP index page in Phase 1, so that is all there is to link. | Complete. |
| **UniProtKB entry** `/uniprotkb/<acc>/entry` | `Pan proteome cluster` sub-block inside **Similar proteins**, sibling of the `UniRef clusters` h3. Rendered **only when the entry is a cluster representative**. Lookup by `extraAttributes.uniParcId` (`src/uniprotkb/adapters/uniProtkbConverter.ts:100`) or accession. Nothing on miss. | Partial by nature: in practice appears on reference-proteome entries only (see [the data constraint](./01-background.md#the-data-constraint)). Shows PF with core/accessory label, `proteomes_count`, member count, per-proteome breakdown (linked to *proteomes*), PP link. No members table, no mode length. |
| **UniParc sub-entry** `/uniparc/<UPI>/entry/<xrefId>` | Same component inside `SubEntrySimilarProteinsSection`. The lookup key is the entry's UPI, so the card is identical on every sub-entry of that UniParc entry; the sub-entry whose proteome + source id match the FASTA header is flagged as the representative record. | Same as above. This is where non-RP representatives surface (all of them are UniParc-only in `pp24`). |

Deferred to Phase 2: members table, cluster card on non-representative entries, mode sequence
length.

Deferred to later, data permitting today: Proteomes results column/facet ("in a pan proteome" —
`pp2proteomes` supports it, but it needs a Proteomes API search field), Taxonomy species page,
browsable cluster list per PP / per proteome (endpoint 4 below supports it; no UI this iteration),
matrix explorer.

The representative-only card must not read as if it were the general case. Copy should say what
it is — "This entry is the representative of a pan proteome cluster" — and the help article
linked from it should explain that non-representative members are not yet browsable.

## Components

All new UI lives in `src/proteomes/components/pan-proteome/` (the Proteomes namespace owns PP
until it gets its own). Cross-namespace imports are already normal — the UniParc sub-entry reuses
UniProtKB section components.

### `PanProteomeSummary.tsx` — Proteome entry section
Props: `{ taxonId: number; proteomeId: string }`. Fetches endpoints 1 and 2 itself (a second call
after the Proteomes entry). Future improvement, not in scope: the Proteomes API folds PP id and
cluster counts into `panproteomeTaxon` so the section can render its header without the call.

- `InfoList`: PP id + species, UniProt release, PP size (clusters), UniProtKB entries, proteomes
  clustered / of which reference proteomes, singleton / non-singleton clusters.
- `ProteinFrequencyHistogram.tsx` — from the pre-binned `proteinFrequencyHistogram` (ten fixed
  ranges). franklin's `Histogram` takes raw values + bin count and is a poor fit for pre-binned
  data; render bars directly with a small SCSS module.
- `PanProteomeProteomesTable.tsx` — the other proteomes in this PP, current one highlighted:
  proteome (link), RP flag, clusters, representatives contributed (`in_fasta`), BUSCO/CPD enriched
  from a second proteomes search using the `upid:X OR upid:Y` pattern in
  `src/proteomes/components/entry/Entry.tsx:42`.
- Downloads: FASTA / matrix / stats / README via `ftpUrls`.

### `PanProteomeClusterCard.tsx` — UniProtKB + UniParc (representatives only)
Props: `{ uniParcId: string; accession?: string; xref?: { proteomeId: string; sourceId: string } }`
(`xref` lets the UniParc sub-entry flag whether *this* record is the representative). Self-fetching
via `useDataApi`, returns `null` on empty results — the pattern of
`src/uniprotkb/components/entry/ComputationallyMappedSequences.tsx`.

- "This entry is the representative of a cluster in the *Shewanella putrefaciens* pan proteome
  (`pp24`)" with links to the Proteome entry PP section and FTP.
- `InfoList`: **Protein frequency** (%, `DoughnutChart`, with a "core" (>90%) / "accessory"
  (10–90%) label — the help article says these are conventions, not strict definitions, so the
  label links to the help rather than asserting), **Proteomes in cluster** — "7 of 7" (`proteomesCount`
  of `totalClustered`), **Proteins in cluster** — "12" (`memberCount`), **Cluster ID**.
  The two counts are always shown together and always carry their unit in the label; never
  "size" or "count" alone. The help FAQ anticipates users confusing them, and a cluster with
  paralogs (`proteomesCount: 1`, `memberCount: 2`) is exactly where it bites. Both labels get a
  `data-article-id` to the workflow FAQ.
- Per-proteome breakdown: table of proteome (link) → proteins contributed, from the matrix row.
  **Scale flag:** `pp562` has 2,215 columns, so this cannot be a plain list. Sort by count
  descending, show the first ~10 with a "show all N" expander, and virtualise the expanded list
  (`TableFromData` does this above 1000 rows).
- One request: the lookup endpoint (6) returns the full cluster record including
  `proteomeCounts` and a `panProteome` summary, so the card does not need a second call. Species
  resolution is not needed for this lookup; if it ever is (a PP-scoped lookup), the card resolves
  the species taxid the way the Taxonomic lineage section does — `/taxonomy/{taxonId}` via the
  `SelfLoadingTaxonomyLineage` pattern in `src/shared/components/entry/TaxonomyView.tsx:129`,
  taking the `rank === 'species'` entry.

Supporting files: `src/proteomes/config/panProteomeApiUrls.ts`,
`src/proteomes/adapters/panProteomeConverter.ts`, `src/proteomes/types/panProteome.ts`,
`src/proteomes/__mocks__/panProteome*.ts`.

## API contract

Root `/panproteomes` (forward-compatible with an eventual namespace). camelCase, UniProt-style
`{ results: [...] }` envelopes, cursor pagination. **Current release only** — no historical
access. **Everything below is derivable from the FTP files** with the pre-processing noted;
nothing is stubbed.

1. `GET /panproteomes/pp{taxId}` — the stats JSON, camelCased and lightly restructured:
   `{ id, upRelease, species{taxonId, scientificName}, proteomes{totalClustered,
   referenceProteomes, includedInFasta}, proteomeSizesDistribution{...}, clustering{totalProteins,
   clusters{total, singletons, nonSingletons}}, panProteome{size, uniProtKBEntries,
   referenceProteomeComposition[], proteinFrequencyDistribution{...},
   proteinFrequencyHistogram[]}, ftpUrl }`
2. `GET /panproteomes/pp{taxId}/proteomes` — one row per clustered proteome:
   `{ proteomeId, isReferenceProteome, clusters, includedInFasta }` (from `pp2proteomes.tsv`).
3. `GET /panproteomes/proteomes/{UPID}` — reverse of (2): which PP a proteome belongs to, with the
   same row. 404 if none. (Optional if `panproteomeTaxon` on the Proteomes API is enough.)
4. `GET /panproteomes/pp{taxId}/clusters?proteinFrequency=&proteome=&cursor=&size=` — paginated
   cluster list. Each cluster:
   `{ clusterId, panProteome{id, species{taxonId, scientificName}, totalClustered},
   proteinFrequency, proteomesCount, memberCount,
   representative{uniParcId, proteomeId, sourceId, organism{taxonId, scientificName},
   sequence{length, value}, uniProtKBEntry?{accession, id, entryType, proteinName, geneName,
   proteinExistence, sequenceVersion}} }`.
   No Phase 1 UI consumes this; it is specified and served by the dev server now because the
   data supports it and a cluster list page will need it.
5. `GET /panproteomes/pp{taxId}/clusters/{UPI}` — one cluster as in (4), plus
   `proteomeCounts{UPID: n}` (the matrix row). Zero cells are omitted; for `pp562` a core
   cluster still carries ~2,200 entries, which is acceptable for one cluster but is why (4) does
   not include it.
6. `GET /panproteomes/clusters/search?uniparc=|accession=` — lookup used by the UniProtKB and
   UniParc pages. Returns matching clusters in the shape of (5), each with `isRepresentative`.
   **In Phase 1 this matches representatives only**, so every hit carries
   `isRepresentative: true`. Empty `results` otherwise.

Pre-processing the backend needs (all cheap, per release):
- Parse FASTA headers with the grammar in `README_pp_fasta` → cluster records; index by UPI and by
  accession.
- Pivot the matrix into per-cluster rows (`proteomeCounts`, `memberCount` = row sum).
- Load `pp2proteomes.tsv` into proteome ⇄ PP maps.

**Alternative worth putting to the backend team:** embed a small cross-reference on the existing
entry payloads for representatives — `extraAttributes.panProteome = { panProteomeId, clusterId,
proteinFrequency, isRepresentative }` on UniProtKB, likewise on the UniParc light entry. It removes
a round trip and all existence-guessing from the client. Front end code is structured so (6) can be
swapped for that without touching components.

## Local development server

`scripts/pan-proteome-server.mjs` — zero new dependencies, `node:http` + `node:zlib`, port 3001,
permissive CORS. On boot it indexes `context/pp/` exactly as the pre-processing above describes and
serves endpoints 1–6. **It serves only real, derivable data — no stubs.**

Wiring follows the existing precedent for a second host (`UNIFIRE_HOST` in
`src/uniparc/config/apiUrls.ts:58`):

- `webpack.config.js`: read `env.PP_API_PREFIX`, defaulting to `apiPrefix` (next to the
  `API_PREFIX` handling at L494–505), and add `PP_API_PREFIX` to the `DefinePlugin` block (L350).
- `src/types/webpack-define-plugin.d.ts`: `declare const PP_API_PREFIX: string;`
- `package.json`: `"pp-server": "node scripts/pan-proteome-server.mjs"` and
  `"start:pp": "npm-run-all --parallel pp-server serve:pp"` where `serve:pp` is `start:prod` plus
  `--env PP_API_PREFIX=http://localhost:3001`. (`npm-run-all` is already a devDependency.)

Because the default is `apiPrefix`, production needs no change on the day the real backend lands.

## Files

**New**
- `scripts/pan-proteome-server.mjs`, `scripts/README.md`
- `src/proteomes/config/panProteomeApiUrls.ts`
- `src/proteomes/types/panProteome.ts`
- `src/proteomes/adapters/panProteomeConverter.ts`
- `src/proteomes/components/pan-proteome/PanProteomeSummary.tsx`
- `src/proteomes/components/pan-proteome/ProteinFrequencyHistogram.tsx`
- `src/proteomes/components/pan-proteome/PanProteomeProteomesTable.tsx`
- `src/proteomes/components/pan-proteome/PanProteomeClusterCard.tsx`
- `src/proteomes/components/pan-proteome/styles/*.module.scss`
- `src/proteomes/__mocks__/panProteomeStatsData.ts`, `panProteomeClusterData.ts`
- `__tests__` alongside each component

**Modified**
- `src/proteomes/types/entrySection.ts` — add `PanProteome = 'pan_proteome'`
- `src/proteomes/config/ProteomesEntryConfig.tsx` — register the section (after Description)
- `src/proteomes/components/entry/Overview.tsx:141` — Overview row becomes a count + anchor to
  `#pan_proteome`
- `src/proteomes/components/entry/PanProteome.tsx` (+ spec) — adjust to the new role
- `src/uniprotkb/components/entry/similar-proteins/SimilarProteinsSection.tsx` — add the
  `Pan proteome cluster` h3 + `PanProteomeClusterCard` beside `UniRef clusters`
- `src/uniparc/components/sub-entry/SubEntrySimilarProteinsSection.tsx` — same
- `src/proteomes/components/landing-page/LandingPage.tsx:173, 296–299` — copy + links
- `src/shared/config/ftpUrls.ts:28` — `panProteomes(taxonId)` builds `pp<taxid>.fa.gz`; the real
  file is `pp<taxid>.fasta.gz` (dead code path today, only the no-arg branch is called)
- `src/shared/config/ftpUrls.ts:7` — base becomes `ftp.uniprot.org` (canonical, production) with a
  build-time override to `ftp.ebi.ac.uk` for development. This is shared config: it changes every
  FTP link in the site, not only PP links — confirm before merging.
- `webpack.config.js`, `package.json`, `src/types/webpack-define-plugin.d.ts`

## Verification

1. `yarn start:pp`, then check the dev server directly:
   `curl localhost:3001/panproteomes/pp24`, `.../pp24/proteomes`, `.../pp24/clusters?size=5`,
   `.../pp24/clusters/UPI000D2246DE`, `.../clusters/search?uniparc=UPI000D2246DE`,
   `.../clusters/search?accession=A0ABX8X7C7`. A non-representative UPI on (6) → empty
   `results`; an unknown cluster id on (5) → 404.
2. `/proteomes/UP000827084` (`pp24` RP) — Pan proteome section with stats, histogram, the six
   sibling proteomes; Overview row shows the count and scrolls to it. `/proteomes/UP000005640`
   (human, no PP) — nothing rendered, no console errors.
3. `/uniprotkb/A0ABX8X7C7/entry` (a `pp24` representative) — cluster card under Similar proteins;
   an accession from the same species that is not a representative — card absent, section
   otherwise unchanged.
4. `/uniparc/UPI000D2246DE/entry/<xrefId>` — same card in the sub-entry (UniParc-only
   representative, no UniProtKB block).
5. `yarn test` (lint + `tsc` + jest). New specs use `customRender()` and mock `useDataApi`; run
   `yarn jest-coverage-ratchet` if thresholds move.

Next: [Phase 2 — with cluster membership](./03-phase-2-cluster-membership.md).
