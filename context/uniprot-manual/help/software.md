---
title: UniProt software
type: help
categories: help
---

# Visualization

- ProtVista  
  A Web Component which uses Nightingale components to display protein sequence information.  
  URL: <https://github.com/ebi-webcomponents/protvista-uniprot>  
  License: MIT License

- Nightingale  
  Visualization Web Components for biological data.  
  URL: <https://github.com/ebi-webcomponents/nightingale>  
  License: MIT License

- Franklin pattern library  
  React and Zurb Foundation based design system for life sciences web applications.  
  URL: <https://github.com/ebi-uniprot/franklin-sites>  
  License: MIT License

# Command-line tools

- Swissknife  
  Object-oriented Perl library for parsing the UniProtKB text format.  
  URL: <https://swissknife.sourceforge.net/>  
  License: [GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) or any later version

- Varsplic  
  A Perl script to generate additional records from UniProtKB/Swiss-Prot, one for each alternative isoform curated by UniProtKB/Swiss-Prot biocurators  
  URL: <ftp://ftp.ebi.ac.uk/pub/software/uniprot/varsplic/>  
  License: [GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) or any later version

- unirefxml2fasta.pl  
  A Perl script to extract UniRef sequences from UniRef XML files.  
  URL: <https://proteininformationresource.org/download/uniref/xml2fasta/>  
  License: [GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)

- Peptide Match  
  A command line tool that allows to quickly retrieve all occurrences of a given query peptide from a customized protein sequence database (see [PMID:23958731](https://pubmed.ncbi.nlm.nih.gov/23958731/) for more details).  
  URL: <https://proteininformationresource.org/download/peptide_match/>  
  License: [GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)

# Automatic annotation

[UniProt's automatic annotation pipeline](https://www.uniprot.org/help/automatic_annotation) enhances the unreviewed records in UniProtKB by enriching them with automatic classification and annotation. A stand-alone version of this system, and parts thereof, are available to annotate protein sequences.

- UniFIRE  
  UniFIRE (The UniProt Functional annotation Inference Rule Engine) is an engine to execute rules in the UniProt Rule Markup Language (URML) format. It can be used to execute the UniProt annotation rules ([UniRule](https://www.uniprot.org/help/unirule) and [ARBA](https://www.uniprot.org/help/arba)).  
  URL: <https://gitlab.ebi.ac.uk/uniprot-public/unifire>  
  License: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

- PIRsitePredict  
  PIRsitePredict predicts functional residues within uncharacterized proteins using position-specific site conditional template annotation rules (PIR Site Rules) derived from known protein structural and experimental data curated by structural biologists. PIR Site Rules are part of [UniRule](https://www.uniprot.org/help/unirule).  
  URL: <https://research.bioinformatics.udel.edu/PIRSitePredict/download>  
  License: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

- HAMAP as SPARQL rules  
  [HAMAP](https://hamap.expasy.org/) is a system for the classification and annotation of protein sequences. It consists of a collection of expert-curated protein family signatures and rules that specify annotations that apply to family members. HAMAP rules are part of [UniRule](https://www.uniprot.org/help/unirule) and are also published in the W3C standard SPARQL 1.1 syntax to allow to execute the rules with freely available SPARQL engines (see [PMID:32034905](https://pubmed.ncbi.nlm.nih.gov/32034905/) for more details).  
  URL: <https://github.com/sib-swiss/HAMAP-SPARQL>  
  License: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) (supplementary code), [CC-BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/) (rules)
