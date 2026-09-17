---
title: Taxonomy
type: help
categories: Taxonomy,Controlled_vocabulary,help
---

The taxonomy database that is maintained by the UniProt group is based on the [NCBI taxonomy database](https://www.ncbi.nlm.nih.gov/taxonomy), which is supplemented with data specific to the UniProt Knowledgebase (UniProtKB). While the NCBI taxonomy is updated daily to be in sync with GenBank/EMBL-Bank/DDBJ, the UniProt taxonomy is updated only at UniProt releases to be in sync with UniProtKB. It may therefore happen that for the time period of a UniProt release, you can find new taxa at the NCBI that are not yet in UniProt (and vice versa for deleted taxa).

Species with manually annotated and reviewed protein sequences in the Swiss-Prot section of UniProtKB are named according to [UniProt nomenclature](https://www.uniprot.org/help/taxonomy#organism-denomination). In particular, we have adopted a systematic convention for naming viral and bacterial strains and isolates.

Links to external sites are chosen by the UniProt taxonomy team and show pictures and various scientific data of interest (taxonomy, biology, physiology, etc.). Due to the sheer volume of data present on the world-wide web, it is unfortunately not possible to contact each site individually. Should you wish to have your site linked from uniprot.org, or would prefer us to remove a link to your site, please do not hesitate to [contact us](https://www.uniprot.org/contact).

# Search

You can query the UniProt taxonomy by taxon names or NCBI taxonomy identifiers. Searches by names are case-insensitive and you may use asterisks as wildcards anywhere in the query. When you search for taxon names, the results that match a UniProt [organism denomination](https://www.uniprot.org/help/taxonomy#organism-denomination) are ranked higher than those which match [other organism names](https://www.uniprot.org/help/taxonomy#other-names).

# Organism denomination

The organism denomination used in UniProtKB consists of the Latin scientific name, usually composed of the <span style="color: orange;"> genus </span> and <span style="color: brown;"> species </span> names (binomial system developed by Linnaeus), followed optionally by the English <span style="color: magenta;"> common name </span> and a <span style="color: green;"> synonym </span>.

Example: <span style="color: orange;"> Cardamine </span> <span style="color: brown;"> pratensis </span> (<span style="color: magenta;"> Cuckoo flower </span>) (<span style="color: green;"> Alpine bitter cress </span>)

The synonym can be a common name in English or in Latin in the case of some historical legacy names.

Example: <span style="color: orange;"> Radianthus </span> <span style="color: brown;"> magnifica </span> (<span style="color: magenta;"> Magnificent sea anemone </span>) (<span style="color: green;"> Heteractis magnifica </span>)

In the case of viruses, the denomination does not follow the binomial system. The English common name is used as the scientific name, sometimes followed by an acronym. Where possible, viruses are named according to the nomenclature of the [International Committee on Taxonomy of Viruses (ICTV)](https://talk.ictvonline.org/).

# Organism mnemonic

A mnemonic organism identification code of at most 5 alphanumeric characters is used in the [entry name](https://www.uniprot.org/help/entry_name) of UniProtKB entries, e.g. [SP0A\_ **BACSU**](https://www.uniprot.org/uniprotkb/P06534). This code is generally made of the first three letters of the genus name and the first two letters of the species name.

Examples:  
**PSEPU** is for **Pse** udomonas **pu** tida  
**NAJNI** is for **Naj** a **ni** vea.

However, for a number of species commonly encountered in UniProtKB, we use self-explanatory codes. There are 16 of those codes:

- BOVIN for Bovine
- CHICK for Chicken
- ECOLI for _Escherichia coli_
- HORSE for Horse
- HUMAN for _Homo sapiens_
- MAIZE for Maize (_Zea mays_)
- MOUSE for Mouse
- PEA for Garden pea (_Pisum sativum_)
- PIG for Pig
- RABIT for Rabbit
- RAT for Rat
- SHEEP for Sheep
- SOYBN for Soybean (_Glycine max_)
- TOBAC for Common tobacco (_Nicotina tabacum_)
- WHEAT for Wheat (_Triticum aestivum_)
- YEAST for Baker's yeast (_Saccharomyces cerevisiae_)

Since the above rules cannot apply to viruses, we give them arbitrary, but generally easy-to-remember, identification codes.

A full list of organism mnemonics is available in our [Controlled vocabulary of species](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/speclist.txt).

Codes starting with the digit 9 are used for higher nodes that group together organisms at a given taxonomic level.

Examples:  
9AMPH is for Amphibia  
9COLE is for Coleoptera.

# Other organism names

Organism nomenclature has always been an area where the creativity of biologists has consistently reached unsuspected heights. Practically, this means that one organism is frequently described by many different names. In addition to the [organism denomination](https://www.uniprot.org/help/taxonomy#organism-denomination) that is displayed in UniProtKB entries, the UniProt taxonomy entries also show all other names that are archived in the NCBI taxonomy database. This includes names classified as misspelling and misnomers that have been collected from various external sources and can be considered legacy data.

# Lineage and taxonomy node rank

Taxonomy is organized in a tree structure that represents the taxonomic lineage. The position of each node on the tree is determined by its rank in the taxonomy hierarchy, so that the last ranks (usually ` species` or ` subspecies`) represent the leaves on the tree's branches and higher ranks (e.g. ` phylum`, ` order` and ` family`) are placed higher on the tree. The ordered list of the nodes forms the lineage.

The UniProt taxonomy database stores the taxonomy tree structure, thus making it possible to navigate from one node to another and to access the lineage for each node.

For convenience reasons, both GenBank/EMBL-Bank/DDBJ and UniProtKB entries store an abbreviated lineage, which contains only the familiar taxon names. But when you look at a UniProtKB entry on this website, you can configure its 'Taxonomic lineage' field to display the full lineage, including the so-called "hidden nodes", which do not appear in the abbreviated lineage. Also, when you search for a taxon in UniProtKB on this website, the taxon is searched in the full lineage of the entries.

# Organism strains

A list of strains may be provided for organisms with at least one entry in UniProtKB/Swiss-Prot. Where available, synonyms for particular strain names are listed in grey after the main name (see example [ECOLX](https://www.uniprot.org/taxonomy/562)). In UniProtKB entries, strain names are displayed in the Strain lines under 'Publications' (see example [P42652](https://www.uniprot.org/uniprotkb/P42652#publications)).

Note: Some of the strains present in the [strain list](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/strains.txt) might have their own taxon in the NCBI taxonomy database. The policy for the description of the source organism for a sequence has changed over the years from species to strain and back to species and you will therefore find a mixture of species and strain assignments in the nucleotide and protein databases.

# Viral hosts

A list of natural hosts is given for all viruses with at least one entry in UniProtKB/Swiss-Prot. Viral hosts data appears in the 'Virus host' field of UniProtKB entries (see example [Q8JP02](https://www.uniprot.org/uniprotkb/Q8JP02)).

A virus is an inert particle outside its hosts. The virion (so called because it is not visible under the microscope), on its own, has neither metabolism, nor any replication capability, nor autonomous evolution. A virus cannot be considered a living organism outside its host. The viral taxonomy is arbitrarily based on the nature of viral genomes, and viruses in a same family can infect a wide range of hosts, from mammals to insects. The nature of the host does not always appear in the virus name, e.g. the hosts of the [Yellow head virus](https://www.uniprot.org/taxonomy/96029) are shrimps.  
There are numerous virus-host interactions:

- shut-off of traduction
- immunoevasion
- latency
- oncogenesis on the virus side and antiviral state
- antigen presentation
- immune system on the host side

These interactions appear in the annotation of viral UniProtKB entries under various annotation types such as function, subunit, subcellular location and PTM.

Related document: [Controlled vocabulary of species](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/speclist.txt)

</div>
