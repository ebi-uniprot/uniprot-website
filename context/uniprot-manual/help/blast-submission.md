---
title: Sequence similarity searches / BLAST submissions
type: help
categories: Website,help
---

## Overview

**BLAST (Basic Local Alignment Search Tool)** is a widely used algorithm in bioinformatics that identifies regions of similarity between biological sequences (like proteins, DNA, or RNA). BLAST compares a query sequence to a database of sequences and finds matching segments, which can help researchers infer homologous genes, determine protein functions, or classify organisms based on genetic material.

BLAST uses a heuristic approach, which makes it faster than traditional alignment methods by finding high-scoring “seed” matches, then expanding and refining them.

BLAST then assigns a score to each match and calculates an E-value to indicate the likelihood of finding that match by chance. A lower E-value suggests a more significant match.

BLAST tool search results are saved in your [tools dashboard](https://www.uniprot.org/tool-dashboard) for a maximum of 7 days. Even after 7 days the job can be resubmitted from the tools dashboard with the same parameters.

## Where to find the BLAST tool

You can [access the BLAST tool](https://www.uniprot.org/blast) directly from various sections of the UniProt website:

- **Main toolbar**: Easily accessible in the top left of the navigation.
- **Basket**: Align multiple sequences stored in your basket by selecting your entries using the checkboxes on the left and selecting `BLAST` from the 'Tools' dropdown menu.
- **UniProtKB, UniRef and UniParc results pages**: directly from search results by selecting the results of interest and then selecting BLAST in the 'Tools' dropdown menu.
- **UniProtKB entry page**: in the sequences section you can BLAST isoforms of a specific protein entry.

## Job submission form

### Input sequences

You can submit sequences in multiple ways:

- **Prepopulated** e.g. from selections made in your search results or your basket.
- **UniProt identifiers** entered manually.
- **FASTA text input**: Paste your sequence(s) in FASTA format.
- **FASTA file upload**: Upload a text file containing the sequences to align.

Supported UniProt identifiers include:

| **Identifier**         | **Description**                       |
|------------------------|---------------------------------------|
| **P00750**             | UniProtKB entry                       |
| **P00750-2**           | UniProtKB entry isoform sequence      |
| **A4_HUMAN**           | UniProtKB entry name                  |
| **UPI0000000001**      | UniParc entry                         |
| **UniRef100_P00750**   | UniRef entry                          |

<br>

You may submit multiple sequences at a time, up to a maximum of 5 sequences, in which case a job will be created in your dashboard for each of the sequences.  

You can also submit **subsequences** when using the FASTA format:  
`````
>sp|P01308|25-54
FVNQHLCGSHLVEALYLVCGERGFFYTPKT
`````

### Choosing the correct target database

Choose the correct target database for your use case, this will determine the search space for your BLAST search and significantly affect the results that are returned to you.

Target Database Descriptions

| **Option**             | **Description**                       |
|------------------------|---------------------------------------|
| **UniProtKB reference proteomes + Swiss-Prot** | This option is the default selection for BLAST searches. <br><br> [Swiss-Prot](https://www.uniprot.org/help/uniprotkb_sections)'s section of [UniProtKB](https://www.uniprot.org/help/uniprotkb) includes manually reviewed protein sequences with high-quality annotations. Swiss-Prot gives the most reliable and well-annotated entries, this is useful if you’re looking for functional information, conserved domains, or known characterized protein families. <br><br> [Reference proteomes](https://www.uniprot.org/help/reference_proteome) are high-quality, representative sets of protein sequences selected to represent the proteomes of species across the tree of life. These reference proteomes are designed to serve as benchmarks for comparative genomics, evolutionary studies, and functional annotation. <br><br> Swiss-Prot data undergoes expert manual curation, so it contains high-quality data  but is smaller in scope compared to unreviewed data. Reference proteomes are included in the search to provide wider coverage to supplement Swiss-Prot entries. |
| **UniProtKB**           | the whole of [UniProtKB](https://www.uniprot.org/help/uniprotkb) includes both [Swiss-Prot and TrEMBL sections](https://www.uniprot.org/help/uniprotkb_sections), TrEMBL contains computationally analyzed protein sequences that have not been manually reviewed. It is much larger than Swiss-Prot and encompasses more species, however these protein entries are not manually annotated.      |
| **UniProtKB with 3D structure (PDB)**           | This option includes [entries in UniProtKB that have a PDB 3D structure](https://www.uniprot.org/uniprotkb?query=%28structure_3d%3Atrue%29)                  |
| **UniProtKB with 3D structure predictions (AlphaFold)**      | This option includes [entries in UniProtKB that have an AlphaFold 3D structure prediction](https://www.uniprot.org/uniprotkb?query=%28database%3Aalphafolddb%29)                         |
| **UniProtKB reference proteomes**   | [Reference proteomes](https://www.uniprot.org/help/reference_proteome) are high-quality, representative sets of protein sequences selected to represent the proteomes of species across the tree of life. These reference proteomes are designed to serve as benchmarks for comparative genomics, evolutionary studies, and functional annotation.                          |
| **UniProtKB Swiss-Prot**  |   [Swiss-Prot](https://www.uniprot.org/help/uniprotkb) includes manually reviewed protein sequences with high-quality annotations. Swiss-Prot gives the most reliable and well-annotated entries, this is useful if you’re looking for functional information, conserved domains, or known characterized protein families.    |
| **UniRef100**  | [UniRef100](https://www.uniprot.org/help/uniref#uniref100) contains all UniProt Knowledgebase records plus selected UniParc records. In UniRef100, all identical sequences and subfragments with 11 or more residues are placed into a single record.  |
| **UniRef90**  | [UniRef90](https://www.uniprot.org/help/uniref#uniref90) is generated by clustered UniRef100 sequences with 11 or more residues, such that each cluster is composed of sequences that have at least 90% sequence identity to and 90% overlap with the [seed sequence](https://www.uniprot.org/help/uniref_seed).  |
| **UniRef50**  | [UniRef50](https://www.uniprot.org/help/uniref#uniref50) is built by clustering UniRef90 seed sequences that have at least 50% sequence identity to and 80% overlap with the longest sequence in the cluster.  |
| **UniParc**  | [UniParc (UniProt Archive)](https://www.uniprot.org/help/uniparc) is a comprehensive non-redundant protein sequence archive that includes sequences from multiple sources, like GenBank, PDB, and EMBL, updated frequently to capture all known protein sequences.  |

<br>

### Restrict by taxonomy

Whenever possible limit your search to specific taxonomic groups by using this option, specifying taxonomy will reduce BLAST search time and focus your results on a taxonomy or taxonomic group of interest.

It is possible to focus on matches within a specific clade or species, and is useful for narrowing results to homologs from certain lineages, e.g., mammals, bacteria, or plants.
Use the text input box to search and select taxonomic groups.

### Job name

By default, the job name is auto-generated based on the submitted sequences. Customising the name will allow you to find your BLAST results quickly in your tools dashboard.

### Advanced parameters

| **Option**             | **Description**                       |
|------------------------|---------------------------------------|
| **Sequence type**      | Select the type based on your input sequence. The type of program will also depend on the type of your input sequence.<br><br>Protein (default): Input sequence is an amino acid sequence (protein).<br>Possible use cases:<ul><li>Finding homologous proteins in different organisms.</li><li>Identifying conserved domains or sites in proteins.</li><li>BLAST program: blastp</li></ul><br>DNA/RNA: Input sequence is a DNA or RNA sequence (nucleotide)<br>Possible use cases:<ul><li>Identifying protein-coding regions in a nucleotide sequence.</li><li>Identifying newly sequenced DNA or RNA (e.g., genome or transcriptome data).</li><li>Detecting distant homologs where sequence similarity is better detected at the protein level.</li><li>BLAST program: blastx</li></ul> |
| **Program**  | blastp (default): Compares a protein sequence (query) to a protein sequence database.<br><br>blastx: Compares a translated nucleotide sequence (query) to a protein sequence database.<ul><li>Translates the nucleotide sequence into all six possible reading frames (three forward and three reverse).</li><li>Compares the resulting protein sequences to the target protein database.</li></ul> |
| **E-Threshold**  | The expectation value (E) threshold is a statistical measure of the number of expected matches in a random database. The lower the e-value, the more likely the match is to be significant. E-values between 0.1 and 10 are generally dubious, and over 10 are unlikely to have biological significance. In all cases, those matches need to be verified manually. You may need to increase the E threshold if you have a very short query sequence, to detect very weak similarities, or similarities in a short region, or if your sequence has a low complexity region.<br><br>Min: 0.00001<br>Max: 1000<br>Default: 10 |
| **Matrix**  | The matrix assigns a probability score for each position in an alignment. The BLOSUM matrix assigns a probability score for each position in an alignment that is based on the frequency with which that substitution is known to occur among consensus blocks within related proteins. BLOSUM62 is among the best of the available matrices for detecting weak protein similarities. The PAM set of matrices is also available.<br><br>Auto - BLOSUM62 (default)<br>BLOSUM45<br>BLOSUM62<br>BLOSUM80<br>PAM70<br>PAM30  |
| **Filter**  | Low-complexity regions (e.g. stretches of cysteine in [Q03751](https://www.uniprot.org/uniprotkb/Q03751/entry), or hydrophobic regions in membrane proteins) tend to produce spurious, insignificant matches with sequences in the database which have the same kind of low-complexity regions, but are unrelated biologically. If "Filter low complexity regions" is selected, the query sequence will be run through the program SEG, and all amino acids in low-complexity regions will be replaced by X's.<br><br>None (default)<br>Filter low complexity regions  |
| **Gapped**  | If ‘yes’ is selected then this will allow gaps to be introduced in the sequences when the comparison is done.<br><br>Yes (default)<br>No  |
| **Hits**  | Limits the number of matches returned in the results. Lower the value if you only need top hits, and increase the number if you want a comprehensive list of matches.<br><br>Min: 50<br>Max: 1000<br>Default: 250<br>  |
| **HSPs per hit**  | High-scoring segment pairs (HSPs)<br>All (default)<br>Min: 1<br>Max: 100  |

<br>

## Related services

| **Tool**                                                                      |  **Description**                                                                                      |
|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| **[BLAST](https://www.ebi.ac.uk/jdispatcher/sss/ncbiblast) (EBI)**                 |  Sequence similarity search                                                                           |
| **[FASTA](https://www.ebi.ac.uk/jdispatcher/sss/fasta) (EBI)**                     |  Sequence similarity search                                                                           |
| **[InterProScan](https://www.ebi.ac.uk/interpro/search/sequence/) (EBI)**     |  Query a sequence against the InterPro database, which contains protein families, domains, and motifs |
| **[ScanProsite](https://prosite.expasy.org/scanprosite/) (ExPASy)**            |  Scan a protein sequence for patterns, or use a pattern to scan protein sequences                     |
| **[HMMER](https://www.ebi.ac.uk/Tools/hmmer/) (EBI)**                         |  Sequence Similarity Search                                                                           |
