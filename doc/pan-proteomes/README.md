# Pan Proteomes in the UniProt front end

Plan for surfacing pan proteome (PP) cluster data in the website. Split by what the published
data supports:

1. [Background and the data constraint](./01-background.md) — what is on the FTP, what it does
   and does not contain, and the decision not to infer membership.
2. [Phase 1 — with the FTP data as published](./02-phase-1-ftp-data.md) — surfaces, components,
   API contract, dev server, files, verification. Everything here is derivable today.
3. [Phase 2 — with cluster membership](./03-phase-2-cluster-membership.md) — what unlocks once
   the representative → member table is exposed, and what to ask the PP team for.
4. [Decisions and open questions](./04-open-questions.md) — resolved questions with where each
   lands, plus what is still open.

Sample data used throughout (`pp24`, `pp9`, `pp2proteomes.tsv`) is in `context/pp/`; the help
articles are in `context/uniprot-manual/help/pan_proteomes*.md`.
