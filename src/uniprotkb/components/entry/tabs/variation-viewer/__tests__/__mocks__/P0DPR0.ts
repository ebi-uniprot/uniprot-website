import { ProteinsAPIVariation } from '@nightingale-elements/nightingale-variation';

// Source: https://www.ebi.ac.uk/proteins/api/variation/P0DPR0
// Retrieved: 2025-06-13
const data = {
  accession: 'P0DPR0',
  entryName: 'HA33C_CBCP',
  proteinName: 'Main hemagglutinin component type C',
  geneName: 'HA-33',
  organismName: 'Clostridium botulinum C phage',
  proteinExistence: 'Evidence at protein level',
  sequence:
    'MSQTNANDLRNNEVFFISPSNNTNKVLDKISQSEVKLWNKLSGANQKWRLIYDTNKQAYKIKVMDNTSLILTWNAPLSSVSVKTDTNGDNQYWYLLQNYISRNVIIRNYMNPNLVLQYNIDDTLMVSTQTSSSNQFFKFSNCIYEALNNRNCKLQTQLNSDRFLSKNLNSQIIVLWQWFDSSRQKWIIEYNETKSAYTLKCQENNRYLTWIQNSNNYVETYQSTDSLIQYWNINYLDNDASKYILYNLQDTNRVLDVYNSQIANGTHVIVDSYHGNTNQQWIINLI',
  sequenceChecksum: '2457880181934753770',
  sequenceVersion: 1,
  taxid: 12336,
  features: [
    {
      type: 'VARIANT',
      alternativeSequence: 'S',
      begin: '22',
      end: '22',
      locations: [
        {
          loc: 'p.Asn22Ser',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'missense',
      wildType: 'N',
      mutatedType: 'S',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'SKNLGS',
      begin: '39',
      end: '44',
      locations: [
        {
          loc: 'p.Asn39_Ala44delinsSerLysAsnLeuGlySer',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'delins',
      wildType: 'NKLSGA',
      mutatedType: 'SKNLGS',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'D',
      begin: '74',
      end: '74',
      locations: [
        {
          loc: 'p.Asn74Asp',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'missense',
      wildType: 'N',
      mutatedType: 'D',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'TN',
      begin: '88',
      end: '89',
      locations: [
        {
          loc: 'p.Gly88_Asp89delinsThrAsn',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'delins',
      wildType: 'GD',
      mutatedType: 'TN',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'D',
      begin: '98',
      end: '98',
      locations: [
        {
          loc: 'p.Asn98Asp',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'missense',
      wildType: 'N',
      mutatedType: 'D',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'L',
      begin: '106',
      end: '106',
      locations: [
        {
          loc: 'p.Ile106Leu',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'missense',
      wildType: 'I',
      mutatedType: 'L',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'T',
      begin: '120',
      end: '120',
      locations: [
        {
          loc: 'p.Ile120Thr',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'missense',
      wildType: 'I',
      mutatedType: 'T',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'I',
      begin: '125',
      end: '125',
      locations: [
        {
          loc: 'p.Met125Ile',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'missense',
      wildType: 'M',
      mutatedType: 'I',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'N',
      begin: '133',
      end: '133',
      locations: [
        {
          loc: 'p.Ser133Asn',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'missense',
      wildType: 'S',
      mutatedType: 'N',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
    {
      type: 'VARIANT',
      alternativeSequence: 'N',
      begin: '267',
      end: '267',
      locations: [
        {
          loc: 'p.His267Asn',
          seqId: 'P0DPR0',
          source: 'UniProt',
        },
      ],
      consequenceType: 'missense',
      wildType: 'H',
      mutatedType: 'N',
      somaticStatus: 0,
      descriptions: [
        {
          value: 'strain: Type C / C-6814',
          sources: ['UniProt'],
        },
      ],
      sourceType: 'uniprot',
    },
  ],
};

export default data as ProteinsAPIVariation;
