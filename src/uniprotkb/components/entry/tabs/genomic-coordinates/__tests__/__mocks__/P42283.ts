import { type GenomicEntry } from '../../types';

// Source: https://www.ebi.ac.uk/proteins/api/coordinates?accession=P42283,P42284,Q7KQZ4,Q867Z4,Q9V5M3,Q9V5M6
// Retrieved: 2026-08-31
const mock: GenomicEntry[] = [
  {
    accession: 'P42283',
    name: 'LOLA1_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDLSRKENTAPDVASTAEIQRSFQRSILNGKQRDEQKIQLPGSRRKRLSVTEVSDMLFEFYKTKSAKVPKAEQPHRQVSPTSGEILDPSTISAIAVYGTASETASKNLNADEVMRVQNATATRVVGAAAGAAASFHPRPKYTLKTAASSTEHTTAIPTSVLVANSAAALTPKPQAAVIAEALMRNGLHNFQQQLRAQEILRQQTPHRRIKEENDVEIAGGDITPTKILENLLRKQQERDLRHSECENEPGYSTEDDEEGRYHAFDDIHLMEQSGGKFGNNSGMGMFNANAHGGSASSILDAHQAFRNLEFTLSDYGGSSSNGSTTSPNGIGLDGEPVYECRHCGKKYRWKSTLRRHENVECGGKEPSHQCPYCPYKSKQRGNLGVHVRKHHTDLPQLPSKRRSKYSMNRENGMSGSMSDDSQGKLIIDFNGKGELETK',
    protein: {
      recommendedName: {
        fullName: 'Longitudinals lacking protein, isoform G',
      },
    },
    gene: [
      {
        value: 'lola',
        type: 'primary',
      },
      {
        value: 'CG12052',
        type: 'ORF',
      },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAF58782-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAF58782-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAF58782-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAF58782-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 891,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10484252,
                  status: 'certain',
                },
                end: {
                  position: 10482940,
                  status: 'certain',
                },
              },
              id: 'AAF58782-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10482940,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 161,
                status: 'certain',
              },
            },
            description: 'Phosphothreonine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10533205,
                status: 'certain',
              },
              end: {
                position: 10533203,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 446,
                status: 'certain',
              },
              end: {
                position: 467,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10484215,
                status: 'certain',
              },
              end: {
                position: 10532062,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 705,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483501,
                status: 'certain',
              },
              end: {
                position: 10483499,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 449,
                status: 'certain',
              },
              end: {
                position: 462,
                status: 'certain',
              },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10484230,
                status: 'certain',
              },
              end: {
                position: 10532053,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 375,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10532338,
                status: 'certain',
              },
              end: {
                position: 10532336,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 168,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10533184,
                status: 'certain',
              },
              end: {
                position: 10533182,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 696,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483528,
                status: 'certain',
              },
              end: {
                position: 10483526,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 821,
                status: 'certain',
              },
              end: {
                position: 843,
                status: 'certain',
              },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10483087,
                status: 'certain',
              },
              end: {
                position: 10483151,
                status: 'certain',
              },
            },
          },
          {
            original: 'HTT',
            variation: ['QLGVVK'],
            location: {
              begin: {
                position: 605,
                status: 'certain',
              },
              end: {
                position: 607,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10483795,
                status: 'certain',
              },
              end: {
                position: 10483799,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 750,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483366,
                status: 'certain',
              },
              end: {
                position: 10483364,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 378,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10532329,
                status: 'certain',
              },
              end: {
                position: 10532327,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 372,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10532347,
                status: 'certain',
              },
              end: {
                position: 10532345,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 706,
                status: 'certain',
              },
            },
            description: 'Phosphothreonine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483498,
                status: 'certain',
              },
              end: {
                position: 10483496,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 791,
                status: 'certain',
              },
              end: {
                position: 813,
                status: 'certain',
              },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10483177,
                status: 'certain',
              },
              end: {
                position: 10483241,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 874,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10482994,
                status: 'certain',
              },
              end: {
                position: 10482992,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 140,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10533268,
                status: 'certain',
              },
              end: {
                position: 10533266,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 749,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483369,
                status: 'certain',
              },
              end: {
                position: 10483367,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 162,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10533202,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAF58782',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAO41425-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAO41425-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAO41425-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAO41425-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 891,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10484252,
                  status: 'certain',
                },
                end: {
                  position: 10482940,
                  status: 'certain',
                },
              },
              id: 'AAO41425-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10482940,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 161,
                status: 'certain',
              },
            },
            description: 'Phosphothreonine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10533205,
                status: 'certain',
              },
              end: {
                position: 10533203,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 446,
                status: 'certain',
              },
              end: {
                position: 467,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10484215,
                status: 'certain',
              },
              end: {
                position: 10532062,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 705,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483501,
                status: 'certain',
              },
              end: {
                position: 10483499,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 449,
                status: 'certain',
              },
              end: {
                position: 462,
                status: 'certain',
              },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10484230,
                status: 'certain',
              },
              end: {
                position: 10532053,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 375,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10532338,
                status: 'certain',
              },
              end: {
                position: 10532336,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 168,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10533184,
                status: 'certain',
              },
              end: {
                position: 10533182,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 696,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483528,
                status: 'certain',
              },
              end: {
                position: 10483526,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 821,
                status: 'certain',
              },
              end: {
                position: 843,
                status: 'certain',
              },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10483087,
                status: 'certain',
              },
              end: {
                position: 10483151,
                status: 'certain',
              },
            },
          },
          {
            original: 'HTT',
            variation: ['QLGVVK'],
            location: {
              begin: {
                position: 605,
                status: 'certain',
              },
              end: {
                position: 607,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10483795,
                status: 'certain',
              },
              end: {
                position: 10483799,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 750,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483366,
                status: 'certain',
              },
              end: {
                position: 10483364,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 378,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10532329,
                status: 'certain',
              },
              end: {
                position: 10532327,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 372,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10532347,
                status: 'certain',
              },
              end: {
                position: 10532345,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 706,
                status: 'certain',
              },
            },
            description: 'Phosphothreonine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483498,
                status: 'certain',
              },
              end: {
                position: 10483496,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 791,
                status: 'certain',
              },
              end: {
                position: 813,
                status: 'certain',
              },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10483177,
                status: 'certain',
              },
              end: {
                position: 10483241,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 874,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10482994,
                status: 'certain',
              },
              end: {
                position: 10482992,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 140,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10533268,
                status: 'certain',
              },
              end: {
                position: 10533266,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 749,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10483369,
                status: 'certain',
              },
              end: {
                position: 10483367,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 162,
                status: 'certain',
              },
            },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: {
                  id: '18327897',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: {
                position: 10533202,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAO41425',
      },
    ],
  },
  {
    accession: 'P42284',
    name: 'LOLA2_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDVSTNQTVVLPHYSIYHYYSNIYYLLSHTTIYEADRTVSVSCPGKLNCLPQRNDLQETKSVTVLYTIHFFLYILMIYIFVLCKILPRIVFVWVST',
    protein: {
      recommendedName: {
        fullName: 'Longitudinals lacking protein, isoforms H/M/V',
      },
    },
    gene: [
      {
        value: 'lola',
        type: 'primary',
      },
      {
        value: 'CG12052',
        type: 'ORF',
      },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAO41431-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAO41431-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAO41431-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 465,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532004,
                  status: 'certain',
                },
              },
              id: 'AAO41431-4',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10532004,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            original: 'I',
            variation: ['YEL'],
            location: {
              position: {
                position: 465,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10532007,
                status: 'certain',
              },
              end: {
                position: 10532005,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'DVSTNQTVVLP',
            variation: ['GECLLPLKSII'],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 465,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '8050351',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_015403',
            genomeLocation: {
              begin: {
                position: 10532007,
                status: 'certain',
              },
              end: {
                position: 10532035,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAO41431',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAS64877-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAS64877-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAS64877-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAS64877-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 549,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10519375,
                  status: 'certain',
                },
                end: {
                  position: 10519089,
                  status: 'certain',
                },
              },
              id: 'AAS64877-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10519089,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            original: 'I',
            variation: ['YEL'],
            location: {
              position: {
                position: 465,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10519344,
                status: 'certain',
              },
              end: {
                position: 10519342,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'DVSTNQTVVLP',
            variation: ['GECLLPLKSII'],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 465,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '8050351',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_015403',
            genomeLocation: {
              begin: {
                position: 10519344,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DVSTNQTVVLPHYSIYHYYSNIYYLLSHTTIYEADRTVSVSCPGKLNCLPQRNDLQETKSVTVL',
            variation: [
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSVLHIVLLLSTHRHIISFLLIIQSFIDKIY',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 518,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_015404',
            genomeLocation: {
              begin: {
                position: 10519185,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAS64877',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAF58777-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAF58777-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAF58777-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAF58777-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 490,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10502462,
                  status: 'certain',
                },
                end: {
                  position: 10502358,
                  status: 'certain',
                },
              },
              id: 'AAF58777-5',
            },
            {
              proteinLocation: {
                begin: {
                  position: 490,
                  status: 'certain',
                },
                end: {
                  position: 518,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10502229,
                  status: 'certain',
                },
                end: {
                  position: 10502141,
                  status: 'certain',
                },
              },
              id: 'AAF58777-6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10502141,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            original: 'I',
            variation: ['YEL'],
            location: {
              position: {
                position: 465,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10502431,
                status: 'certain',
              },
              end: {
                position: 10502429,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'DVSTNQTVVLP',
            variation: ['GECLLPLKSII'],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 465,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '8050351',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_015403',
            genomeLocation: {
              begin: {
                position: 10502431,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DVSTNQTVVLPHYSIYHYYSNIYYLLSHTTIYEADRTVSVSCPGKLNCLPQRNDLQETKSVTVL',
            variation: [
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSVLHIVLLLSTHRHIISFLLIIQSFIDKIY',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 518,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_015404',
            genomeLocation: {
              begin: {
                position: 10502144,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAF58777',
      },
    ],
  },
  {
    accession: 'Q7KQZ4',
    name: 'LOLA3_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKWECGKEPQFQCPFCVYRAKQKMHIGRHMERMHKEKFKLEDVKNFAGSSGLDGDSSGATATAASVVAAAAALVSGVELHPHFS',
    protein: {
      recommendedName: {
        fullName: 'Longitudinals lacking protein, isoforms A/B/D/L',
      },
    },
    gene: [
      {
        value: 'lola',
        type: 'primary',
      },
      {
        value: 'CG12052',
        type: 'ORF',
      },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAO41430-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAO41430-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAO41430-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAO41430-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 608,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10525862,
                  status: 'certain',
                },
                end: {
                  position: 10525399,
                  status: 'certain',
                },
              },
              id: 'AAO41430-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10525399,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: {
              position: {
                position: 519,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10525669,
                status: 'certain',
              },
              end: {
                position: 10525667,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYP',
            variation: [
              'GLLELSLNQMFYYDSEMPPPPIPPPVVVESPPASPPLAVVTPVVQLRRGKLRSRRRKAANSSNSTTKKSIPPPTVRSSSAANLARNADMRDDGKLQCPQCPNAYTRLSALKRHLEFECGMLENFRCQVCDAGFKRKDSLNRHCKVKKHNTKYLF',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 608,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051794',
            genomeLocation: {
              begin: {
                position: 10525402,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 506,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10525546,
                status: 'certain',
              },
              end: {
                position: 10525706,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 520,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10525666,
                status: 'certain',
              },
              end: {
                position: 10525664,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 537,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10525546,
                status: 'certain',
              },
              end: {
                position: 10525613,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAO41430',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAM68766-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAM68766-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAM68766-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAM68766-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 748,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10521277,
                  status: 'certain',
                },
                end: {
                  position: 10520394,
                  status: 'certain',
                },
              },
              id: 'AAM68766-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10520394,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 653,
                status: 'certain',
              },
              end: {
                position: 677,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10520610,
                status: 'certain',
              },
              end: {
                position: 10520680,
                status: 'certain',
              },
            },
          },
          {
            original: 'P',
            variation: ['L'],
            location: {
              position: {
                position: 712,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12897787',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10520505,
                status: 'certain',
              },
              end: {
                position: 10520503,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKWECGKEPQFQCPFCVYRAKQKMHIGRHMERMHKEKFKLEDVKN',
            variation: [
              'DLKYDYKHSIFGSDDADQDQYKERFHCAVCNKSYLRKRHLQRHMRDECIGIPPRFNCEFCSSRFRRKYHMVRHLVSKHGIPPAIAQMTTGSGSRSSISGSLDLKSGGGLAGLQQMGGGGAGGGGSTGDCGASVGSAGSHNGCESPIPENLSLRKENYENENLSGSRCTSPLPPHIMPIPTYGLTGAITAISAAAAVVEEQAAAAAAAAAIAEAQAKNNNESGGGRSEVDDEDETLAAQAEAVAALGIKPEPVTPSKVQHLMNEEWNMKLGLQIISNSLLKERLMNTMPFAYNNN',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 748,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '12537569',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051796',
            genomeLocation: {
              begin: {
                position: 10520397,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'T',
            variation: ['A'],
            location: {
              position: {
                position: 654,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10520679,
                status: 'certain',
              },
              end: {
                position: 10520677,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKW',
            variation: [
              'GLQLIDDSSSSQQNHLNGSKLELMDGSSDDYHQGSGSLHHFHAPQFDHFQGLLAGGNSVVGGAGNGGQEESFTCPQCYRTYRRHGTLRRHLRQECGKGKSMVCSVCGHRTKRADHLRQHVRKKHPEIAMRSLFKRQQRAAAAAASAVEGEDQKPETEIVDLVDMLDDGSVAAADEDHQHAYLVEDDDEDELPQHQQSQLTTEESTTSNYYRQQLRQQALLQQALQQVAAAAAVVASGNSTTSTTELLNGEGL',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 706,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051795',
            genomeLocation: {
              begin: {
                position: 10520523,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: {
              position: {
                position: 519,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10521084,
                status: 'certain',
              },
              end: {
                position: 10521082,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYP',
            variation: [
              'GLLELSLNQMFYYDSEMPPPPIPPPVVVESPPASPPLAVVTPVVQLRRGKLRSRRRKAANSSNSTTKKSIPPPTVRSSSAANLARNADMRDDGKLQCPQCPNAYTRLSALKRHLEFECGMLENFRCQVCDAGFKRKDSLNRHCKVKKHNTKYLF',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 608,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051794',
            genomeLocation: {
              begin: {
                position: 10520817,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 685,
                status: 'certain',
              },
              end: {
                position: 707,
                status: 'certain',
              },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10520520,
                status: 'certain',
              },
              end: {
                position: 10520584,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 506,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10520961,
                status: 'certain',
              },
              end: {
                position: 10521121,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 520,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10521081,
                status: 'certain',
              },
              end: {
                position: 10521079,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            original: 'T',
            variation: ['S'],
            location: {
              position: {
                position: 653,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10520682,
                status: 'certain',
              },
              end: {
                position: 10520680,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 537,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10520961,
                status: 'certain',
              },
              end: {
                position: 10521028,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 611,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10520808,
                status: 'certain',
              },
              end: {
                position: 10520806,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 714,
                status: 'certain',
              },
              end: {
                position: 737,
                status: 'certain',
              },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10520430,
                status: 'certain',
              },
              end: {
                position: 10520497,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 659,
                status: 'certain',
              },
              end: {
                position: 668,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10520637,
                status: 'certain',
              },
              end: {
                position: 10520662,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAM68766',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAF58776-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAF58776-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAF58776-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAF58776-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 787,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10506073,
                  status: 'certain',
                },
                end: {
                  position: 10505073,
                  status: 'certain',
                },
              },
              id: 'AAF58776-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10505073,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 653,
                status: 'certain',
              },
              end: {
                position: 677,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10505406,
                status: 'certain',
              },
              end: {
                position: 10505476,
                status: 'certain',
              },
            },
          },
          {
            original: 'P',
            variation: ['L'],
            location: {
              position: {
                position: 712,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12897787',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10505301,
                status: 'certain',
              },
              end: {
                position: 10505299,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKWECGKEPQFQCPFCVYRAKQKMHIGRHMERMHKEKFKLEDVKN',
            variation: [
              'DLKYDYKHSIFGSDDADQDQYKERFHCAVCNKSYLRKRHLQRHMRDECIGIPPRFNCEFCSSRFRRKYHMVRHLVSKHGIPPAIAQMTTGSGSRSSISGSLDLKSGGGLAGLQQMGGGGAGGGGSTGDCGASVGSAGSHNGCESPIPENLSLRKENYENENLSGSRCTSPLPPHIMPIPTYGLTGAITAISAAAAVVEEQAAAAAAAAAIAEAQAKNNNESGGGRSEVDDEDETLAAQAEAVAALGIKPEPVTPSKVQHLMNEEWNMKLGLQIISNSLLKERLMNTMPFAYNNN',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 748,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '12537569',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051796',
            genomeLocation: {
              begin: {
                position: 10505193,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'T',
            variation: ['A'],
            location: {
              position: {
                position: 654,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10505475,
                status: 'certain',
              },
              end: {
                position: 10505473,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKW',
            variation: [
              'GLQLIDDSSSSQQNHLNGSKLELMDGSSDDYHQGSGSLHHFHAPQFDHFQGLLAGGNSVVGGAGNGGQEESFTCPQCYRTYRRHGTLRRHLRQECGKGKSMVCSVCGHRTKRADHLRQHVRKKHPEIAMRSLFKRQQRAAAAAASAVEGEDQKPETEIVDLVDMLDDGSVAAADEDHQHAYLVEDDDEDELPQHQQSQLTTEESTTSNYYRQQLRQQALLQQALQQVAAAAAVVASGNSTTSTTELLNGEGL',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 706,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051795',
            genomeLocation: {
              begin: {
                position: 10505319,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: {
              position: {
                position: 519,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10505880,
                status: 'certain',
              },
              end: {
                position: 10505878,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYP',
            variation: [
              'GLLELSLNQMFYYDSEMPPPPIPPPVVVESPPASPPLAVVTPVVQLRRGKLRSRRRKAANSSNSTTKKSIPPPTVRSSSAANLARNADMRDDGKLQCPQCPNAYTRLSALKRHLEFECGMLENFRCQVCDAGFKRKDSLNRHCKVKKHNTKYLF',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 608,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051794',
            genomeLocation: {
              begin: {
                position: 10505613,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 685,
                status: 'certain',
              },
              end: {
                position: 707,
                status: 'certain',
              },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10505316,
                status: 'certain',
              },
              end: {
                position: 10505380,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 506,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10505757,
                status: 'certain',
              },
              end: {
                position: 10505917,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 520,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10505877,
                status: 'certain',
              },
              end: {
                position: 10505875,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            original: 'T',
            variation: ['S'],
            location: {
              position: {
                position: 653,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10505478,
                status: 'certain',
              },
              end: {
                position: 10505476,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 537,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10505757,
                status: 'certain',
              },
              end: {
                position: 10505824,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 611,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10505604,
                status: 'certain',
              },
              end: {
                position: 10505602,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 714,
                status: 'certain',
              },
              end: {
                position: 737,
                status: 'certain',
              },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10505226,
                status: 'certain',
              },
              end: {
                position: 10505293,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 659,
                status: 'certain',
              },
              end: {
                position: 668,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10505433,
                status: 'certain',
              },
              end: {
                position: 10505458,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAF58776',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAF58775-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAF58775-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAF58775-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAF58775-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 706,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10524633,
                  status: 'certain',
                },
                end: {
                  position: 10523876,
                  status: 'certain',
                },
              },
              id: 'AAF58775-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10523876,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 653,
                status: 'certain',
              },
              end: {
                position: 677,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10523966,
                status: 'certain',
              },
              end: {
                position: 10524036,
                status: 'certain',
              },
            },
          },
          {
            original: 'T',
            variation: ['A'],
            location: {
              position: {
                position: 654,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10524035,
                status: 'certain',
              },
              end: {
                position: 10524033,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKW',
            variation: [
              'GLQLIDDSSSSQQNHLNGSKLELMDGSSDDYHQGSGSLHHFHAPQFDHFQGLLAGGNSVVGGAGNGGQEESFTCPQCYRTYRRHGTLRRHLRQECGKGKSMVCSVCGHRTKRADHLRQHVRKKHPEIAMRSLFKRQQRAAAAAASAVEGEDQKPETEIVDLVDMLDDGSVAAADEDHQHAYLVEDDDEDELPQHQQSQLTTEESTTSNYYRQQLRQQALLQQALQQVAAAAAVVASGNSTTSTTELLNGEGL',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 706,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051795',
            genomeLocation: {
              begin: {
                position: 10523879,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: {
              position: {
                position: 519,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10524440,
                status: 'certain',
              },
              end: {
                position: 10524438,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYP',
            variation: [
              'GLLELSLNQMFYYDSEMPPPPIPPPVVVESPPASPPLAVVTPVVQLRRGKLRSRRRKAANSSNSTTKKSIPPPTVRSSSAANLARNADMRDDGKLQCPQCPNAYTRLSALKRHLEFECGMLENFRCQVCDAGFKRKDSLNRHCKVKKHNTKYLF',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 608,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051794',
            genomeLocation: {
              begin: {
                position: 10524173,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 506,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10524317,
                status: 'certain',
              },
              end: {
                position: 10524477,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 520,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10524437,
                status: 'certain',
              },
              end: {
                position: 10524435,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            original: 'T',
            variation: ['S'],
            location: {
              position: {
                position: 653,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10524038,
                status: 'certain',
              },
              end: {
                position: 10524036,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 537,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10524317,
                status: 'certain',
              },
              end: {
                position: 10524384,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 611,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10524164,
                status: 'certain',
              },
              end: {
                position: 10524162,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 659,
                status: 'certain',
              },
              end: {
                position: 668,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10523993,
                status: 'certain',
              },
              end: {
                position: 10524018,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAF58775',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAM68765-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAM68765-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAM68765-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAM68765-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 748,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10521277,
                  status: 'certain',
                },
                end: {
                  position: 10520394,
                  status: 'certain',
                },
              },
              id: 'AAM68765-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10520394,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 653,
                status: 'certain',
              },
              end: {
                position: 677,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10520610,
                status: 'certain',
              },
              end: {
                position: 10520680,
                status: 'certain',
              },
            },
          },
          {
            original: 'P',
            variation: ['L'],
            location: {
              position: {
                position: 712,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12897787',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10520505,
                status: 'certain',
              },
              end: {
                position: 10520503,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKWECGKEPQFQCPFCVYRAKQKMHIGRHMERMHKEKFKLEDVKN',
            variation: [
              'DLKYDYKHSIFGSDDADQDQYKERFHCAVCNKSYLRKRHLQRHMRDECIGIPPRFNCEFCSSRFRRKYHMVRHLVSKHGIPPAIAQMTTGSGSRSSISGSLDLKSGGGLAGLQQMGGGGAGGGGSTGDCGASVGSAGSHNGCESPIPENLSLRKENYENENLSGSRCTSPLPPHIMPIPTYGLTGAITAISAAAAVVEEQAAAAAAAAAIAEAQAKNNNESGGGRSEVDDEDETLAAQAEAVAALGIKPEPVTPSKVQHLMNEEWNMKLGLQIISNSLLKERLMNTMPFAYNNN',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 748,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '12537569',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051796',
            genomeLocation: {
              begin: {
                position: 10520397,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'T',
            variation: ['A'],
            location: {
              position: {
                position: 654,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10520679,
                status: 'certain',
              },
              end: {
                position: 10520677,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKW',
            variation: [
              'GLQLIDDSSSSQQNHLNGSKLELMDGSSDDYHQGSGSLHHFHAPQFDHFQGLLAGGNSVVGGAGNGGQEESFTCPQCYRTYRRHGTLRRHLRQECGKGKSMVCSVCGHRTKRADHLRQHVRKKHPEIAMRSLFKRQQRAAAAAASAVEGEDQKPETEIVDLVDMLDDGSVAAADEDHQHAYLVEDDDEDELPQHQQSQLTTEESTTSNYYRQQLRQQALLQQALQQVAAAAAVVASGNSTTSTTELLNGEGL',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 706,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000303',
              },
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051795',
            genomeLocation: {
              begin: {
                position: 10520523,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: {
              position: {
                position: 519,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10521084,
                status: 'certain',
              },
              end: {
                position: 10521082,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYP',
            variation: [
              'GLLELSLNQMFYYDSEMPPPPIPPPVVVESPPASPPLAVVTPVVQLRRGKLRSRRRKAANSSNSTTKKSIPPPTVRSSSAANLARNADMRDDGKLQCPQCPNAYTRLSALKRHLEFECGMLENFRCQVCDAGFKRKDSLNRHCKVKKHNTKYLF',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 608,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051794',
            genomeLocation: {
              begin: {
                position: 10520817,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 685,
                status: 'certain',
              },
              end: {
                position: 707,
                status: 'certain',
              },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10520520,
                status: 'certain',
              },
              end: {
                position: 10520584,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 506,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10520961,
                status: 'certain',
              },
              end: {
                position: 10521121,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              position: {
                position: 520,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10521081,
                status: 'certain',
              },
              end: {
                position: 10521079,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            original: 'T',
            variation: ['S'],
            location: {
              position: {
                position: 653,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10520682,
                status: 'certain',
              },
              end: {
                position: 10520680,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 537,
                status: 'certain',
              },
              end: {
                position: 560,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10520961,
                status: 'certain',
              },
              end: {
                position: 10521028,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 611,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10520808,
                status: 'certain',
              },
              end: {
                position: 10520806,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 714,
                status: 'certain',
              },
              end: {
                position: 737,
                status: 'certain',
              },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10520430,
                status: 'certain',
              },
              end: {
                position: 10520497,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 659,
                status: 'certain',
              },
              end: {
                position: 668,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10520637,
                status: 'certain',
              },
              end: {
                position: 10520662,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAM68765',
      },
    ],
  },
  {
    accession: 'Q867Z4',
    name: 'LOLA4_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPSSECELINIKKIIPATTTIATHHPHTSSTIIHPHHIIQHVSQEPHHQEHHQQHQTIHIEEVPQTSQQHHQQQHHHQLQTVQPTHTQVQSIITAHPGQTINLVGLRNVQLADSKPIASRIRYSRGKIIGPTVQNLQIVETHEPIQHQHHELSDGTKYEISEIDLNNPNASAAIISDLVKYAEIDDIELPDGTKIGIGFAPSEITEHMQTSGGETHITTIEHEPQELQTVHQHEQTQQTHHIHAGQLQTHHIQTVVQSSSGQQQHDQQQHHQHHSIELQDDDGVETITPEELGMHDSSKSYTILTTRPMKEESEHDPSGMTYELSLSDSSLGPCDDPESRYVCRHCGKKYRWKSTLRRHENVECGGKEPCHPCPYCSYKAKQRGNLGVHVRKHHPEKPQLESKRGRKV',
    protein: {
      recommendedName: {
        fullName: 'Longitudinals lacking protein, isoforms F/I/K/T',
      },
    },
    gene: [
      {
        value: 'lola',
        type: 'primary',
      },
      {
        value: 'CG12052',
        type: 'ORF',
      },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAM68767-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAM68767-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAM68767-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAM68767-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 527,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10516051,
                  status: 'certain',
                },
                end: {
                  position: 10515835,
                  status: 'certain',
                },
              },
              id: 'AAM68767-5',
            },
            {
              proteinLocation: {
                begin: {
                  position: 527,
                  status: 'certain',
                },
                end: {
                  position: 565,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10515658,
                  status: 'certain',
                },
                end: {
                  position: 10515541,
                  status: 'certain',
                },
              },
              id: 'AAM68767-6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10515541,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 456,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10516047,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASH',
            variation: [
              'DFVLTWYQHACDQCGKSYKTRKSLSRHRRFECRFTTERPIFQCPSCNYAAKRSDNLTKHIKTHFAKMKKDFLPLAFQMQASTGIATKWEATA',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 546,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051801',
            genomeLocation: {
              begin: {
                position: 10515599,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original:
              'SKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPS',
            variation: [
              'PSSYVSNSSQTPPPIGGSSSASSAQALIRDYWYELKFSDLFKFINPDGRYQCPRFNCLKSYKDASSLQRHIRYECGGQKKFRCLMCGKAFSQSSHLKRHLESGVCVKYYL',
            ],
            location: {
              begin: {
                position: 456,
                status: 'certain',
              },
              end: {
                position: 565,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051803',
            genomeLocation: {
              begin: {
                position: 10515542,
                status: 'certain',
              },
              end: {
                position: 10516045,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 468,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10516011,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAM68767',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAO41426-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAO41426-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAO41426-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAO41426-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 569,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10510136,
                  status: 'certain',
                },
                end: {
                  position: 10509795,
                  status: 'certain',
                },
              },
              id: 'AAO41426-5',
            },
            {
              proteinLocation: {
                begin: {
                  position: 569,
                  status: 'certain',
                },
                end: {
                  position: 970,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10509554,
                  status: 'certain',
                },
                end: {
                  position: 10508347,
                  status: 'certain',
                },
              },
              id: 'AAO41426-6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10508347,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPSSECELINIKK',
            variation: [
              'ENSWTISVKSVTSLNNVSPSNNSHICPRCEKAYTYKKNLSRHLRYECGQLPTEKCRHCSYVARYKHSLNMHVKTQHPEQISDTFAGSSGSSDGVRDRRGRSLVRGLFDSAKGEKFLDYLNN',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 575,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051802',
            genomeLocation: {
              begin: {
                position: 10509535,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 933,
                status: 'certain',
              },
              end: {
                position: 955,
                status: 'certain',
              },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10508395,
                status: 'certain',
              },
              end: {
                position: 10508459,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 903,
                status: 'certain',
              },
              end: {
                position: 925,
                status: 'certain',
              },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10508485,
                status: 'certain',
              },
              end: {
                position: 10508549,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 456,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10510132,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASH',
            variation: [
              'DFVLTWYQHACDQCGKSYKTRKSLSRHRRFECRFTTERPIFQCPSCNYAAKRSDNLTKHIKTHFAKMKKDFLPLAFQMQASTGIATKWEATA',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 546,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051801',
            genomeLocation: {
              begin: {
                position: 10509862,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 819,
                status: 'certain',
              },
              end: {
                position: 828,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10508776,
                status: 'certain',
              },
              end: {
                position: 10508801,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 790,
                status: 'certain',
              },
              end: {
                position: 843,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10508731,
                status: 'certain',
              },
              end: {
                position: 10508888,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original:
              'SKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPS',
            variation: [
              'PSSYVSNSSQTPPPIGGSSSASSAQALIRDYWYELKFSDLFKFINPDGRYQCPRFNCLKSYKDASSLQRHIRYECGGQKKFRCLMCGKAFSQSSHLKRHLESGVCVKYYL',
            ],
            location: {
              begin: {
                position: 456,
                status: 'certain',
              },
              end: {
                position: 565,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051803',
            genomeLocation: {
              begin: {
                position: 10509805,
                status: 'certain',
              },
              end: {
                position: 10510130,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 808,
                status: 'certain',
              },
              end: {
                position: 818,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10508806,
                status: 'certain',
              },
              end: {
                position: 10508834,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 468,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10510096,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAO41426',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAO41427-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAO41427-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAO41427-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAO41427-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 575,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10511004,
                  status: 'certain',
                },
                end: {
                  position: 10510640,
                  status: 'certain',
                },
              },
              id: 'AAO41427-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10510640,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPSSECELINIKK',
            variation: [
              'ENSWTISVKSVTSLNNVSPSNNSHICPRCEKAYTYKKNLSRHLRYECGQLPTEKCRHCSYVARYKHSLNMHVKTQHPEQISDTFAGSSGSSDGVRDRRGRSLVRGLFDSAKGEKFLDYLNN',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 575,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051802',
            genomeLocation: {
              begin: {
                position: 10510643,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 456,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10511000,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASH',
            variation: [
              'DFVLTWYQHACDQCGKSYKTRKSLSRHRRFECRFTTERPIFQCPSCNYAAKRSDNLTKHIKTHFAKMKKDFLPLAFQMQASTGIATKWEATA',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 546,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051801',
            genomeLocation: {
              begin: {
                position: 10510730,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original:
              'SKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPS',
            variation: [
              'PSSYVSNSSQTPPPIGGSSSASSAQALIRDYWYELKFSDLFKFINPDGRYQCPRFNCLKSYKDASSLQRHIRYECGGQKKFRCLMCGKAFSQSSHLKRHLESGVCVKYYL',
            ],
            location: {
              begin: {
                position: 456,
                status: 'certain',
              },
              end: {
                position: 565,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051803',
            genomeLocation: {
              begin: {
                position: 10510673,
                status: 'certain',
              },
              end: {
                position: 10510998,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 468,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10510964,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAO41427',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAO41428-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAO41428-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAO41428-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAO41428-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 575,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10511004,
                  status: 'certain',
                },
                end: {
                  position: 10510640,
                  status: 'certain',
                },
              },
              id: 'AAO41428-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10510640,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPSSECELINIKK',
            variation: [
              'ENSWTISVKSVTSLNNVSPSNNSHICPRCEKAYTYKKNLSRHLRYECGQLPTEKCRHCSYVARYKHSLNMHVKTQHPEQISDTFAGSSGSSDGVRDRRGRSLVRGLFDSAKGEKFLDYLNN',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 575,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051802',
            genomeLocation: {
              begin: {
                position: 10510643,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 456,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10511000,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASH',
            variation: [
              'DFVLTWYQHACDQCGKSYKTRKSLSRHRRFECRFTTERPIFQCPSCNYAAKRSDNLTKHIKTHFAKMKKDFLPLAFQMQASTGIATKWEATA',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 546,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051801',
            genomeLocation: {
              begin: {
                position: 10510730,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original:
              'SKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPS',
            variation: [
              'PSSYVSNSSQTPPPIGGSSSASSAQALIRDYWYELKFSDLFKFINPDGRYQCPRFNCLKSYKDASSLQRHIRYECGGQKKFRCLMCGKAFSQSSHLKRHLESGVCVKYYL',
            ],
            location: {
              begin: {
                position: 456,
                status: 'certain',
              },
              end: {
                position: 565,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051803',
            genomeLocation: {
              begin: {
                position: 10510673,
                status: 'certain',
              },
              end: {
                position: 10510998,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 468,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10510964,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAO41428',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAM68764-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAM68764-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAM68764-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAM68764-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 546,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10518202,
                  status: 'certain',
                },
                end: {
                  position: 10517925,
                  status: 'certain',
                },
              },
              id: 'AAM68764-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10517925,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 456,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10518198,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASH',
            variation: [
              'DFVLTWYQHACDQCGKSYKTRKSLSRHRRFECRFTTERPIFQCPSCNYAAKRSDNLTKHIKTHFAKMKKDFLPLAFQMQASTGIATKWEATA',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 546,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051801',
            genomeLocation: {
              begin: {
                position: 10517928,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 468,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10518162,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAM68764',
      },
    ],
  },
  {
    accession: 'Q9V5M3',
    name: 'LOLA6_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDGYWTILETVPYSIASAAPNQTLTTATTLSNGGSSLLTGATVVVELPPDDLGNPVGNIQYTIPALTKNATTNTNTTSLLHKPQATTIQIVKQQHQQQHQQQHQHPQQQHQPQQQQHRQHLTIQQSQTHARQEYIKIDTSRLEDKMLLRDVMQYGATSIAMAPQSATTTVVSTHPVESGLLLADADEAERELELEAMKVDQHDEEHLLDDEGYVIEKIHGDGETVNQPQEKLYINGMSNIIHTATTMTLQPDDCKYACNVCGKTYKIKGSLKRHKNYECGVEPNLKCPHCPHKCKCVLAQVVNFVRHGPKNQLLCQCGRYYNTLSRLMLHQREECQDFKRFQCDFCLKWFKRRSHLNRHKKLHDAELFLEPLSKQKPKTTSGQNLSHDANTDDEVATTNPAATEDESNYPFTSEIKIENEFDEFI',
    protein: {
      recommendedName: {
        fullName: 'Longitudinals lacking protein, isoforms N/O/W/X/Y',
      },
    },
    gene: [
      {
        value: 'lola',
        type: 'primary',
      },
      {
        value: 'CG12052',
        type: 'ORF',
      },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAS64875-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAS64875-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAS64875-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAS64875-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 577,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10489143,
                  status: 'certain',
                },
                end: {
                  position: 10488773,
                  status: 'certain',
                },
              },
              id: 'AAS64875-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10488773,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 546,
                status: 'certain',
              },
              end: {
                position: 569,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10488800,
                status: 'certain',
              },
              end: {
                position: 10488867,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 485,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10489052,
                status: 'certain',
              },
              end: {
                position: 10489050,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAS64875',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAS64874-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAS64874-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAS64874-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAS64874-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 602,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10488426,
                  status: 'certain',
                },
                end: {
                  position: 10487981,
                  status: 'certain',
                },
              },
              id: 'AAS64874-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10487981,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original: 'Q',
            variation: ['P'],
            location: {
              position: {
                position: 587,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10488029,
                status: 'certain',
              },
              end: {
                position: 10488027,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 546,
                status: 'certain',
              },
              end: {
                position: 569,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10488083,
                status: 'certain',
              },
              end: {
                position: 10488150,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 542,
                status: 'certain',
              },
              end: {
                position: 583,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10488041,
                status: 'certain',
              },
              end: {
                position: 10488162,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DGYWTILETVPYSIASAAPNQTLTTATTLSNGGSSLLTGATVVVELPPDDLGNPVGNIQYTIPALTKNATTNTNTTSLLHKPQATTIQIVKQQHQQQHQQQHQHPQQQHQPQQQQHRQHLTIQQSQTHARQEYIKIDTSRLEDKMLLR',
            variation: [
              'VITVDRKYNLRTQESSGSSADLPSTSKQKVAAVQHKLAELASLDQKSENEEPTDLDNAASLKKAMATSDAMIALQQLASISTARSLQHLVQNMSNIDNSALVPGRKLPRNAAKRSPKYESNRCPLCSRVCRSQAFLNEHMRKEHSVLI',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 602,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051813',
            genomeLocation: {
              begin: {
                position: 10487984,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 485,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10488335,
                status: 'certain',
              },
              end: {
                position: 10488333,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAS64874',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAS64876-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAS64876-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAS64876-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAS64876-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 771,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10491051,
                  status: 'certain',
                },
                end: {
                  position: 10490099,
                  status: 'certain',
                },
              },
              id: 'AAS64876-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10490099,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original: 'Q',
            variation: ['P'],
            location: {
              position: {
                position: 587,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10490654,
                status: 'certain',
              },
              end: {
                position: 10490652,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 546,
                status: 'certain',
              },
              end: {
                position: 569,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10490708,
                status: 'certain',
              },
              end: {
                position: 10490775,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DGYWTILETVPYSIASAAPNQTLTTATTLSNGGSSLLTGATVVVELPPDDLGNPVGNIQYTIPALTKNATTNTNTTSLLHKPQATTIQIVKQQHQQQHQQQHQHPQQQHQPQQQQHRQHLTIQQSQTHARQEYIKIDTSRLEDKMLLRDVMQYGATSIAMAPQSATTTVVSTHPVESGLLLADADEAERELELEAMKVDQHDEEHLLDDEGYVI',
            variation: [
              'DIYPILGSLLGVDTSTSANPGSSANASDEFYGYHLNNNNTTTSSSTTISHAKNTSNSGAFSSGGGGGGGLSRDSFMQCKHCNRYYKSHQKLQEHVRKYCLKQKKYKCVSCEYRSRRKDHVLRHAKRKHCMLYEQSRDDEESLYVIRNEDDMSNDEEAVDGDDGDPEDGDPGGMDDVAAALCEINFDFAGRDLTITAVPALQESEEDDEDYDDDG',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 668,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051814',
            genomeLocation: {
              begin: {
                position: 10490411,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 709,
                status: 'certain',
              },
              end: {
                position: 731,
                status: 'certain',
              },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10490222,
                status: 'certain',
              },
              end: {
                position: 10490286,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 542,
                status: 'certain',
              },
              end: {
                position: 583,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10490666,
                status: 'certain',
              },
              end: {
                position: 10490787,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DGYWTILETVPYSIASAAPNQTLTTATTLSNGGSSLLTGATVVVELPPDDLGNPVGNIQYTIPALTKNATTNTNTTSLLHKPQATTIQIVKQQHQQQHQQQHQHPQQQHQPQQQQHRQHLTIQQSQTHARQEYIKIDTSRLEDKMLLR',
            variation: [
              'VITVDRKYNLRTQESSGSSADLPSTSKQKVAAVQHKLAELASLDQKSENEEPTDLDNAASLKKAMATSDAMIALQQLASISTARSLQHLVQNMSNIDNSALVPGRKLPRNAAKRSPKYESNRCPLCSRVCRSQAFLNEHMRKEHSVLI',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 602,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051813',
            genomeLocation: {
              begin: {
                position: 10490609,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 456,
                status: 'certain',
              },
              end: {
                position: 756,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051815',
            genomeLocation: {
              begin: {
                position: 10490147,
                status: 'certain',
              },
              end: {
                position: 10491045,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 485,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10490960,
                status: 'certain',
              },
              end: {
                position: 10490958,
                status: 'certain',
              },
            },
          },
          {
            original: 'CVLAQVVNFVRHGPKNQLLCQCG',
            variation: ['YRSDLRKHMNQKHADSGEAILAT'],
            location: {
              begin: {
                position: 749,
                status: 'certain',
              },
              end: {
                position: 771,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051818',
            genomeLocation: {
              begin: {
                position: 10490102,
                status: 'certain',
              },
              end: {
                position: 10490166,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAS64876',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAF58781-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAF58781-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAF58781-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAF58781-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 569,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10510136,
                  status: 'certain',
                },
                end: {
                  position: 10509795,
                  status: 'certain',
                },
              },
              id: 'AAF58781-5',
            },
            {
              proteinLocation: {
                begin: {
                  position: 569,
                  status: 'certain',
                },
                end: {
                  position: 970,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10509554,
                  status: 'certain',
                },
                end: {
                  position: 10508347,
                  status: 'certain',
                },
              },
              id: 'AAF58781-6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10508347,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original: 'Q',
            variation: ['P'],
            location: {
              position: {
                position: 587,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10509499,
                status: 'certain',
              },
              end: {
                position: 10509497,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 546,
                status: 'certain',
              },
              end: {
                position: 569,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10509793,
                status: 'certain',
              },
              end: {
                position: 10509860,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DGYWTILETVPYSIASAAPNQTLTTATTLSNGGSSLLTGATVVVELPPDDLGNPVGNIQYTIPALTKNATTNTNTTSLLHKPQATTIQIVKQQHQQQHQQQHQHPQQQHQPQQQQHRQHLTIQQSQTHARQEYIKIDTSRLEDKMLLRDVMQYGATSIAMAPQSATTTVVSTHPVESGLLLADADEAERELELEAMKVDQHDEEHLLDDEGYVI',
            variation: [
              'DIYPILGSLLGVDTSTSANPGSSANASDEFYGYHLNNNNTTTSSSTTISHAKNTSNSGAFSSGGGGGGGLSRDSFMQCKHCNRYYKSHQKLQEHVRKYCLKQKKYKCVSCEYRSRRKDHVLRHAKRKHCMLYEQSRDDEESLYVIRNEDDMSNDEEAVDGDDGDPEDGDPGGMDDVAAALCEINFDFAGRDLTITAVPALQESEEDDEDYDDDG',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 668,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051814',
            genomeLocation: {
              begin: {
                position: 10509256,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 786,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10508902,
                status: 'certain',
              },
              end: {
                position: 10508900,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 794,
                status: 'certain',
              },
              end: {
                position: 816,
                status: 'certain',
              },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10508812,
                status: 'certain',
              },
              end: {
                position: 10508876,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 709,
                status: 'certain',
              },
              end: {
                position: 731,
                status: 'certain',
              },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10509067,
                status: 'certain',
              },
              end: {
                position: 10509131,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 542,
                status: 'certain',
              },
              end: {
                position: 583,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10509511,
                status: 'certain',
              },
              end: {
                position: 10509872,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DGYWTILETVPYSIASAAPNQTLTTATTLSNGGSSLLTGATVVVELPPDDLGNPVGNIQYTIPALTKNATTNTNTTSLLHKPQATTIQIVKQQHQQQHQQQHQHPQQQHQPQQQQHRQHLTIQQSQTHARQEYIKIDTSRLEDKMLLR',
            variation: [
              'VITVDRKYNLRTQESSGSSADLPSTSKQKVAAVQHKLAELASLDQKSENEEPTDLDNAASLKKAMATSDAMIALQQLASISTARSLQHLVQNMSNIDNSALVPGRKLPRNAAKRSPKYESNRCPLCSRVCRSQAFLNEHMRKEHSVLI',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 602,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051813',
            genomeLocation: {
              begin: {
                position: 10509454,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 831,
                status: 'certain',
              },
              end: {
                position: 841,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10508737,
                status: 'certain',
              },
              end: {
                position: 10508765,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 456,
                status: 'certain',
              },
              end: {
                position: 756,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051815',
            genomeLocation: {
              begin: {
                position: 10508992,
                status: 'certain',
              },
              end: {
                position: 10510130,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 485,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10510045,
                status: 'certain',
              },
              end: {
                position: 10510043,
                status: 'certain',
              },
            },
          },
          {
            original: 'CVLAQVVNFVRHGPKNQLLCQCG',
            variation: ['YRSDLRKHMNQKHADSGEAILAT'],
            location: {
              begin: {
                position: 749,
                status: 'certain',
              },
              end: {
                position: 771,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051818',
            genomeLocation: {
              begin: {
                position: 10508947,
                status: 'certain',
              },
              end: {
                position: 10509011,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 826,
                status: 'certain',
              },
              end: {
                position: 863,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10508671,
                status: 'certain',
              },
              end: {
                position: 10508780,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAF58781',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAO41424-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAO41424-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAO41424-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAO41424-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 668,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10492585,
                  status: 'certain',
                },
                end: {
                  position: 10491942,
                  status: 'certain',
                },
              },
              id: 'AAO41424-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10491942,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original: 'Q',
            variation: ['P'],
            location: {
              position: {
                position: 587,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10492188,
                status: 'certain',
              },
              end: {
                position: 10492186,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 546,
                status: 'certain',
              },
              end: {
                position: 569,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10492242,
                status: 'certain',
              },
              end: {
                position: 10492309,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DGYWTILETVPYSIASAAPNQTLTTATTLSNGGSSLLTGATVVVELPPDDLGNPVGNIQYTIPALTKNATTNTNTTSLLHKPQATTIQIVKQQHQQQHQQQHQHPQQQHQPQQQQHRQHLTIQQSQTHARQEYIKIDTSRLEDKMLLRDVMQYGATSIAMAPQSATTTVVSTHPVESGLLLADADEAERELELEAMKVDQHDEEHLLDDEGYVI',
            variation: [
              'DIYPILGSLLGVDTSTSANPGSSANASDEFYGYHLNNNNTTTSSSTTISHAKNTSNSGAFSSGGGGGGGLSRDSFMQCKHCNRYYKSHQKLQEHVRKYCLKQKKYKCVSCEYRSRRKDHVLRHAKRKHCMLYEQSRDDEESLYVIRNEDDMSNDEEAVDGDDGDPEDGDPGGMDDVAAALCEINFDFAGRDLTITAVPALQESEEDDEDYDDDG',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 668,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051814',
            genomeLocation: {
              begin: {
                position: 10491945,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 542,
                status: 'certain',
              },
              end: {
                position: 583,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10492200,
                status: 'certain',
              },
              end: {
                position: 10492321,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DGYWTILETVPYSIASAAPNQTLTTATTLSNGGSSLLTGATVVVELPPDDLGNPVGNIQYTIPALTKNATTNTNTTSLLHKPQATTIQIVKQQHQQQHQQQHQHPQQQHQPQQQQHRQHLTIQQSQTHARQEYIKIDTSRLEDKMLLR',
            variation: [
              'VITVDRKYNLRTQESSGSSADLPSTSKQKVAAVQHKLAELASLDQKSENEEPTDLDNAASLKKAMATSDAMIALQQLASISTARSLQHLVQNMSNIDNSALVPGRKLPRNAAKRSPKYESNRCPLCSRVCRSQAFLNEHMRKEHSVLI',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 602,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051813',
            genomeLocation: {
              begin: {
                position: 10492143,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: {
              position: {
                position: 485,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10492494,
                status: 'certain',
              },
              end: {
                position: 10492492,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAO41424',
      },
    ],
  },
  {
    accession: 'Q9V5M6',
    name: 'LOLA5_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTYDAVKIENEEFEDSYLMDNDDDDDDLLTTAAATQKHAKQSNEKQMAGSMVAGAGSGGAVKKIVLSAQQQQQLLEQQQHLQHLQLQPTSQSLQIKLPAIPATITTISAPKQMMSGAGTSGSLTPNNNCTLMSNKLGLPVKGQNLDLHWSHSDDNRYRVLVQNKRTRKESLEHSADMIYNADIEKPWVCRNCNRTYKWKNSLKCHLKNECGLPPRYFCSKMCGYATNVHSNLKRHLNTKCRDREKDADDEKKPGSASGNMPVVVGVGNGTAVPVSSSNNNNNGGGSSTSSTYTLVFQNDSA',
    protein: {
      recommendedName: {
        fullName: 'Longitudinals lacking protein, isoforms J/P/Q/S/Z',
      },
    },
    gene: [
      {
        value: 'lola',
        type: 'primary',
      },
      {
        value: 'CG12052',
        type: 'ORF',
      },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAZ52818-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAZ52818-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAZ52818-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAZ52818-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 665,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10522969,
                  status: 'certain',
                },
                end: {
                  position: 10522335,
                  status: 'certain',
                },
              },
              id: 'AAZ52818-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10522335,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 491,
                status: 'certain',
              },
              end: {
                position: 512,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10522797,
                status: 'certain',
              },
              end: {
                position: 10522858,
                status: 'certain',
              },
            },
          },
          {
            original: 'M',
            variation: ['I'],
            location: {
              position: {
                position: 485,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10522878,
                status: 'certain',
              },
              end: {
                position: 10522876,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'S',
            variation: ['N'],
            location: {
              position: {
                position: 475,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10522908,
                status: 'certain',
              },
              end: {
                position: 10522906,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 469,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10522926,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAAL',
            variation: [
              'DSMVVPKITAVRGSSKRLARRKATLAIATAMATSASATHMMSRRKRTSSSCRNASSGGNAPSTSTSASSATTASISKSKCKSSDAASAPFVCQTCGRRYQVLGTLRRHMRKECNQPKKYVCRMCERRFHYNFKLQDHYYYVHKGVQKRE',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 603,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051807',
            genomeLocation: {
              begin: {
                position: 10522524,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['G'],
            location: {
              position: {
                position: 477,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10522902,
                status: 'certain',
              },
              end: {
                position: 10522900,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original: 'M',
            variation: ['V'],
            location: {
              position: {
                position: 549,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10522686,
                status: 'certain',
              },
              end: {
                position: 10522684,
                status: 'certain',
              },
            },
          },
          {
            original:
              'EAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTY',
            variation: [
              'LRTLYCNYATAVIAAASAASKKPAEHQTAASSTANHQNQNLNHQNLLQQHHSNSSSNSNCGPAAEICEPEVTIRRMFKCGNSGQAEAIVNHLQMTGQQHQQLHCNVSNCSGCHMSAAAASFQLANLLNSGIRSSSTSKPQRNHISASGNTSSSSNANTNNNSSGNSSLSLAAKKTSVQFHCEFCNFSCSWRYDLKLHLRQKHGIHQLKKV',
            ],
            location: {
              begin: {
                position: 456,
                status: 'certain',
              },
              end: {
                position: 665,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051808',
            genomeLocation: {
              begin: {
                position: 10522338,
                status: 'certain',
              },
              end: {
                position: 10522963,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 482,
                status: 'certain',
              },
              end: {
                position: 520,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10522773,
                status: 'certain',
              },
              end: {
                position: 10522885,
                status: 'certain',
              },
            },
          },
          {
            original: 'L',
            variation: ['F'],
            location: {
              position: {
                position: 115,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10533343,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 626,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10522455,
                status: 'certain',
              },
              end: {
                position: 10522453,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAZ52818',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAM68768-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAM68768-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAM68768-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAM68768-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 506,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10527219,
                  status: 'certain',
                },
                end: {
                  position: 10527066,
                  status: 'certain',
                },
              },
              id: 'AAM68768-5',
            },
            {
              proteinLocation: {
                begin: {
                  position: 506,
                  status: 'certain',
                },
                end: {
                  position: 603,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10526974,
                  status: 'certain',
                },
                end: {
                  position: 10526680,
                  status: 'certain',
                },
              },
              id: 'AAM68768-6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10526680,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 491,
                status: 'certain',
              },
              end: {
                position: 512,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10526954,
                status: 'certain',
              },
              end: {
                position: 10527108,
                status: 'certain',
              },
            },
          },
          {
            original: 'M',
            variation: ['I'],
            location: {
              position: {
                position: 485,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10527128,
                status: 'certain',
              },
              end: {
                position: 10527126,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'S',
            variation: ['N'],
            location: {
              position: {
                position: 475,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10527158,
                status: 'certain',
              },
              end: {
                position: 10527156,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 469,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10527176,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAAL',
            variation: [
              'DSMVVPKITAVRGSSKRLARRKATLAIATAMATSASATHMMSRRKRTSSSCRNASSGGNAPSTSTSASSATTASISKSKCKSSDAASAPFVCQTCGRRYQVLGTLRRHMRKECNQPKKYVCRMCERRFHYNFKLQDHYYYVHKGVQKRE',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 603,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051807',
            genomeLocation: {
              begin: {
                position: 10526681,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['G'],
            location: {
              position: {
                position: 477,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10527152,
                status: 'certain',
              },
              end: {
                position: 10527150,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original: 'M',
            variation: ['V'],
            location: {
              position: {
                position: 549,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10526843,
                status: 'certain',
              },
              end: {
                position: 10526841,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 482,
                status: 'certain',
              },
              end: {
                position: 520,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10526930,
                status: 'certain',
              },
              end: {
                position: 10527135,
                status: 'certain',
              },
            },
          },
          {
            original: 'L',
            variation: ['F'],
            location: {
              position: {
                position: 115,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10533343,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAM68768',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAF58778-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAF58778-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAF58778-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAF58778-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 490,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10502462,
                  status: 'certain',
                },
                end: {
                  position: 10502358,
                  status: 'certain',
                },
              },
              id: 'AAF58778-5',
            },
            {
              proteinLocation: {
                begin: {
                  position: 490,
                  status: 'certain',
                },
                end: {
                  position: 963,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10502059,
                  status: 'certain',
                },
                end: {
                  position: 10500636,
                  status: 'certain',
                },
              },
              id: 'AAF58778-6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10500636,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 491,
                status: 'certain',
              },
              end: {
                position: 512,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10501992,
                status: 'certain',
              },
              end: {
                position: 10502053,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTYDAVKIENEEFEDSYLMDNDDDDDDLLTTAAATQKHAKQSNEKQMAGSMVAGAGSG',
            variation: [
              'ARTQHEHIHTTPPAISLFLNSTTPYFDSLSLSVLSVRIVKQSQQILDKNPITILTDLRTLYCNYATAVIAAASAASKKPAEHQTAASSTANHQNQNLNHQNLLQQHHSNSSSNSNCGPAAEICEPEVTIRRMFKCGNSGQAEAIVNHLQMTGQQHQQLHCNVSNCSGCHMSAAAASFQLANLLNSGIRSSSTSKPQRNHISASGNTSSSSNANTNNNSSGNSSLSLAAKKTSVQFHCEFCNFSCSWRYDLKLHLRQKHGIHQLKKV',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 720,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'splice variant',
            id: 'VSP_017255',
            genomeLocation: {
              begin: {
                position: 10501368,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'M',
            variation: ['I'],
            location: {
              position: {
                position: 485,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10502371,
                status: 'certain',
              },
              end: {
                position: 10502369,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'S',
            variation: ['N'],
            location: {
              position: {
                position: 475,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10502401,
                status: 'certain',
              },
              end: {
                position: 10502399,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 937,
                status: 'certain',
              },
              end: {
                position: 953,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10500669,
                status: 'certain',
              },
              end: {
                position: 10500715,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 849,
                status: 'certain',
              },
              end: {
                position: 871,
                status: 'certain',
              },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10500915,
                status: 'certain',
              },
              end: {
                position: 10500979,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 901,
                status: 'certain',
              },
              end: {
                position: 915,
                status: 'certain',
              },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10500783,
                status: 'certain',
              },
              end: {
                position: 10500823,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 469,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10502419,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAAL',
            variation: [
              'DSMVVPKITAVRGSSKRLARRKATLAIATAMATSASATHMMSRRKRTSSSCRNASSGGNAPSTSTSASSATTASISKSKCKSSDAASAPFVCQTCGRRYQVLGTLRRHMRKECNQPKKYVCRMCERRFHYNFKLQDHYYYVHKGVQKRE',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 603,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051807',
            genomeLocation: {
              begin: {
                position: 10501719,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['G'],
            location: {
              position: {
                position: 477,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10502395,
                status: 'certain',
              },
              end: {
                position: 10502393,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 878,
                status: 'certain',
              },
              end: {
                position: 901,
                status: 'certain',
              },
            },
            description: 'C2H2-type 2; degenerate.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00042',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: {
                position: 10500825,
                status: 'certain',
              },
              end: {
                position: 10500892,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTYDAVKIENEEFEDSYLMDNDDDDDDLLTTAAATQKHAKQSNEKQMAGSMVAGAGSGGAVKKIVLSAQQQQQLLEQQQHLQHLQLQPTSQSLQI',
            variation: [
              'DFGRLSPNRRNYNLLGGIKSSPYNSPIGTPVIKFEPGSGQEDHNEHKSGRVTPTAHCPGNLLVPKTQPRHGNGDNDDSNDEDSMEPCDLRIDLAKAFLAAAQSGAATTLPLGHHHHHGHHPHGRTLPNLIYPAVPVKVPRPDTPTRRYSSSSGPVQDAASSVAVQFVAAAAAAGLAANNTSASTNTGGGASTSAAAAAAAAAAAAAAAAAAGGSVAGNWSSGGGSGGAGGGIGGGGSGGGGGGGGGGAYACDRCGNTYARPHSLNRHVRFECGVEPKFECPICHKKSKHKHNLVLHMRTHQHR',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 757,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051809',
            genomeLocation: {
              begin: {
                position: 10501257,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'M',
            variation: ['V'],
            location: {
              position: {
                position: 549,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10501881,
                status: 'certain',
              },
              end: {
                position: 10501879,
                status: 'certain',
              },
            },
          },
          {
            original:
              'EAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTY',
            variation: [
              'LRTLYCNYATAVIAAASAASKKPAEHQTAASSTANHQNQNLNHQNLLQQHHSNSSSNSNCGPAAEICEPEVTIRRMFKCGNSGQAEAIVNHLQMTGQQHQQLHCNVSNCSGCHMSAAAASFQLANLLNSGIRSSSTSKPQRNHISASGNTSSSSNANTNNNSSGNSSLSLAAKKTSVQFHCEFCNFSCSWRYDLKLHLRQKHGIHQLKKV',
            ],
            location: {
              begin: {
                position: 456,
                status: 'certain',
              },
              end: {
                position: 665,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051808',
            genomeLocation: {
              begin: {
                position: 10501533,
                status: 'certain',
              },
              end: {
                position: 10502456,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 482,
                status: 'certain',
              },
              end: {
                position: 520,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10501968,
                status: 'certain',
              },
              end: {
                position: 10502378,
                status: 'certain',
              },
            },
          },
          {
            original: 'L',
            variation: ['F'],
            location: {
              position: {
                position: 115,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10533343,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 626,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10501650,
                status: 'certain',
              },
              end: {
                position: 10501648,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAF58778',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: {
                  position: 1,
                  status: 'certain',
                },
                end: {
                  position: 58,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533749,
                  status: 'certain',
                },
                end: {
                  position: 10533576,
                  status: 'certain',
                },
              },
              id: 'AAF58779-1',
            },
            {
              proteinLocation: {
                begin: {
                  position: 59,
                  status: 'certain',
                },
                end: {
                  position: 190,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10533511,
                  status: 'certain',
                },
                end: {
                  position: 10533118,
                  status: 'certain',
                },
              },
              id: 'AAF58779-2',
            },
            {
              proteinLocation: {
                begin: {
                  position: 190,
                  status: 'certain',
                },
                end: {
                  position: 428,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532894,
                  status: 'certain',
                },
                end: {
                  position: 10532181,
                  status: 'certain',
                },
              },
              id: 'AAF58779-3',
            },
            {
              proteinLocation: {
                begin: {
                  position: 428,
                  status: 'certain',
                },
                end: {
                  position: 455,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10532119,
                  status: 'certain',
                },
                end: {
                  position: 10532039,
                  status: 'certain',
                },
              },
              id: 'AAF58779-4',
            },
            {
              proteinLocation: {
                begin: {
                  position: 455,
                  status: 'certain',
                },
                end: {
                  position: 757,
                  status: 'certain',
                },
              },
              genomeLocation: {
                begin: {
                  position: 10498089,
                  status: 'certain',
                },
                end: {
                  position: 10497179,
                  status: 'certain',
                },
              },
              id: 'AAF58779-5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10497179,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
        },
        feature: [
          {
            location: {
              begin: {
                position: 491,
                status: 'certain',
              },
              end: {
                position: 512,
                status: 'certain',
              },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10497917,
                status: 'certain',
              },
              end: {
                position: 10497978,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTYDAVKIENEEFEDSYLMDNDDDDDDLLTTAAATQKHAKQSNEKQMAGSMVAGAGSG',
            variation: [
              'ARTQHEHIHTTPPAISLFLNSTTPYFDSLSLSVLSVRIVKQSQQILDKNPITILTDLRTLYCNYATAVIAAASAASKKPAEHQTAASSTANHQNQNLNHQNLLQQHHSNSSSNSNCGPAAEICEPEVTIRRMFKCGNSGQAEAIVNHLQMTGQQHQQLHCNVSNCSGCHMSAAAASFQLANLLNSGIRSSSTSKPQRNHISASGNTSSSSNANTNNNSSGNSSLSLAAKKTSVQFHCEFCNFSCSWRYDLKLHLRQKHGIHQLKKV',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 720,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'splice variant',
            id: 'VSP_017255',
            genomeLocation: {
              begin: {
                position: 10497293,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'M',
            variation: ['I'],
            location: {
              position: {
                position: 485,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10497998,
                status: 'certain',
              },
              end: {
                position: 10497996,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 115,
                status: 'certain',
              },
              end: {
                position: 200,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532863,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            original: 'S',
            variation: ['N'],
            location: {
              position: {
                position: 475,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10498028,
                status: 'certain',
              },
              end: {
                position: 10498026,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 251,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532710,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 447,
                status: 'certain',
              },
              end: {
                position: 469,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10498046,
                status: 'certain',
              },
              end: {
                position: 10532059,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAAL',
            variation: [
              'DSMVVPKITAVRGSSKRLARRKATLAIATAMATSASATHMMSRRKRTSSSCRNASSGGNAPSTSTSASSATTASISKSKCKSSDAASAPFVCQTCGRRYQVLGTLRRHMRKECNQPKKYVCRMCERRFHYNFKLQDHYYYVHKGVQKRE',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 603,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051807',
            genomeLocation: {
              begin: {
                position: 10497644,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['G'],
            location: {
              position: {
                position: 477,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10498022,
                status: 'certain',
              },
              end: {
                position: 10498020,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 228,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532777,
                status: 'certain',
              },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTYDAVKIENEEFEDSYLMDNDDDDDDLLTTAAATQKHAKQSNEKQMAGSMVAGAGSGGAVKKIVLSAQQQQQLLEQQQHLQHLQLQPTSQSLQI',
            variation: [
              'DFGRLSPNRRNYNLLGGIKSSPYNSPIGTPVIKFEPGSGQEDHNEHKSGRVTPTAHCPGNLLVPKTQPRHGNGDNDDSNDEDSMEPCDLRIDLAKAFLAAAQSGAATTLPLGHHHHHGHHPHGRTLPNLIYPAVPVKVPRPDTPTRRYSSSSGPVQDAASSVAVQFVAAAAAAGLAANNTSASTNTGGGASTSAAAAAAAAAAAAAAAAAAGGSVAGNWSSGGGSGGAGGGIGGGGSGGGGGGGGGGAYACDRCGNTYARPHSLNRHVRFECGVEPKFECPICHKKSKHKHNLVLHMRTHQHR',
            ],
            location: {
              begin: {
                position: 455,
                status: 'certain',
              },
              end: {
                position: 757,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051809',
            genomeLocation: {
              begin: {
                position: 10497182,
                status: 'certain',
              },
              end: {
                position: 10532037,
                status: 'certain',
              },
            },
          },
          {
            original: 'M',
            variation: ['V'],
            location: {
              position: {
                position: 549,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10497806,
                status: 'certain',
              },
              end: {
                position: 10497804,
                status: 'certain',
              },
            },
          },
          {
            original:
              'EAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTY',
            variation: [
              'LRTLYCNYATAVIAAASAASKKPAEHQTAASSTANHQNQNLNHQNLLQQHHSNSSSNSNCGPAAEICEPEVTIRRMFKCGNSGQAEAIVNHLQMTGQQHQQLHCNVSNCSGCHMSAAAASFQLANLLNSGIRSSSTSKPQRNHISASGNTSSSSNANTNNNSSGNSSLSLAAKKTSVQFHCEFCNFSCSWRYDLKLHLRQKHGIHQLKKV',
            ],
            location: {
              begin: {
                position: 456,
                status: 'certain',
              },
              end: {
                position: 665,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '12853139',
                  type: 'PubMed',
                },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051808',
            genomeLocation: {
              begin: {
                position: 10497458,
                status: 'certain',
              },
              end: {
                position: 10498083,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 329,
                status: 'certain',
              },
              end: {
                position: 340,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532443,
                status: 'certain',
              },
              end: {
                position: 10532474,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 162,
                status: 'certain',
              },
              end: {
                position: 175,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10533163,
                status: 'certain',
              },
              end: {
                position: 10533200,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 482,
                status: 'certain',
              },
              end: {
                position: 520,
                status: 'certain',
              },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: {
                position: 10497893,
                status: 'certain',
              },
              end: {
                position: 10498005,
                status: 'certain',
              },
            },
          },
          {
            original: 'L',
            variation: ['F'],
            location: {
              position: {
                position: 115,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10533343,
                status: 'certain',
              },
              end: {
                position: 10533341,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 32,
                status: 'certain',
              },
              end: {
                position: 97,
                status: 'certain',
              },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: {
                  id: 'PRU00037',
                  type: 'PROSITE-ProRule',
                },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: {
                position: 10533397,
                status: 'certain',
              },
              end: {
                position: 10533654,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 626,
                status: 'certain',
              },
            },
            evidence: [
              {
                code: 'ECO:0000305',
              },
            ],
            type: 'sequence conflict',
            genomeLocation: {
              begin: {
                position: 10497575,
                status: 'certain',
              },
              end: {
                position: 10497573,
                status: 'certain',
              },
            },
          },
          {
            location: {
              begin: {
                position: 263,
                status: 'certain',
              },
              end: {
                position: 293,
                status: 'certain',
              },
            },
            description: 'Low complexity.',
            evidence: [
              {
                dbReference: {
                  id: 'MobiDB-lite',
                  type: 'SAM',
                },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: {
                position: 10532584,
                status: 'certain',
              },
              end: {
                position: 10532672,
                status: 'certain',
              },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: {
              position: {
                position: 107,
                status: 'certain',
              },
            },
            evidence: [
              {
                dbReference: {
                  id: '11880341',
                  type: 'PubMed',
                },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: {
                position: 10533367,
                status: 'certain',
              },
              end: {
                position: 10533365,
                status: 'certain',
              },
            },
          },
        ],
        nucleotideId: 'AE013599.5',
        proteinId: 'AAF58779',
      },
    ],
  },
];

export default mock;
