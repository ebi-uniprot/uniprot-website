import { GenomicEntry } from '../../types';

// Source: https://www.ebi.ac.uk/proteins/api/coordinates?accession=O00560
// Retrieved: 2023-10-05
const mock: GenomicEntry[] = [
  {
    accession: 'O00560',
    name: 'SDCB1_HUMAN',
    taxid: 9606,
    sequence:
      'MSLYPSLEDLKVDKVIQAQTAFSANPANPAILSEASAPIPHDGNLYPRLYPELSQYMGLSLNEEEIRANVAVVSGAPLQGQLVARPSSINYMVAPVTGNDVGIRRAEIKQGIREVILCKDQDGKIGLRLKSIDNGIFVQLVQANSPASLVGLRFGDQVLQINGENCAGWSSDKAHKVLKQAFGEKITMTIRDRPFERTITMHKDSTGHVGFIFKNGKITSIVKDSSAARNGLLTEHNICEINGQNVIGLKDSQIADILSTSGTVVTITIMPAFIFEHIIKRMAPSIMKSLMDHTIPEV',
    protein: {
      recommendedName: { fullName: 'Syntenin-1' },
      alternativeName: [
        {
          fullName: 'Melanoma differentiation-associated protein 9',
          shortName: ['MDA-9'],
        },
        {
          fullName: 'Pro-TGF-alpha cytoplasmic domain-interacting protein 18',
          shortName: ['TACIP18'],
        },
        { fullName: 'Scaffold protein Pbp1' },
        { fullName: 'Syndecan-binding protein 1' },
      ],
    },
    gene: [
      { value: 'SDCBP', type: 'primary' },
      { value: 'MDA9', type: 'synonym' },
      { value: 'SYCL', type: 'synonym' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 17, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58565034, status: 'certain' },
                end: { position: 58565084, status: 'certain' },
              },
              id: 'ENSE00001783349',
            },
            {
              proteinLocation: {
                begin: { position: 18, status: 'certain' },
                end: { position: 44, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58570887, status: 'certain' },
                end: { position: 58570965, status: 'certain' },
              },
              id: 'ENSE00003497476',
            },
            {
              proteinLocation: {
                begin: { position: 44, status: 'certain' },
                end: { position: 80, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58572205, status: 'certain' },
                end: { position: 58572314, status: 'certain' },
              },
              id: 'ENSE00003592323',
            },
            {
              proteinLocation: {
                begin: { position: 81, status: 'certain' },
                end: { position: 134, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58575900, status: 'certain' },
                end: { position: 58576061, status: 'certain' },
              },
              id: 'ENSE00003556973',
            },
            {
              proteinLocation: {
                begin: { position: 135, status: 'certain' },
                end: { position: 193, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58578033, status: 'certain' },
                end: { position: 58578208, status: 'certain' },
              },
              id: 'ENSE00000928402',
            },
            {
              proteinLocation: {
                begin: { position: 193, status: 'certain' },
                end: { position: 250, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58579623, status: 'certain' },
                end: { position: 58579794, status: 'certain' },
              },
              id: 'ENSE00000928403',
            },
            {
              proteinLocation: {
                begin: { position: 251, status: 'certain' },
                end: { position: 281, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58580517, status: 'certain' },
                end: { position: 58580608, status: 'certain' },
              },
              id: 'ENSE00000928404',
            },
            {
              proteinLocation: {
                begin: { position: 281, status: 'certain' },
                end: { position: 298, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58581686, status: 'certain' },
                end: { position: 58581737, status: 'certain' },
              },
              id: 'ENSE00002105837',
            },
          ],
          chromosome: '8',
          start: 58565034,
          end: 58581737,
          reverseStrand: false,
        },
        feature: [
          {
            location: {
              begin: { position: 114, status: 'certain' },
              end: { position: 193, status: 'certain' },
            },
            description: 'PDZ 1.',
            evidence: [
              {
                dbReference: { id: 'PRU00143', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 58575999, status: 'certain' },
              end: { position: 58579623, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 45, status: 'certain' },
              end: { position: 49, status: 'certain' },
            },
            description: 'LYPX(n)L motif 2.',
            evidence: [
              {
                dbReference: { id: 'O08992', type: 'UniProtKB' },
                code: 'ECO:0000250',
              },
            ],
            type: 'short sequence motif',
            genomeLocation: {
              begin: { position: 58572207, status: 'certain' },
              end: { position: 58572221, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 250, status: 'certain' },
              end: { position: 251, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
              { dbReference: { id: '4Z33', type: 'PDB' }, code: 'ECO:0007744' },
            ],
            type: 'binding site',
            genomeLocation: {
              begin: { position: 58579792, status: 'certain' },
              end: { position: 58580519, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 263, status: 'certain' },
              end: { position: 271, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58580553, status: 'certain' },
              end: { position: 58580579, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 127, status: 'certain' },
              end: { position: 132, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58576038, status: 'certain' },
              end: { position: 58576055, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 146, status: 'certain' },
              end: { position: 149, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58578066, status: 'certain' },
              end: { position: 58578077, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 234, status: 'certain' },
              end: { position: 241, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579744, status: 'certain' },
              end: { position: 58579767, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 226, status: 'certain' },
              end: { position: 230, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58579720, status: 'certain' },
              end: { position: 58579734, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 171, status: 'certain' },
              end: { position: 180, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58578141, status: 'certain' },
              end: { position: 58578170, status: 'certain' },
            },
          },
          {
            location: { position: { position: 1, status: 'certain' } },
            description: 'Removed.',
            evidence: [
              { code: 'ECO:0000269' },
              {
                dbReference: { id: '19413330', type: 'PubMed' },
                code: 'ECO:0007744',
              },
            ],
            type: 'initiator methionine',
            genomeLocation: {
              begin: { position: 58565034, status: 'certain' },
              end: { position: 58565036, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 186, status: 'certain' },
              end: { position: 191, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58578186, status: 'certain' },
              end: { position: 58578203, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 121, status: 'certain' },
              end: { position: 123, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1W9O', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58576020, status: 'certain' },
              end: { position: 58576028, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 3, status: 'certain' },
              end: { position: 7, status: 'certain' },
            },
            description: 'LYPX(n)L motif 1.',
            evidence: [
              {
                dbReference: { id: 'O08992', type: 'UniProtKB' },
                code: 'ECO:0000250',
              },
            ],
            type: 'short sequence motif',
            genomeLocation: {
              begin: { position: 58565040, status: 'certain' },
              end: { position: 58565054, status: 'certain' },
            },
          },
          {
            location: { position: { position: 81, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '15489334', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_038375',
            genomeLocation: {
              begin: { position: 58575900, status: 'certain' },
              end: { position: 58575902, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 111, status: 'certain' },
              end: { position: 117, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58575990, status: 'certain' },
              end: { position: 58576010, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 198, status: 'certain' },
              end: { position: 273, status: 'certain' },
            },
            description: 'PDZ 2.',
            evidence: [
              {
                dbReference: { id: 'PRU00143', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 58579636, status: 'certain' },
              end: { position: 58580585, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 217, status: 'certain' },
              end: { position: 221, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579693, status: 'certain' },
              end: { position: 58579707, status: 'certain' },
            },
          },
          {
            location: { position: { position: 6, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '23186163', type: 'PubMed' },
                code: 'ECO:0007744',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 58565049, status: 'certain' },
              end: { position: 58565051, status: 'certain' },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: { position: { position: 62, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 58572258, status: 'certain' },
              end: { position: 58572260, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 135, status: 'certain' },
              end: { position: 142, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58578033, status: 'certain' },
              end: { position: 58578056, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 272, status: 'certain' },
              end: { position: 279, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58580580, status: 'certain' },
              end: { position: 58580603, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 284, status: 'certain' },
              end: { position: 290, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58581693, status: 'certain' },
              end: { position: 58581713, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 49, status: 'certain' },
              end: { position: 53, status: 'certain' },
            },
            description: 'LYPX(n)L motif 3.',
            evidence: [
              {
                dbReference: { id: 'O08992', type: 'UniProtKB' },
                code: 'ECO:0000250',
              },
            ],
            type: 'short sequence motif',
            genomeLocation: {
              begin: { position: 58572219, status: 'certain' },
              end: { position: 58572233, status: 'certain' },
            },
          },
          {
            original: 'K',
            variation: ['A'],
            location: { position: { position: 250, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 58579792, status: 'certain' },
              end: { position: 58579794, status: 'certain' },
            },
          },
          {
            location: { position: { position: 215, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
              { dbReference: { id: '4Z33', type: 'PDB' }, code: 'ECO:0007744' },
            ],
            type: 'binding site',
            genomeLocation: {
              begin: { position: 58579687, status: 'certain' },
              end: { position: 58579689, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 197, status: 'certain' },
              end: { position: 202, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579633, status: 'certain' },
              end: { position: 58579650, status: 'certain' },
            },
          },
          {
            location: { position: { position: 2, status: 'certain' } },
            description: 'N-acetylserine.',
            evidence: [
              { code: 'ECO:0000269' },
              {
                dbReference: { id: '19413330', type: 'PubMed' },
                code: 'ECO:0007744',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 58565037, status: 'certain' },
              end: { position: 58565039, status: 'certain' },
            },
          },
          {
            original: 'N',
            variation: ['D'],
            location: { position: { position: 215, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 58579687, status: 'certain' },
              end: { position: 58579689, status: 'certain' },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: { position: { position: 69, status: 'certain' } },
            description: 'in dbSNP:rs1127509.',
            evidence: [
              {
                dbReference: { id: '9391086', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'sequence variant',
            id: 'VAR_013160',
            genomeLocation: {
              begin: { position: 58572279, status: 'certain' },
              end: { position: 58572281, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 211, status: 'certain' },
              end: { position: 214, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579675, status: 'certain' },
              end: { position: 58579686, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 12, status: 'certain' },
              end: { position: 17, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '14702039', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_038374',
            genomeLocation: {
              begin: { position: 58565067, status: 'certain' },
              end: { position: 58565084, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 205, status: 'certain' },
              end: { position: 208, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1N99', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579657, status: 'certain' },
              end: { position: 58579668, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 2, status: 'certain' },
              end: { position: 60, status: 'certain' },
            },
            description: 'Interaction with PDCD6IP.',
            evidence: [
              {
                dbReference: { id: '22660413', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 58565037, status: 'certain' },
              end: { position: 58572254, status: 'certain' },
            },
          },
          {
            original: 'K',
            variation: ['A'],
            location: { position: { position: 214, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 58579684, status: 'certain' },
              end: { position: 58579686, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 251, status: 'certain' },
              end: { position: 260, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58580517, status: 'certain' },
              end: { position: 58580546, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 157, status: 'certain' },
              end: { position: 161, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58578099, status: 'certain' },
              end: { position: 58578113, status: 'certain' },
            },
          },
          {
            location: { position: { position: 46, status: 'certain' } },
            description: 'Phosphotyrosine.',
            evidence: [
              {
                dbReference: { id: '24275569', type: 'PubMed' },
                code: 'ECO:0007744',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 58572210, status: 'certain' },
              end: { position: 58572212, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'ENSG00000137575',
        ensemblTranscriptId: 'ENST00000413219',
        ensemblTranslationId: 'ENSP00000411771',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 17, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58565034, status: 'certain' },
                end: { position: 58565084, status: 'certain' },
              },
              id: 'ENSE00003587770',
            },
            {
              proteinLocation: {
                begin: { position: 18, status: 'certain' },
                end: { position: 44, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58570887, status: 'certain' },
                end: { position: 58570965, status: 'certain' },
              },
              id: 'ENSE00003497476',
            },
            {
              proteinLocation: {
                begin: { position: 44, status: 'certain' },
                end: { position: 80, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58572205, status: 'certain' },
                end: { position: 58572314, status: 'certain' },
              },
              id: 'ENSE00003592323',
            },
            {
              proteinLocation: {
                begin: { position: 81, status: 'certain' },
                end: { position: 134, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58575900, status: 'certain' },
                end: { position: 58576061, status: 'certain' },
              },
              id: 'ENSE00003556973',
            },
            {
              proteinLocation: {
                begin: { position: 135, status: 'certain' },
                end: { position: 193, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58578033, status: 'certain' },
                end: { position: 58578208, status: 'certain' },
              },
              id: 'ENSE00000928402',
            },
            {
              proteinLocation: {
                begin: { position: 193, status: 'certain' },
                end: { position: 250, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58579623, status: 'certain' },
                end: { position: 58579794, status: 'certain' },
              },
              id: 'ENSE00000928403',
            },
            {
              proteinLocation: {
                begin: { position: 251, status: 'certain' },
                end: { position: 281, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58580517, status: 'certain' },
                end: { position: 58580608, status: 'certain' },
              },
              id: 'ENSE00000928404',
            },
            {
              proteinLocation: {
                begin: { position: 281, status: 'certain' },
                end: { position: 298, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 58581686, status: 'certain' },
                end: { position: 58581737, status: 'certain' },
              },
              id: 'ENSE00002131120',
            },
          ],
          chromosome: '8',
          start: 58565034,
          end: 58581737,
          reverseStrand: false,
        },
        feature: [
          {
            location: {
              begin: { position: 114, status: 'certain' },
              end: { position: 193, status: 'certain' },
            },
            description: 'PDZ 1.',
            evidence: [
              {
                dbReference: { id: 'PRU00143', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 58575999, status: 'certain' },
              end: { position: 58579623, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 45, status: 'certain' },
              end: { position: 49, status: 'certain' },
            },
            description: 'LYPX(n)L motif 2.',
            evidence: [
              {
                dbReference: { id: 'O08992', type: 'UniProtKB' },
                code: 'ECO:0000250',
              },
            ],
            type: 'short sequence motif',
            genomeLocation: {
              begin: { position: 58572207, status: 'certain' },
              end: { position: 58572221, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 250, status: 'certain' },
              end: { position: 251, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
              { dbReference: { id: '4Z33', type: 'PDB' }, code: 'ECO:0007744' },
            ],
            type: 'binding site',
            genomeLocation: {
              begin: { position: 58579792, status: 'certain' },
              end: { position: 58580519, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 263, status: 'certain' },
              end: { position: 271, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58580553, status: 'certain' },
              end: { position: 58580579, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 127, status: 'certain' },
              end: { position: 132, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58576038, status: 'certain' },
              end: { position: 58576055, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 146, status: 'certain' },
              end: { position: 149, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58578066, status: 'certain' },
              end: { position: 58578077, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 234, status: 'certain' },
              end: { position: 241, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579744, status: 'certain' },
              end: { position: 58579767, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 226, status: 'certain' },
              end: { position: 230, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58579720, status: 'certain' },
              end: { position: 58579734, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 171, status: 'certain' },
              end: { position: 180, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58578141, status: 'certain' },
              end: { position: 58578170, status: 'certain' },
            },
          },
          {
            location: { position: { position: 1, status: 'certain' } },
            description: 'Removed.',
            evidence: [
              { code: 'ECO:0000269' },
              {
                dbReference: { id: '19413330', type: 'PubMed' },
                code: 'ECO:0007744',
              },
            ],
            type: 'initiator methionine',
            genomeLocation: {
              begin: { position: 58565034, status: 'certain' },
              end: { position: 58565036, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 186, status: 'certain' },
              end: { position: 191, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58578186, status: 'certain' },
              end: { position: 58578203, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 121, status: 'certain' },
              end: { position: 123, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1W9O', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58576020, status: 'certain' },
              end: { position: 58576028, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 3, status: 'certain' },
              end: { position: 7, status: 'certain' },
            },
            description: 'LYPX(n)L motif 1.',
            evidence: [
              {
                dbReference: { id: 'O08992', type: 'UniProtKB' },
                code: 'ECO:0000250',
              },
            ],
            type: 'short sequence motif',
            genomeLocation: {
              begin: { position: 58565040, status: 'certain' },
              end: { position: 58565054, status: 'certain' },
            },
          },
          {
            location: { position: { position: 81, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '15489334', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_038375',
            genomeLocation: {
              begin: { position: 58575900, status: 'certain' },
              end: { position: 58575902, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 111, status: 'certain' },
              end: { position: 117, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58575990, status: 'certain' },
              end: { position: 58576010, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 198, status: 'certain' },
              end: { position: 273, status: 'certain' },
            },
            description: 'PDZ 2.',
            evidence: [
              {
                dbReference: { id: 'PRU00143', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 58579636, status: 'certain' },
              end: { position: 58580585, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 217, status: 'certain' },
              end: { position: 221, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579693, status: 'certain' },
              end: { position: 58579707, status: 'certain' },
            },
          },
          {
            location: { position: { position: 6, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '23186163', type: 'PubMed' },
                code: 'ECO:0007744',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 58565049, status: 'certain' },
              end: { position: 58565051, status: 'certain' },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: { position: { position: 62, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 58572258, status: 'certain' },
              end: { position: 58572260, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 135, status: 'certain' },
              end: { position: 142, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58578033, status: 'certain' },
              end: { position: 58578056, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 272, status: 'certain' },
              end: { position: 279, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58580580, status: 'certain' },
              end: { position: 58580603, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 284, status: 'certain' },
              end: { position: 290, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58581693, status: 'certain' },
              end: { position: 58581713, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 49, status: 'certain' },
              end: { position: 53, status: 'certain' },
            },
            description: 'LYPX(n)L motif 3.',
            evidence: [
              {
                dbReference: { id: 'O08992', type: 'UniProtKB' },
                code: 'ECO:0000250',
              },
            ],
            type: 'short sequence motif',
            genomeLocation: {
              begin: { position: 58572219, status: 'certain' },
              end: { position: 58572233, status: 'certain' },
            },
          },
          {
            original: 'K',
            variation: ['A'],
            location: { position: { position: 250, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 58579792, status: 'certain' },
              end: { position: 58579794, status: 'certain' },
            },
          },
          {
            location: { position: { position: 215, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
              { dbReference: { id: '4Z33', type: 'PDB' }, code: 'ECO:0007744' },
            ],
            type: 'binding site',
            genomeLocation: {
              begin: { position: 58579687, status: 'certain' },
              end: { position: 58579689, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 197, status: 'certain' },
              end: { position: 202, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579633, status: 'certain' },
              end: { position: 58579650, status: 'certain' },
            },
          },
          {
            location: { position: { position: 2, status: 'certain' } },
            description: 'N-acetylserine.',
            evidence: [
              { code: 'ECO:0000269' },
              {
                dbReference: { id: '19413330', type: 'PubMed' },
                code: 'ECO:0007744',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 58565037, status: 'certain' },
              end: { position: 58565039, status: 'certain' },
            },
          },
          {
            original: 'N',
            variation: ['D'],
            location: { position: { position: 215, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 58579687, status: 'certain' },
              end: { position: 58579689, status: 'certain' },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: { position: { position: 69, status: 'certain' } },
            description: 'in dbSNP:rs1127509.',
            evidence: [
              {
                dbReference: { id: '9391086', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'sequence variant',
            id: 'VAR_013160',
            genomeLocation: {
              begin: { position: 58572279, status: 'certain' },
              end: { position: 58572281, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 211, status: 'certain' },
              end: { position: 214, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579675, status: 'certain' },
              end: { position: 58579686, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 12, status: 'certain' },
              end: { position: 17, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '14702039', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_038374',
            genomeLocation: {
              begin: { position: 58565067, status: 'certain' },
              end: { position: 58565084, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 205, status: 'certain' },
              end: { position: 208, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1N99', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58579657, status: 'certain' },
              end: { position: 58579668, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 2, status: 'certain' },
              end: { position: 60, status: 'certain' },
            },
            description: 'Interaction with PDCD6IP.',
            evidence: [
              {
                dbReference: { id: '22660413', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 58565037, status: 'certain' },
              end: { position: 58572254, status: 'certain' },
            },
          },
          {
            original: 'K',
            variation: ['A'],
            location: { position: { position: 214, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '27386966', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 58579684, status: 'certain' },
              end: { position: 58579686, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 251, status: 'certain' },
              end: { position: 260, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '1R6J', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'helix',
            genomeLocation: {
              begin: { position: 58580517, status: 'certain' },
              end: { position: 58580546, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 157, status: 'certain' },
              end: { position: 161, status: 'certain' },
            },
            evidence: [
              { dbReference: { id: '8BLU', type: 'PDB' }, code: 'ECO:0007829' },
            ],
            type: 'strand',
            genomeLocation: {
              begin: { position: 58578099, status: 'certain' },
              end: { position: 58578113, status: 'certain' },
            },
          },
          {
            location: { position: { position: 46, status: 'certain' } },
            description: 'Phosphotyrosine.',
            evidence: [
              {
                dbReference: { id: '24275569', type: 'PubMed' },
                code: 'ECO:0007744',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 58572210, status: 'certain' },
              end: { position: 58572212, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'ENSG00000137575',
        ensemblTranscriptId: 'ENST00000260130',
        ensemblTranslationId: 'ENSP00000260130',
      },
    ],
  },
];

export default mock;
