import { ProteinsAPIVariation } from 'protvista-variation-adapter/dist/es/variants';

// Source: https://www.ebi.ac.uk/proteins/api/variation/P0DPR3
// Retrieved: 2023-11-23
const data = {
  accession: 'P0DPR3',
  entryName: 'TRDD1_HUMAN',
  proteinName: 'T cell receptor delta diversity 1',
  geneName: 'TRDD1',
  organismName: 'Homo sapiens',
  proteinExistence: 'Evidence at protein level',
  sequence: 'EI',
  sequenceChecksum: '6943266395824062464',
  sequenceVersion: 1,
  taxid: 9606,
  features: [
    {
      type: 'VARIANT',
      alternativeSequence: '*',
      begin: '1',
      end: '1',
      xrefs: [
        {
          name: 'ClinGen',
          id: 'CA485692332',
          url: 'https://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_caid?caid=CA485692332',
        },
        {
          name: 'gnomAD',
          id: 'rs1309716217',
          url: 'https://gnomad.broadinstitute.org/variant/rs1309716217?dataset=gnomad_r2_1',
        },
      ],
      cytogeneticBand: '14q11.2',
      genomicLocation: ['NC_000014.9:g.22438547G>T'],
      locations: [
        { loc: 'p.Glu1Ter', seqId: 'ENST00000415118', source: 'Ensembl' },
        { loc: 'c.1G>T', seqId: 'ENST00000415118', source: 'Ensembl' },
      ],
      codon: 'GAA/TAA',
      consequenceType: 'stop gained',
      wildType: 'E',
      mutatedType: '*',
      somaticStatus: 0,
      sourceType: 'large_scale_study',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'A',
      begin: '1',
      end: '1',
      xrefs: [
        {
          name: 'ClinGen',
          id: 'CA485692334',
          url: 'https://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_caid?caid=CA485692334',
        },
        {
          name: 'gnomAD',
          id: 'rs1225901762',
          url: 'https://gnomad.broadinstitute.org/variant/rs1225901762?dataset=gnomad_r2_1',
        },
      ],
      cytogeneticBand: '14q11.2',
      genomicLocation: ['NC_000014.9:g.22438548A>C'],
      locations: [
        { loc: 'p.Glu1Ala', seqId: 'ENST00000415118', source: 'Ensembl' },
        { loc: 'c.2A>C', seqId: 'ENST00000415118', source: 'Ensembl' },
      ],
      codon: 'GAA/GCA',
      consequenceType: 'missense',
      wildType: 'E',
      mutatedType: 'A',
      predictions: [
        {
          predictionValType: 'benign',
          predictorType: 'multi coding',
          score: 0.303,
          predAlgorithmNameType: 'PolyPhen',
          sources: ['Ensembl'],
        },
      ],
      somaticStatus: 0,
      sourceType: 'large_scale_study',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'D',
      begin: '1',
      end: '1',
      xrefs: [
        {
          name: 'ClinGen',
          id: 'CA7100339',
          url: 'https://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_caid?caid=CA7100339',
        },
        {
          name: 'ExAC',
          id: 'rs765605248',
          url: 'https://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?type=rs&rs=rs765605248',
        },
        {
          name: 'gnomAD',
          id: 'rs765605248',
          url: 'https://gnomad.broadinstitute.org/variant/rs765605248?dataset=gnomad_r2_1',
        },
      ],
      cytogeneticBand: '14q11.2',
      genomicLocation: ['NC_000014.9:g.22438549A>C'],
      locations: [
        { loc: 'p.Glu1Asp', seqId: 'ENST00000415118', source: 'Ensembl' },
        { loc: 'c.3A>C', seqId: 'ENST00000415118', source: 'Ensembl' },
      ],
      codon: 'GAA/GAC',
      consequenceType: 'missense',
      wildType: 'E',
      mutatedType: 'D',
      predictions: [
        {
          predictionValType: 'benign',
          predictorType: 'multi coding',
          score: 0.003,
          predAlgorithmNameType: 'PolyPhen',
          sources: ['Ensembl'],
        },
      ],
      somaticStatus: 0,
      sourceType: 'large_scale_study',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'T',
      begin: '2',
      end: '2',
      xrefs: [
        {
          name: 'ClinGen',
          id: 'CA485692342',
          url: 'https://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_caid?caid=CA485692342',
        },
        {
          name: 'TOPMed',
          id: 'rs1428147916',
          url: 'https://www.ncbi.nlm.nih.gov/snp/rs1428147916#frequency_tab',
          alternativeUrl:
            'http://gnomad.broadinstitute.org/awesome?query=rs1428147916',
        },
      ],
      cytogeneticBand: '14q11.2',
      genomicLocation: ['NC_000014.9:g.22438551T>C'],
      locations: [
        { loc: 'p.Ile2Thr', seqId: 'ENST00000415118', source: 'Ensembl' },
        { loc: 'c.5T>C', seqId: 'ENST00000415118', source: 'Ensembl' },
      ],
      codon: 'ATA/ACA',
      consequenceType: 'missense',
      wildType: 'I',
      mutatedType: 'T',
      predictions: [
        {
          predictionValType: 'possibly damaging',
          predictorType: 'multi coding',
          score: 0.674,
          predAlgorithmNameType: 'PolyPhen',
          sources: ['Ensembl'],
        },
      ],
      somaticStatus: 0,
      sourceType: 'large_scale_study',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'V',
      begin: '2',
      end: '2',
      xrefs: [
        {
          name: 'ClinGen',
          id: 'CA7100340',
          url: 'https://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_caid?caid=CA7100340',
        },
        {
          name: 'ExAC',
          id: 'rs750994808',
          url: 'https://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?type=rs&rs=rs750994808',
        },
        {
          name: 'gnomAD',
          id: 'rs750994808',
          url: 'https://gnomad.broadinstitute.org/variant/rs750994808?dataset=gnomad_r2_1',
        },
      ],
      cytogeneticBand: '14q11.2',
      genomicLocation: ['NC_000014.9:g.22438550A>G'],
      locations: [
        { loc: 'p.Ile2Val', seqId: 'ENST00000415118', source: 'Ensembl' },
        { loc: 'c.4A>G', seqId: 'ENST00000415118', source: 'Ensembl' },
      ],
      codon: 'ATA/GTA',
      consequenceType: 'missense',
      wildType: 'I',
      mutatedType: 'V',
      predictions: [
        {
          predictionValType: 'benign',
          predictorType: 'multi coding',
          score: 0.011,
          predAlgorithmNameType: 'PolyPhen',
          sources: ['Ensembl'],
        },
      ],
      somaticStatus: 0,
      sourceType: 'large_scale_study',
    },
  ],
} as ProteinsAPIVariation;

export default data;
