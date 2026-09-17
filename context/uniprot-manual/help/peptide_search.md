---
title: Peptide Search
type: help
categories: Website,help
---

## Overview

The [peptide search](https://www.uniprot.org/peptide-search) tool searches [UniProtKB](https://www.uniprot.org/uniprotkb) for protein entries that match peptide sequences of a minimum length of 7 amino acids and returns results in a customizable and downloadable format. 

## Submitting a peptide search job

Submissions must contain a minimum of 1 peptide and a maximum of 100 peptides. Peptides do not necessarily have to be the result of enzymic digestics with a specific cleavage site, such as trypic peptides etc.

Peptide sequences can also be uploaded in a plain text file with a comma separated format.

### Restrict by organism

Whenever possible restrict the search to a particular organism by entering an organism name or taxon ID into the ‘Restrict by organism’ field. This will focus results and allow the job to run more efficiently.

### Job name

Enter a personalized job name in the ‘Name your Peptide search job’ field to allow you to find the peptide search results easily within the ‘tool results’.  The results will be kept for 7 days after which they can be rerun for a further 7 days with the same parameters.

## Where to find the peptide search tool

The peptide search tool can be found at the top of the webpage in the tool bar and also on the UniProt [homepage](https://www.uniprot.org/) in the ‘analysis tools’ section.

## Programmatic access to the peptide search tool

For details on how to use the peptide search tool programmatically please see our [Peptide search asynchronous RESTful API](https://peptidesearch.uniprot.org/) page.

For searches with shorter peptide lengths or for searches greater than 100 peptides please use our [downloadable command line tool](https://research.bioinformatics.udel.edu/peptidematch/commandlinetool.jsp).
