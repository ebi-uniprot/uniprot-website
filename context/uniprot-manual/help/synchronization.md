---
title: UniProt release cycle
type: help
categories: UniProtKB,UniRef,UniParc,Cross-references,Download,Release,faq
---

# How frequently is UniProt released?

UniProt releases are published every 2-3 months, with possible exceptions in January and summer due to reduced staff during holiday periods.

The current release number format is YYYY\_XX where YYYY is the calendar year and XX a 2-digit number that is incremented for each release of a given year, e.g. 2025\_04, 2026\_01, etc.

# What is the synchronization delay with other databases?

Translations of nucleotide sequences as submitted to one of the members of International Nucleotide Sequence Database Collaboration (INSDC) (the European Nucleotide Archive (ENA), GenBank and the DNA Data Bank of Japan (DDBJ)) are included in UniProtKB/TrEMBL at every release, and most cross-references are also updated at every release.

However, UniProtKB data is "frozen" significantly earlier than the public release date, which can result in a delay of 8 to 16 weeks between the update of a related database and the appearance of relevant data in the public version of UniProtKB.

# Can I gain access to previous releases?

We archive previous releases on our [ftp site](https://ftp.uniprot.org/pub/databases/uniprot/previous_releases) for at least 2 years. Beyond that time, we archive the first release of a year, YYYY\_01. We therefore recommend that you **use the first release of a year if you develop a tool** trained on a given release or subset, in order to allow the readers of your publication to reproduce your work at a later point in time.

Related terms: update frequency, release archive
