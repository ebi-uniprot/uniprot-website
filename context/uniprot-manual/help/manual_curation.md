---
title: How do we manually annotate a UniProtKB entry?
type: help
categories: UniProtKB,Biocuration,About_UniProt,faq
---

A well-defined manual curation process is essential to ensure that all manually annotated entries are handled in a consistent manner. This process consists of 6 major mandatory steps: (1) sequence curation, (2) sequence analysis, (3) literature curation, (4) family-based curation, (5) evidence attribution, (6) quality assurance and integration of completed entries. Curation is performed by expert biologists using a range of tools that have been iteratively developed in close collaboration with curators.

**(1) Sequence curation.** Once a protein sequence has been selected for manual annotation on the basis of our [curation priorities](https://www.uniprot.org/help?query=category%3Abiocuration+AND+category%3Aproject), Blast searches are run against UniProtKB to identify additional sequences from the same gene and to identify homologs. Sequences from the same gene and the same organism are merged into a single entry. Discrepancies between sequence reports are identified and the underlying causes such as alternative splicing, natural variations, frameshifts, incorrect initiation sites, incorrect exon boundaries and unidentified conflicts are documented. Further errors can be found by comparing homologous sequences. These steps ensure that the sequence described for each protein in UniProtKB/Swiss-Prot is as complete and correct as possible and contribute to the accuracy and quality of further curation steps.

-   [Where do the UniProtKB protein sequences come from?](https://www.uniprot.org/help/sequence_origin)
-   [What are UniProtKB's criteria for defining a CDS as a protein?](https://www.uniprot.org/help/cds_protein_definition)
-   [What is the canonical sequence? Are all isoforms described in one entry?](https://www.uniprot.org/help/canonical_and_isoforms)

**(2) Sequence analysis.** Sequences are analyzed using a range of selected sequence analysis tools. Computer-predictions are manually reviewed and relevant results selected for integration. Sequence annotation predictions include post-translational modifications, subcellular location, transmembrane domains and protein topology, domain identification and protein family classification.

**(3) Literature curation.** Journal articles provide the main source of experimental protein knowledge. Relevant publications are identified by searching literature databases, such as PubMed, and using literature mining tools. The full text of each paper is read and information is extracted and added to the entry. All experimental findings and authors' statements are compared both with the current knowledge on related proteins and the results from various protein sequence analysis tools. Annotation captured from the scientific literature includes protein and gene names, function, catalytic activity, cofactors, subcellular location, protein-protein interactions, patterns of expression, diseases associated with deficiencies in a protein, locations and roles of significant domains and sites, ion-, substrate- and cofactor-binding sites, catalytic residues, the variant protein forms produced by natural genetic variation, RNA editing, alternative splicing, proteolytic processing, and post-translational modification. Relevant Gene Ontology (GO) terms are assigned based on experimental data from the literature.

-   [References](https://www.uniprot.org/help/publications)
-   [On what basis are literature references inserted in UniProtKB/Swiss-Prot entries?](https://www.uniprot.org/help/literature_references)

**(4) Family-based curation.** Reciprocal Blast searches and phylogenetic resources are used to identify putative homologs, which are evaluated and curated. Annotation is standardized and propagated across homologous proteins to ensure data consistency.

-   [How is orthology established in UniProtKB/Swiss-Prot?](https://www.uniprot.org/help/orthology)
-   [How is protein family membership assigned in UniProtKB?](https://www.uniprot.org/help/family_membership)

**(5) Evidence attribution.** All information added to an entry during the manual annotation process is linked to the original source so that users can trace back the origin of each piece of information and evaluate it.

-   [Evidence attribution](https://www.uniprot.org/help/evidences)
-   [Evidence on protein existence](https://www.uniprot.org/help/protein_existence)

**(6) Quality assurance, integration and update.** Each completed entry undergoes quality assurance before integration into UniProtKB/Swiss-Prot and is updated as new data become available.

# See also

-   [Standard operating procedure (SOP) for UniProt manual curation](https://github.com/ebi-uniprot/uniprot-manual/raw/main/pdfs/sop_manual_curation.pdf)
-   [Entry status](https://www.uniprot.org/help/entry_status)
-   [Why is UniProtKB composed of 2 sections, UniProtKB/Swiss-Prot and UniProtKB/TrEMBL?](https://www.uniprot.org/help/uniprotkb_sections)
-   [Video: Inside expert biocuration in UniProtKB/Swiss-Prot](https://www.youtube.com/watch?v=wvrCJtJnDbo)

Related terms: manual annotation, manual curation, reviewed entries
