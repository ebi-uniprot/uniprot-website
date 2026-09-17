---
title: Sequence Alignments
type: help
categories: Website,help
---

## Overview

The **Align Tool** aligns multiple protein or nucleotide sequences using the [Clustal Omega program](http://www.clustal.org/omega/). This tool uses the EBI's [Multiple Sequence Alignment Job Dispatcher](https://www.ebi.ac.uk/jdispatcher/msa/clustalo).

## Where to find the Align tool

You can access the **Align** tool directly from various sections of the UniProt website:

- **Main toolbar**: Easily accessible from the top navigation.
- **[Basket](https://www.uniprot.org/help/basket)**: Align multiple sequences stored in your basket by selecting your entries using the checkboxes on the left and selecting `Align` from the Tools dropdown.
- **UniProtKB, UniRef and UniParc results pages**: Align directly from search results.
- **UniProtKB entry page**: Align isoforms of a specific protein entry.

## Job submission form

### Input sequences

You can submit sequences in multiple ways:

- **Prepopulated** e.g. from selections made in your search results or your basket.
- **UniProt identifiers** entered manually.
- **FASTA text input**: Paste your sequence(s) in FASTA format.
- **FASTA file upload**: Upload a file containing the sequences to align.

Supported UniProt identifiers include:

| **Identifier**         | **Description**                       |
|------------------------|---------------------------------------|
| **P00750**             | UniProtKB entry                       |
| **P00750-2**           | UniProtKB entry isoform sequence      |
| **A4_HUMAN**           | UniProtKB entry name                  |
| **UPI0000000001**      | UniParc entry                         |
| **UniRef100_P00750**   | UniRef entry                          |

To specify a range within a sequence, append the desired range in square brackets (e.g. `P00750[1-10]` for the first ten amino acids).

### Number of sequences per job

| **Minimum** | **Maximum** |
|-------------|-------------|
| 2           | 50          |

If you need to align more than 50 sequences, you can [download](http://www.clustal.org/omega/#Download) the Clustal Omega program and run it locally.

### Job name

By default, the job name is auto-generated based on the submitted sequences, but you can set a custom name if needed.

### Advanced parameters

| **Option**               | **Description**                                                         |
|--------------------------|-------------------------------------------------------------------------|
| **Output Sequence Order** | Controls the order in which sequences appear in the alignment results.  |
| **Iterations**            | Specifies the number of guide-tree/HMM iterations during alignment.     |

## Alignment results

After job submission, the results are accessible from the [Tool Results Dashboard](https://www.uniprot.org/tool-dashboard). Each result page provides multiple views and options for further analysis.

### Overview tab

The **Overview** shows a color-coded alignment and offers download options in Clustal format. Amino acid property highlighting and sequence annotations are selectable for the sequence alignment. Within this tab there are two different ways to view the alignment:

1. **Continuous**: Shows the alignment as one continuous sequence. It is possible to zoom in to the amino acid letter level or zoom out to view the whole alignment at once. This is achieved by dragging the sides of the navigation track. Upon first switching to the Continuous mode the track will zoom into the level at which the amino acid letters are visible.
2. **Wrapped**: (default) Shows the alignment displayed vertically by breaking the sequence into consecutive chunks.

### Trees tab

The **Trees** tab visualizes the evolutionary relationships between the aligned sequences using a phylogenetic tree.

#### Key features

1. **Branches**: Represent evolutionary distances between sequences.
2. **Nodes**: Represent common ancestors shared by sequences.
3. **Leaf Nodes**: Each represents one aligned sequence.
4. **Branch Lengths**: Reflect the evolutionary divergence, with shorter branches indicating closer relationships.

#### Tree types

- **Phylogenetic Tree**: Illustrates the evolutionary relationships, showing how sequences have diverged from common ancestors.
- **Guide Tree**: Shows the order of sequence alignment used during progressive multiple sequence alignment, not evolutionary distances.

#### Layout options

- **Horizontal**: A standard layout with branches extending horizontally, making the relationships easy to follow.
- **Circular**: A radial layout where branches radiate from a central point, often used for visualizing large datasets.

#### Branch length options

| **Option**                   | **Description**                                                                     | **Best Used For**                                                   |
|------------------------------|-------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| **Phylogram with Aligned Labels** | Branch lengths represent evolutionary distance, with aligned labels for easy comparison. | Best for clear visual comparison of evolutionary distances.         |
| **Phylogram**                 | Branch lengths are proportional to evolutionary divergence.                        | Ideal for detailed analysis of evolutionary distances between sequences. |
| **Cladogram**                 | Shows sequence relationships without displaying branch lengths.                    | Useful when focusing on the order of divergence, not evolutionary distance. |

### Percent identity matrix

The **Percent identity matrix** provides a quantitative measure of sequence similarity. It compares amino acid or nucleotide identities between each pair of aligned sequences and shows the percentage of identical positions.

For example, if two sequences have 80% identity, 80% of their amino acids or nucleotides are identical at corresponding positions. The matrix is useful for assessing the level of similarity and can provide insights into evolutionary or functional relationships.

### Text output

This section provides the raw text output generated by the Clustal Omega alignment tool, suitable for further analysis.
The following symbols are shown below each line of the alignment, denoting the degree of conservation observed in each column:

- `*` : Fully conserved residues.
- `:` : Conservation between groups of strongly similar properties (Gonnet PAM 250 score > 0.5).
- `.` : Conservation between groups of weakly similar properties (Gonnet PAM 250 score ≤ 0.5).
- <code>&nbsp;</code> : Non-conserved residues.

### Input parameters

Displays the exact parameters that were used during the alignment job submission.

### API request

Shows the full API request submitted to the Job Dispatcher API, including input parameters.

## Related services

Related services for multiple sequence alignment and pairwise comparison:

| **Service**                                  | **Description**                                      |
|----------------------------------------------|------------------------------------------------------|
| [ClustalW or MUSCLE (PIR)](https://proteininformationresource.org/pirwww/search/multialn.shtml) | Multiple sequence alignment at PIR.                   |
| [ClustalO (EBI)](https://www.ebi.ac.uk/jdispatcher/msa/clustalo)            | Multiple sequence alignment at EBI.                   |
| [SSEARCH (PIR)](https://proteininformationresource.org/pirwww/search/pairwise.shtml) | Pairwise sequence alignment using the Smith-Waterman algorithm. |
