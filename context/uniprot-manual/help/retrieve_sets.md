---
title: How to retrieve sets of protein sequences?
type: help
categories: UniProtKB,Sequence,Text_search,Download,Technical,Programmatic_access,faq
---

UniProtKB entries are available in three file formats - Text, XML and RDF/XML. UniProtKB entries in these formats each contain only one protein sequence, the so-called 'canonical' sequence. UniProtKB canonical sequences are also available in FASTA format, as are additional manually curated isoform sequences that are described in UniProtKB/Swiss-Prot. Below we describe how these sets can be accessed.

In addition to the predefined FASTA, XML, RDF/XML and text formats, search results can also be downloaded in TSV or Excel format, reflecting your own [customizable](https://www.uniprot.org/help/customize) column settings.

# See also

[What is the canonical sequence? Are all isoforms described in one entry?](https://www.uniprot.org/help/canonical_and_isoforms)

[Alternative products](https://www.uniprot.org/help/alternative_products)

[Alternative sequence](https://www.uniprot.org/help/var_seq)

## Retrieving sequences from the website

- Perform your favorite query and view the resulting list of entries (e.g. this query retrieves all UniProtKB entries that are part of the human proteome: [proteome:UP000005640](https://www.uniprot.org/uniprotkb?query=proteome:UP000005640))
- Click the **Download** button in the query result page
- Choose the desired download format (Text, XML, RDF/XML, TSV, JSON, Excel or FASTA if additional isoform sequences are desired)
  - Choosing `Text`, `XML`, or `RDF/XML` allows retrieval of all entries (and their canonical sequences) from the result list in the desired format.
  - Choosing `FASTA (canonical) format` allows retrieval of all canonical sequences from the query result list. This can include canonical sequences from both UniProtKB/Swiss-Prot and/or UniProtKB/TrEMBL entries.
  - Choosing the option `FASTA (canonical and isoform)` allows retrieval of all canonical sequences plus all manually reviewed isoform sequences described within UniProtKB/Swiss-Prot. These manually reviewed isoform sequences are available as distinct sequences in FASTA format only within this expanded downloadable set.
  - Choosing `TSV` or `Excel` allows retrieval of your search result table reflecting the columns you have [chosen to include](https://www.uniprot.org/help/customize).

To automate the above, please read our [Programmatic access](https://www.uniprot.org/help/api) documentation.

## Retrieving sequences from the FTP site

The UniProt FTP sites (accessible via the [`Download latest release`](https://www.uniprot.org/downloads) link located on the [home page](https://www.uniprot.org/)) provide the most frequently requested data sets in each of the aforementioned file formats (Text, XML, RDF/XML, FASTA). The additional manually curated isoform sequences that are described in UniProtKB/Swiss-Prot are available in a separate FASTA file (`uniprot_sprot_varsplic.fasta.gz`). Our FTP directory also includes expanded FASTA sets, containing both the canonical and manually reviewed isoform sequences, for all [reference proteomes](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/reference_proteomes).
