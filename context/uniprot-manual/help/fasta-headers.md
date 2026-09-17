---
title: FASTA headers
type: help
categories: Technical,Sequence,help
---

The following is a description of FASTA headers for UniProtKB (including alternative isoforms), UniRef, UniParc (including proteomes) and archived UniProtKB versions. NCBI's program formatdb (in particular its -o option) is compatible with the UniProtKB FASTA headers.

Note that in the document below square brackets `[ ]` indicate optional fields.

**Table of contents**

* [UniProtKB](https://www.uniprot.org/help/fasta-headers#uniprotkb)
   * [UniProtKB alternative isoforms](https://www.uniprot.org/help/fasta-headers#uniprotkb-alternative-isoforms)
* [UniRef](https://www.uniprot.org/help/fasta-headers#uniref)
* [UniParc](https://www.uniprot.org/help/fasta-headers#uniparc)
   * [UniParc proteomes](https://www.uniprot.org/help/fasta-headers#uniparc-proteomes)
* [Archived UniProtKB sequence versions](https://www.uniprot.org/help/fasta-headers#archived-uniprotkb-sequence-versions)
* [Pan Proteomes FASTA](https://www.uniprot.org/help/fasta-headers#pan-proteome-fasta)


# UniProtKB
```
>db|UniqueIdentifier|EntryName ProteinName OS=OrganismName OX=OrganismIdentifier[ GN=GeneName] PE=ProteinExistence SV=SequenceVersion
```
Where:

- _db_ is 'sp' for UniProtKB/Swiss-Prot and 'tr' for UniProtKB/TrEMBL.
- _UniqueIdentifier_ is the primary [accession number](https://www.uniprot.org/help/accession_numbers) of the UniProtKB entry.
- _EntryName_ is the [entry name](https://www.uniprot.org/help/entry_name) of the UniProtKB entry.
- _ProteinName_ is the [recommended name](https://www.uniprot.org/help/protein_names) of the UniProtKB entry as annotated in the `RecName` field. For UniProtKB/TrEMBL entries without a `RecName` field, the `SubName` field is used. In case of multiple `SubNames`, the first one is used. The 'precursor' attribute is excluded, 'Fragment' is included with the name if applicable.
- _OrganismName_ is the [scientific name of the source organism](https://www.uniprot.org/help/organism-name) of the UniProtKB entry.
- _OrganismIdentifier_ is the [unique identifier of the source organism, assigned by the NCBI](https://www.uniprot.org/help/taxonomic_identifier).
- _GeneName_ is the first [gene name](https://www.uniprot.org/help/gene_name) of the UniProtKB entry. If there is no gene name, `OrderedLocusName` or `ORFname`, the `GN` field is not listed.
- _ProteinExistence_ is the numerical value describing the [evidence for the existence](https://www.uniprot.org/help/protein_existence) of the protein.
- _SequenceVersion_ is the [version number](https://www.uniprot.org/help/entry_history) of the sequence.

Examples:
```
>sp|Q8I6R7|ACN2_ACAGO Acanthoscurrin-2 (Fragment) OS=Acanthoscurria gomesiana OX=115339 GN=acantho2 PE=1 SV=1
>sp|P27748|ACOX_CUPNH Acetoin catabolism protein X OS=Cupriavidus necator (strain ATCC 17699 / H16 / DSM 428 / Stanier 337) OX=381666 GN=acoX PE=4 SV=2
>sp|P04224|HA22_MOUSE H-2 class II histocompatibility antigen, E-K alpha chain OS=Mus musculus OX=10090 PE=1 SV=1

>tr|Q3SA23|Q3SA23_9HIV1 Protein Nef (Fragment) OS=Human immunodeficiency virus 1  OX=11676 GN=nef PE=3 SV=1
>tr|Q8N2H2|Q8N2H2_HUMAN cDNA FLJ90785 fis, clone THYRO1001457, moderately similar to H.sapiens protein kinase C mu OS=Homo sapiens OX=9606 PE=2 SV=1
```

## UniProtKB alternative isoforms

This format only applies to UniProtKB/Swiss-Prot alternative isoform sequences.
```
>sp|IsoID|EntryName Isoform IsoformName of ProteinName OS=OrganismName OX=OrganismIdentifier[ GN=GeneName]
```

Where:

- _IsoID_ is the isoform identifier as assigned in the [ALTERNATIVE PRODUCTS](https://www.uniprot.org/help/alternative_products) section of the UniProtKB entry.
- _IsoformName_ is the isoform name as annotated in the ALTERNATIVE PRODUCTS `Name` field of the UniProtKB entry.

_ProteinExistence_ and _SequenceVersion_ do not apply to alternative isoforms (_ProteinExistence_ is dependent on the number of cDNA sequences, which is not known for individual isoforms).

Example:
```
>sp|Q4R572-2|1433B_MACFA Isoform Short of 14-3-3 protein beta/alpha OS=Macaca fascicularis OX=9541 GN=YWHAB
```

# UniRef

```
>UniqueIdentifier ClusterName n=Members Tax=TaxonName TaxID=TaxonIdentifier RepID=RepresentativeMember
```

Where:

- _UniqueIdentifier_ is the unique identifier of the UniRef cluster.
- _ClusterName_ is the name of the UniRef cluster.
- _Members_ is the number of UniRef cluster members.
- _TaxonName_ is the scientific name of the lowest common taxon shared by all UniRef cluster members.
- _TaxonIdentifier_ is the NCBI taxonomy identifier of the lowest common taxon shared by all UniRef cluster members.
- _RepresentativeMember_ is the entry name of the representative member of the UniRef cluster.

Example:
```
>UniRef50_Q9K794 Putative AgrB-like protein n=2 Tax=Bacillus TaxID=1386 RepID=AGRB_BACHD
```

# UniParc
```
>UniqueIdentifier status=Status
```

Where:

- _UniqueIdentifier_ is the unique identifier of the UniParc entry.
- _Status_ is 'active' if the UniParc entry has at least one active cross-reference, and 'inactive' if it does not have any active cross-references.

Example:
```
>UPI0000000005 status=active
```

## UniParc proteomes

This format is only available for UniParc entry sets that correspond to the sequences of a proteome. It contains biological information from the UniParc source database entries that are associated with the requested proteome.

```
>UniqueIdentifier[ ProteinNameList] OS=OrganismName OX=OrganismIdentifier[ GN=GeneNameList][ AC=UniProtKBAcList][ SS=SourceIdList] PC=Proteome:ComponentList
```
    
Where:

- _UniqueIdentifier_ is the unique identifier of the UniParc entry.
- _ProteinNameList_ is an optional list of protein names.
- _OrganismName_ is the scientific name of the proteome's source organism.
- _OrganismIdentifier_ is the [unique identifier of the proteome's source organism, assigned by the NCBI](https://www.uniprot.org/help/taxonomic_identifier).
- _GeneNameList_ is an optional list of gene names.
- _UniProtKBAcList_ is an optional list of the UniProtKB primary accession numbers that are linked to the proteome.
- _SourceIdList_ is an optional list of the 'Source Sequence' identifiers that are linked to the proteome. These are the identifiers of the proteins that are annotated on the associated genome records from EMBL, Ensembl or RefSeq.
- _Proteome:ComponentList_ is the identifier of the proteome, separated by ':' from a list of the components where the genes are encoded.

Lists are allowed in several fields to represent paraloguous genes that encode the same sequence. List elements are separated by the pipe symbol '|'.

The protein and gene names come from the corresponding UniProtKB entries, where these exist, and otherwise from the 'Source Sequence' database entries.

Examples:

Sequence that exists in UniProtKB: protein and gene name come from the UniProtKB entry (AC=P37636):
```  
>UPI000013B286 Multidrug resistance protein MdtE OS=Escherichia coli (strain K12) OX=83333 GN=mdtE AC=P37636 SS=EMBL:AAC76538 PC=UP000000625:Chromosome
```
    
Sequence that does not exist in UniProtKB: protein and gene name come from the 'Source Sequence' entry (SS=EMBL:CQR80801):
```
>UPI000000E135 Oligopeptide transporter subunit OS=Escherichia coli (strain K12) OX=83333 GN=oppF SS=EMBL:CQR80801 PC=UP000033172:Chromosome I
```

Sequence that corresponds to 3 paraloguous genes that are encoded on 3 different chromosomes:

```
>UPI00000000C1 Calmodulin-1|Calmodulin-2|Calmodulin-3 OS=Homo sapiens OX=9606 GN=CALM1|CALM2|CALM3 AC=P0DP23|P0DP24|P0DP25 SS=Ensembl:ENSP00000349467|Ensembl:ENSP00000272298|Ensembl:ENSP00000291295|Ensembl:ENSP00000472141 PC=UP000005640:Chromosome 14|Chromosome 2|Chromosome 19
```


# Archived UniProtKB sequence versions

```
>db|UniqueIdentifier archived from Release ReleaseNumber ReleaseDate SV=SequenceVersion
```

Where:

- _db_ is 'sp' for UniProtKB/Swiss-Prot and 'tr' for UniProtKB/TrEMBL.
- _UniqueIdentifier_ is the primary accession number of the UniProtKB entry.
- _ReleaseNumber_ refers to the release from which the sequence was archived (Swiss-Prot or TrEMBL release numbers for releases prior to the first UniProt release, and both UniProt and Swiss-Prot or TrEMBL release numbers for releases after the first UniProt release).
- _ReleaseDate_ is the date of the release form which the sequence was archived.
- _SequenceVersion_ is the version number of the sequence.

Examples:

'pre-UniProt':
```
>sp|P05067 archived from Release 18.0 01-MAY-1991 SV=3
>tr|Q55167 archived from Release 17.0 01-JUN-2001 SV=1
```

'post-UniProt':
```
>sp|P05067 archived from Release 9.2/51.2 28-NOV-2006 SV=3
>tr|A0RTJ8 archived from Release 11.0/36.0 29-MAY-2007 SV=1
```

Related terms: FASTA header, FASTA format, FASTA comment


# Pan Proteome FASTA
```
>ppIdentifier|UniparcIdentifier ProteinFrequency ProteomeIdentifier SourceIdentifier OX=OrganismIdentifier OS=OrganismName [ ; db|EntryAccession|EntryName ProteinName GN=GeneName PE=ProteinExistence SV=SequenceVersion]
```


Where:

 - *ppIdentifier* is the pan proteome identifier in the format pp<species_taxid> (for example, pp562).
 - *UniparcIdentifier* is the [UniParc identifier](https://www.uniprot.org/help/uniparc_id) (UPI) of the representative sequence; together with ppIdentifier, it identifies the pan proteome protein cluster.
 - *ProteinFrequency* is the percentage of clustered proteomes containing at least one sequence in that cluster.
 - *ProteomeIdentifier* is the UniProt [proteome identifier](https://www.uniprot.org/help/proteome_id) (UPID) of the proteome containing the displayed sequence.
 - *SourceIdentifier* is the sequence identifier in the source genome database (for example, ENA AAC76437).
 - *OX*=OrganismIdentifier is the NCBI [taxonomy identifier](https://www.uniprot.org/help/taxonomy) of the source organism.
 - *OS*=[OrganismName](https://www.uniprot.org/help/organism-name) is the scientific name of the source organism/strain.

Optional UniProtKB annotation block (present only when the representative sequence is a UniProtKB entry, introduced by a semicolon “;”:
 - *db* is the UniProtKB database code (sp for Swiss-Prot, tr for TrEMBL).
 - *EntryAccession* is the UniProtKB primary [accession](https://www.uniprot.org/help/accession_numbers) number.
 - *EntryName* is the UniProtKB [entry name](https://www.uniprot.org/help/entry_name).
 - *ProteinName* is the recommended [protein name](https://www.uniprot.org/help/protein_names).
 - *GN*=GeneName is the recommended [gene name](https://www.uniprot.org/help/gene_name) in the UniProtKB entry.
 - *PE*=ProteinExistence is the UniProtKB [protein existence evidence level](https://www.uniprot.org/help/protein_existence).
 - *SV*=SequenceVersion is the [sequence version](https://www.uniprot.org/help/entry_history) of the displayed entry.
 - Example:
  ```
   >pp562|UPI0000126990 96% UP000000625 AAC76437 OX=83333 OS=Escherichia coli (strain K12) ; sp|P13001|BIOH_ECOLI Pimeloyl-[acyl-carrier protein] methyl ester esterase GN=bioH PE=1 SV=1
  ```

Notes:
 - Every FASTA entry has one header line and one sequence line.
 - The optional block is not present for representatives that consist only of UniParc (non-UniProtKB) entries.
 - ProteinFrequency can be used to identify more conserved (“core-like”) clusters across proteomes.



    
