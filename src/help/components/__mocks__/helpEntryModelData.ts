import { HelpEntryResponse } from '../../types/apiModel';

// Source: help/canonical_and_isoforms
// Retrieved: 2025-02-04
const data: HelpEntryResponse = {
  id: 'canonical_and_isoforms',
  title:
    'What is the canonical sequence? Are all isoforms described in one entry?',
  lastModified: '2022-12-23',
  type: 'help',
  content:
    "\n# What is the canonical sequence?\n\nEach UniProtKB/Swiss-Prot entry contains all curated protein products encoded by a given gene in a given species or strain. For each UniProtKB/Swiss-Prot entry, we choose a canonical (or representative) sequence for display that should conform to at least one of the following criteria:\n\n1.  It is functional;\n2.  It is widely expressed;\n3.  It is encoded by conserved exons found in orthologous sequences;\n4.  It is identical to consensus sequences chosen by other resources and genome curation efforts such as CCDS and MANE (see also [UniProt's human proteome](https://www.uniprot.org/help/human_proteome))\n5.  In the absence of any information, we choose the longest sequence.\n\nSequences chosen according to these criteria generally allow the description of the majority of functionally important [domains](https://www.uniprot.org/help/domain), [motifs](https://www.uniprot.org/help/motif), [sites](https://www.uniprot.org/help/site), and [post-translational modifications](https://www.uniprot.org/help/ptm_processing_section), naturally occurring [variants](https://www.uniprot.org/help/variant) with functional and clinical significance, and other [sequence features](https://www.uniprot.org/help/sequence_annotation).\n\nAdditional information can be found in the ['Alternative sequence'](https://www.uniprot.org/help/var_seq) subsection.\n\nThe various UniProtKB distribution formats (Flat Text, XML, RDF/XML) display only the canonical sequence. The website's ['Sequences'](https://www.uniprot.org/help/sequences_section) section displays the canonical sequence, but for convenience it offers also a view of the isoforms that are described in the 'Alternative sequence' subsection.\n\n# Are all isoforms described in one UniProtKB/Swiss-Prot entry?\n\nWhenever possible, all the protein products encoded by one gene in a given species are described in a single UniProtKB/Swiss-Prot entry, including isoforms generated by alternative splicing, alternative promoter usage, and alternative translation initiation (\\*). However, some alternative splicing isoforms derived from the same gene share only a few exons, if any at all, the same for some 'trans-splicing' events. In these cases, the divergence is obviously too important to merge all protein sequences into a single entry and the isoforms have to be described in separate 'external' entries.\n\nExample: [isoforms derived from the lola gene (Drosophila melanogaster)](https://www.uniprot.org/uniprotkb/P42284#sequences)\n\n(\\*) Important remark: Due to the increase of sequence data coming from large-scale sequencing projects, UniProtKB/TrEMBL may contain additional predicted sequences encoded by genes which are described in a UniProtKB/Swiss-Prot entry.\n\n# How can I retrieve isoform sequences?\n\nAlternative sequences, described in either single or separate entries, are all available for Blast searches.\n\nIsoform sequences can be downloaded in FASTA format from our [FTP download index page](https://www.uniprot.org/downloads) (choose the file: 'Isoform sequences').\n\nQuery-derived sets of canonical sequences alone or canonical and isoform sequences can also be downloaded in FASTA format (see [How to retrieve sets of UniProtKB protein sequences?](https://www.uniprot.org/help/retrieve_sets)).\n\n# See also\n\n- [What are UniProtKB's criteria for defining a CDS as a protein?](https://www.uniprot.org/help/cds_protein_definition)\n- [How are protein sequence variety and protein diversity represented in UniProtKB?](https://www.uniprot.org/help/protein_diversity)\n- [Sequence length](https://www.uniprot.org/help/sequence_length)\n- [Alternative products](https://www.uniprot.org/help/alternative_products)\n- [Alternative sequence](https://www.uniprot.org/help/var_seq)\n- [Sequence conflict](https://www.uniprot.org/help/conflict)",
  categories: [
    'UniProtKB',
    'Sequence',
    'Text search',
    'Download',
    'Technical',
    'faq',
  ],
};
export default data;
