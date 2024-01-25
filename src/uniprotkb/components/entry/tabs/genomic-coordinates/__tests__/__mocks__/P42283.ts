import { GenomicEntry } from '../../types';

// Source: https://www.ebi.ac.uk/proteins/api/coordinates?accession=P42283-1%2CQ7KQZ4-2%2CQ7KQZ4-1%2CQ7KQZ4-3%2CQ867Z4-2%2CP42284-3%2CQ867Z4-1%2CQ9V5M6-2%2CQ867Z4-3%2CQ7KQZ4-4%2CP42284-1%2CQ9V5M3-1%2CQ9V5M3-2%2CQ9V5M6-1%2CQ9V5M6-3%2CQ9V5M6-4%2CQ867Z4-5%2CP42284-2%2CQ9V5M3-3%2CQ9V5M3-4%2CQ9V5M3-5%2CQ9V5M6-5
// Retrieved: 2023-10-05
const mock: GenomicEntry[] = [
  {
    accession: 'P42283-1',
    name: 'LOLA1_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDLSRKENTAPDVASTAEIQRSFQRSILNGKQRDEQKIQLPGSRRKRLSVTEVSDMLFEFYKTKSAKVPKAEQPHRQVSPTSGEILDPSTISAIAVYGTASETASKNLNADEVMRVQNATATRVVGAAAGAAASFHPRPKYTLKTAASSTEHTTAIPTSVLVANSAAALTPKPQAAVIAEALMRNGLHNFQQQLRAQEILRQQTPHRRIKEENDVEIAGGDITPTKILENLLRKQQERDLRHSECENEPGYSTEDDEEGRYHAFDDIHLMEQSGGKFGNNSGMGMFNANAHGGSASSILDAHQAFRNLEFTLSDYGGSSSNGSTTSPNGIGLDGEPVYECRHCGKKYRWKSTLRRHENVECGGKEPSHQCPYCPYKSKQRGNLGVHVRKHHTDLPQLPSKRRSKYSMNRENGMSGSMSDDSQGKLIIDFNGKGELETK',
    protein: {
      recommendedName: { fullName: 'Longitudinals lacking protein, isoform G' },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 891, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10484252, status: 'certain' },
                end: { position: 10482943, status: 'certain' },
              },
              id: 'FBtr0089347-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10482943,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 311, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532530, status: 'certain' },
            },
          },
          {
            original: 'HTT',
            variation: ['QLGVVK'],
            location: {
              begin: { position: 605, status: 'certain' },
              end: { position: 607, status: 'certain' },
            },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10483803, status: 'certain' },
              end: { position: 10483795, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 340, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532443, status: 'certain' },
            },
          },
          {
            location: { position: { position: 705, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483503, status: 'certain' },
              end: { position: 10483501, status: 'certain' },
            },
          },
          {
            location: { position: { position: 140, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10533268, status: 'certain' },
              end: { position: 10533266, status: 'certain' },
            },
          },
          {
            location: { position: { position: 168, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10533184, status: 'certain' },
              end: { position: 10533182, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 821, status: 'certain' },
              end: { position: 843, status: 'certain' },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10483155, status: 'certain' },
              end: { position: 10483087, status: 'certain' },
            },
          },
          {
            location: { position: { position: 375, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10532340, status: 'certain' },
              end: { position: 10532338, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 115, status: 'certain' },
              end: { position: 200, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10533343, status: 'certain' },
              end: { position: 10532863, status: 'certain' },
            },
          },
          {
            location: { position: { position: 750, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483368, status: 'certain' },
              end: { position: 10483366, status: 'certain' },
            },
          },
          {
            location: { position: { position: 874, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10482996, status: 'certain' },
              end: { position: 10482994, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 840, status: 'certain' },
              end: { position: 860, status: 'certain' },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10483098, status: 'certain' },
              end: { position: 10483036, status: 'certain' },
            },
          },
          {
            location: { position: { position: 378, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10532331, status: 'certain' },
              end: { position: 10532329, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 446, status: 'certain' },
              end: { position: 467, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532066, status: 'certain' },
              end: { position: 10484215, status: 'certain' },
            },
          },
          {
            location: { position: { position: 161, status: 'certain' } },
            description: 'Phosphothreonine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10533205, status: 'certain' },
              end: { position: 10533203, status: 'certain' },
            },
          },
          {
            location: { position: { position: 162, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10533202, status: 'certain' },
              end: { position: 10533200, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 791, status: 'certain' },
              end: { position: 813, status: 'certain' },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10483245, status: 'certain' },
              end: { position: 10483177, status: 'certain' },
            },
          },
          {
            location: { position: { position: 749, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483371, status: 'certain' },
              end: { position: 10483369, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 32, status: 'certain' },
              end: { position: 97, status: 'certain' },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: { id: 'PRU00037', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 10533656, status: 'certain' },
              end: { position: 10533395, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 861, status: 'certain' },
              end: { position: 876, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10483035, status: 'certain' },
              end: { position: 10482988, status: 'certain' },
            },
          },
          {
            location: { position: { position: 696, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483530, status: 'certain' },
              end: { position: 10483528, status: 'certain' },
            },
          },
          {
            location: { position: { position: 372, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10532349, status: 'certain' },
              end: { position: 10532347, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 107, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '11880341', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10533367, status: 'certain' },
              end: { position: 10533365, status: 'certain' },
            },
          },
          {
            location: { position: { position: 706, status: 'certain' } },
            description: 'Phosphothreonine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483500, status: 'certain' },
              end: { position: 10483498, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089347',
        ensemblTranslationId: 'FBpp0088381',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 891, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10484252, status: 'certain' },
                end: { position: 10482943, status: 'certain' },
              },
              id: 'FBtr0089357-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10482943,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 311, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532530, status: 'certain' },
            },
          },
          {
            original: 'HTT',
            variation: ['QLGVVK'],
            location: {
              begin: { position: 605, status: 'certain' },
              end: { position: 607, status: 'certain' },
            },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10483803, status: 'certain' },
              end: { position: 10483795, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 340, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532443, status: 'certain' },
            },
          },
          {
            location: { position: { position: 705, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483503, status: 'certain' },
              end: { position: 10483501, status: 'certain' },
            },
          },
          {
            location: { position: { position: 140, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10533268, status: 'certain' },
              end: { position: 10533266, status: 'certain' },
            },
          },
          {
            location: { position: { position: 168, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10533184, status: 'certain' },
              end: { position: 10533182, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 821, status: 'certain' },
              end: { position: 843, status: 'certain' },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10483155, status: 'certain' },
              end: { position: 10483087, status: 'certain' },
            },
          },
          {
            location: { position: { position: 375, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10532340, status: 'certain' },
              end: { position: 10532338, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 115, status: 'certain' },
              end: { position: 200, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10533343, status: 'certain' },
              end: { position: 10532863, status: 'certain' },
            },
          },
          {
            location: { position: { position: 750, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483368, status: 'certain' },
              end: { position: 10483366, status: 'certain' },
            },
          },
          {
            location: { position: { position: 874, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10482996, status: 'certain' },
              end: { position: 10482994, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 840, status: 'certain' },
              end: { position: 860, status: 'certain' },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10483098, status: 'certain' },
              end: { position: 10483036, status: 'certain' },
            },
          },
          {
            location: { position: { position: 378, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10532331, status: 'certain' },
              end: { position: 10532329, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 446, status: 'certain' },
              end: { position: 467, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532066, status: 'certain' },
              end: { position: 10484215, status: 'certain' },
            },
          },
          {
            location: { position: { position: 161, status: 'certain' } },
            description: 'Phosphothreonine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10533205, status: 'certain' },
              end: { position: 10533203, status: 'certain' },
            },
          },
          {
            location: { position: { position: 162, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10533202, status: 'certain' },
              end: { position: 10533200, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 791, status: 'certain' },
              end: { position: 813, status: 'certain' },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10483245, status: 'certain' },
              end: { position: 10483177, status: 'certain' },
            },
          },
          {
            location: { position: { position: 749, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483371, status: 'certain' },
              end: { position: 10483369, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 32, status: 'certain' },
              end: { position: 97, status: 'certain' },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: { id: 'PRU00037', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 10533656, status: 'certain' },
              end: { position: 10533395, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 861, status: 'certain' },
              end: { position: 876, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10483035, status: 'certain' },
              end: { position: 10482988, status: 'certain' },
            },
          },
          {
            location: { position: { position: 696, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483530, status: 'certain' },
              end: { position: 10483528, status: 'certain' },
            },
          },
          {
            location: { position: { position: 372, status: 'certain' } },
            description: 'Phosphoserine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10532349, status: 'certain' },
              end: { position: 10532347, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 107, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '11880341', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10533367, status: 'certain' },
              end: { position: 10533365, status: 'certain' },
            },
          },
          {
            location: { position: { position: 706, status: 'certain' } },
            description: 'Phosphothreonine.',
            evidence: [
              {
                dbReference: { id: '18327897', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'modified residue',
            genomeLocation: {
              begin: { position: 10483500, status: 'certain' },
              end: { position: 10483498, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089357',
        ensemblTranslationId: 'FBpp0088391',
      },
    ],
  },
  {
    accession: 'P42284-1',
    name: 'LOLA2_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQGECLLPLKSII',
    protein: {
      recommendedName: {
        fullName: 'Isoform M of Longitudinals lacking protein, isoforms H/M/V',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 465, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532007, status: 'certain' },
              },
              id: 'FBtr0089362-E5',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10532007,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089362',
        ensemblTranslationId: 'FBpp0088396',
      },
    ],
  },
  {
    accession: 'P42284-2',
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
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 549, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10519375, status: 'certain' },
                end: { position: 10519092, status: 'certain' },
              },
              id: 'FBtr0089363-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10519092,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            original:
              'DVSTNQTVVLPHYSIYHYYSNIYYLLSHTTIYEADRTVSVSCPGKLNCLPQRNDLQETKSVTVL',
            variation: [
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSVLHIVLLLSTHRHIISFLLIIQSFIDKIY',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 518, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_015404',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10519185, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 311, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532530, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 107, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '11880341', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10533367, status: 'certain' },
              end: { position: 10533365, status: 'certain' },
            },
          },
          {
            original: 'I',
            variation: ['YEL'],
            location: { position: { position: 465, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10519346, status: 'certain' },
              end: { position: 10519344, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 115, status: 'certain' },
              end: { position: 200, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10533343, status: 'certain' },
              end: { position: 10532863, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 32, status: 'certain' },
              end: { position: 97, status: 'certain' },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: { id: 'PRU00037', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 10533656, status: 'certain' },
              end: { position: 10533395, status: 'certain' },
            },
          },
          {
            original: 'DVSTNQTVVLP',
            variation: ['GECLLPLKSII'],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 465, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '8050351', type: 'PubMed' },
                code: 'ECO:0000303',
              },
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_015403',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10519344, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 340, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532443, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089363',
        ensemblTranslationId: 'FBpp0088949',
      },
    ],
  },
  {
    accession: 'P42284-3',
    name: 'LOLA2_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSVLHIVLLLSTHRHIISFLLIIQSFIDKIY',
    protein: {
      recommendedName: {
        fullName: 'Isoform H of Longitudinals lacking protein, isoforms H/M/V',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 490, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10502462, status: 'certain' },
                end: { position: 10502358, status: 'certain' },
              },
              id: 'FBtr0089346-E6',
            },
            {
              proteinLocation: {
                begin: { position: 490, status: 'certain' },
                end: { position: 518, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10502229, status: 'certain' },
                end: { position: 10502144, status: 'certain' },
              },
              id: 'FBtr0089346-E7',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10502144,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089346',
        ensemblTranslationId: 'FBpp0088380',
      },
    ],
  },
  {
    accession: 'Q7KQZ4-1',
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
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 787, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10506073, status: 'certain' },
                end: { position: 10505076, status: 'certain' },
              },
              id: 'FBtr0089345-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10505076,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 311, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532530, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 653, status: 'certain' },
              end: { position: 674, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10505480, status: 'certain' },
              end: { position: 10505415, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 531, status: 'certain' },
              end: { position: 560, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10505846, status: 'certain' },
              end: { position: 10505757, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 685, status: 'certain' },
              end: { position: 707, status: 'certain' },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10505384, status: 'certain' },
              end: { position: 10505316, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 115, status: 'certain' },
              end: { position: 200, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10533343, status: 'certain' },
              end: { position: 10532863, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 714, status: 'certain' },
              end: { position: 737, status: 'certain' },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10505297, status: 'certain' },
              end: { position: 10505226, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 32, status: 'certain' },
              end: { position: 97, status: 'certain' },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: { id: 'PRU00037', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 10533656, status: 'certain' },
              end: { position: 10533395, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 653, status: 'certain' },
              end: { position: 677, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10505480, status: 'certain' },
              end: { position: 10505406, status: 'certain' },
            },
          },
          {
            original: 'P',
            variation: ['L'],
            location: { position: { position: 712, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '12897787', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10505303, status: 'certain' },
              end: { position: 10505301, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 107, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '11880341', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10533367, status: 'certain' },
              end: { position: 10533365, status: 'certain' },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYP',
            variation: [
              'GLLELSLNQMFYYDSEMPPPPIPPPVVVESPPASPPLAVVTPVVQLRRGKLRSRRRKAANSSNSTTKKSIPPPTVRSSSAANLARNADMRDDGKLQCPQCPNAYTRLSALKRHLEFECGMLENFRCQVCDAGFKRKDSLNRHCKVKKHNTKYLF',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 608, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051794',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10505613, status: 'certain' },
            },
          },
          {
            original: 'T',
            variation: ['S'],
            location: { position: { position: 653, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505480, status: 'certain' },
              end: { position: 10505478, status: 'certain' },
            },
          },
          {
            location: { position: { position: 520, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505879, status: 'certain' },
              end: { position: 10505877, status: 'certain' },
            },
          },
          {
            original: 'T',
            variation: ['A'],
            location: { position: { position: 654, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505477, status: 'certain' },
              end: { position: 10505475, status: 'certain' },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: { position: { position: 519, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505882, status: 'certain' },
              end: { position: 10505880, status: 'certain' },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: { position: { position: 611, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505606, status: 'certain' },
              end: { position: 10505604, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 340, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532443, status: 'certain' },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKW',
            variation: [
              'GLQLIDDSSSSQQNHLNGSKLELMDGSSDDYHQGSGSLHHFHAPQFDHFQGLLAGGNSVVGGAGNGGQEESFTCPQCYRTYRRHGTLRRHLRQECGKGKSMVCSVCGHRTKRADHLRQHVRKKHPEIAMRSLFKRQQRAAAAAASAVEGEDQKPETEIVDLVDMLDDGSVAAADEDHQHAYLVEDDDEDELPQHQQSQLTTEESTTSNYYRQQLRQQALLQQALQQVAAAAAVVASGNSTTSTTELLNGEGL',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 706, status: 'certain' },
            },
            evidence: [
              { code: 'ECO:0000303' },
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051795',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10505319, status: 'certain' },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKWECGKEPQFQCPFCVYRAKQKMHIGRHMERMHKEKFKLEDVKN',
            variation: [
              'DLKYDYKHSIFGSDDADQDQYKERFHCAVCNKSYLRKRHLQRHMRDECIGIPPRFNCEFCSSRFRRKYHMVRHLVSKHGIPPAIAQMTTGSGSRSSISGSLDLKSGGGLAGLQQMGGGGAGGGGSTGDCGASVGSAGSHNGCESPIPENLSLRKENYENENLSGSRCTSPLPPHIMPIPTYGLTGAITAISAAAAVVEEQAAAAAAAAAIAEAQAKNNNESGGGRSEVDDEDETLAAQAEAVAALGIKPEPVTPSKVQHLMNEEWNMKLGLQIISNSLLKERLMNTMPFAYNNN',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 748, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
              {
                dbReference: { id: '12537569', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051796',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10505193, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 506, status: 'certain' },
              end: { position: 560, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10505921, status: 'certain' },
              end: { position: 10505757, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089343',
        ensemblTranslationId: 'FBpp0088377',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 787, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10506073, status: 'certain' },
                end: { position: 10505076, status: 'certain' },
              },
              id: 'FBtr0089345-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10505076,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 311, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532530, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 653, status: 'certain' },
              end: { position: 674, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10505480, status: 'certain' },
              end: { position: 10505415, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 531, status: 'certain' },
              end: { position: 560, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10505846, status: 'certain' },
              end: { position: 10505757, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 685, status: 'certain' },
              end: { position: 707, status: 'certain' },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10505384, status: 'certain' },
              end: { position: 10505316, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 115, status: 'certain' },
              end: { position: 200, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10533343, status: 'certain' },
              end: { position: 10532863, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 714, status: 'certain' },
              end: { position: 737, status: 'certain' },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10505297, status: 'certain' },
              end: { position: 10505226, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 32, status: 'certain' },
              end: { position: 97, status: 'certain' },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: { id: 'PRU00037', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 10533656, status: 'certain' },
              end: { position: 10533395, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 653, status: 'certain' },
              end: { position: 677, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10505480, status: 'certain' },
              end: { position: 10505406, status: 'certain' },
            },
          },
          {
            original: 'P',
            variation: ['L'],
            location: { position: { position: 712, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '12897787', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10505303, status: 'certain' },
              end: { position: 10505301, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 107, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '11880341', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10533367, status: 'certain' },
              end: { position: 10533365, status: 'certain' },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYP',
            variation: [
              'GLLELSLNQMFYYDSEMPPPPIPPPVVVESPPASPPLAVVTPVVQLRRGKLRSRRRKAANSSNSTTKKSIPPPTVRSSSAANLARNADMRDDGKLQCPQCPNAYTRLSALKRHLEFECGMLENFRCQVCDAGFKRKDSLNRHCKVKKHNTKYLF',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 608, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051794',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10505613, status: 'certain' },
            },
          },
          {
            original: 'T',
            variation: ['S'],
            location: { position: { position: 653, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505480, status: 'certain' },
              end: { position: 10505478, status: 'certain' },
            },
          },
          {
            location: { position: { position: 520, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505879, status: 'certain' },
              end: { position: 10505877, status: 'certain' },
            },
          },
          {
            original: 'T',
            variation: ['A'],
            location: { position: { position: 654, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505477, status: 'certain' },
              end: { position: 10505475, status: 'certain' },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: { position: { position: 519, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505882, status: 'certain' },
              end: { position: 10505880, status: 'certain' },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: { position: { position: 611, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10505606, status: 'certain' },
              end: { position: 10505604, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 340, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532443, status: 'certain' },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKW',
            variation: [
              'GLQLIDDSSSSQQNHLNGSKLELMDGSSDDYHQGSGSLHHFHAPQFDHFQGLLAGGNSVVGGAGNGGQEESFTCPQCYRTYRRHGTLRRHLRQECGKGKSMVCSVCGHRTKRADHLRQHVRKKHPEIAMRSLFKRQQRAAAAAASAVEGEDQKPETEIVDLVDMLDDGSVAAADEDHQHAYLVEDDDEDELPQHQQSQLTTEESTTSNYYRQQLRQQALLQQALQQVAAAAAVVASGNSTTSTTELLNGEGL',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 706, status: 'certain' },
            },
            evidence: [
              { code: 'ECO:0000303' },
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051795',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10505319, status: 'certain' },
            },
          },
          {
            original:
              'DLSITRIAGLTWNEWNARLAMPLVTLREGVQPLVFPTDLSVDKQQGAAGLTAKDVNVSGRKTPTDGGGCKSEPRAASTPARTHSSSNHSSNGNGSGKPTKTSSGGKLNHLTEEEATALMLKAVAEKQAAAAAGTELSFGEDQASSGNGNSSDYPATLSGAVTFADVGGPAGLCHINILNSISAMNNLISGSTAAGVGITTGSGQSPSNSGHNNSAGGGSSVLGGADNGAGHPCPVCGRVYKLKSSLRNHQKWECGKEPQFQCPFCVYRAKQKMHIGRHMERMHKEKFKLEDVKN',
            variation: [
              'DLKYDYKHSIFGSDDADQDQYKERFHCAVCNKSYLRKRHLQRHMRDECIGIPPRFNCEFCSSRFRRKYHMVRHLVSKHGIPPAIAQMTTGSGSRSSISGSLDLKSGGGLAGLQQMGGGGAGGGGSTGDCGASVGSAGSHNGCESPIPENLSLRKENYENENLSGSRCTSPLPPHIMPIPTYGLTGAITAISAAAAVVEEQAAAAAAAAAIAEAQAKNNNESGGGRSEVDDEDETLAAQAEAVAALGIKPEPVTPSKVQHLMNEEWNMKLGLQIISNSLLKERLMNTMPFAYNNN',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 748, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
              {
                dbReference: { id: '12537569', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051796',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10505193, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 506, status: 'certain' },
              end: { position: 560, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10505921, status: 'certain' },
              end: { position: 10505757, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089345',
        ensemblTranslationId: 'FBpp0088379',
      },
    ],
  },
  {
    accession: 'Q7KQZ4-2',
    name: 'LOLA3_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQGLQLIDDSSSSQQNHLNGSKLELMDGSSDDYHQGSGSLHHFHAPQFDHFQGLLAGGNSVVGGAGNGGQEESFTCPQCYRTYRRHGTLRRHLRQECGKGKSMVCSVCGHRTKRADHLRQHVRKKHPEIAMRSLFKRQQRAAAAAASAVEGEDQKPETEIVDLVDMLDDGSVAAADEDHQHAYLVEDDDEDELPQHQQSQLTTEESTTSNYYRQQLRQQALLQQALQQVAAAAAVVASGNSTTSTTELLNGEGL',
    protein: {
      recommendedName: {
        fullName:
          'Isoform A of Longitudinals lacking protein, isoforms A/B/D/L',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 706, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10524633, status: 'certain' },
                end: { position: 10523879, status: 'certain' },
              },
              id: 'FBtr0089344-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10523879,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            original: 'T',
            variation: ['A'],
            location: { position: { position: 654, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10524037, status: 'certain' },
              end: { position: 10524035, status: 'certain' },
            },
          },
          {
            original: 'N',
            variation: ['S'],
            location: { position: { position: 519, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10524442, status: 'certain' },
              end: { position: 10524440, status: 'certain' },
            },
          },
          {
            original: 'E',
            variation: ['D'],
            location: { position: { position: 611, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10524166, status: 'certain' },
              end: { position: 10524164, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089344',
        ensemblTranslationId: 'FBpp0088378',
      },
    ],
  },
  {
    accession: 'Q7KQZ4-3',
    name: 'LOLA3_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDLKYDYKHSIFGSDDADQDQYKERFHCAVCNKSYLRKRHLQRHMRDECIGIPPRFNCEFCSSRFRRKYHMVRHLVSKHGIPPAIAQMTTGSGSRSSISGSLDLKSGGGLAGLQQMGGGGAGGGGSTGDCGASVGSAGSHNGCESPIPENLSLRKENYENENLSGSRCTSPLPPHIMPIPTYGLTGAITAISAAAAVVEEQAAAAAAAAAIAEAQAKNNNESGGGRSEVDDEDETLAAQAEAVAALGIKPEPVTPSKVQHLMNEEWNMKLGLQIISNSLLKERLMNTMPFAYNNN',
    protein: {
      recommendedName: {
        fullName:
          'Isoform D of Longitudinals lacking protein, isoforms A/B/D/L',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 748, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10521277, status: 'certain' },
                end: { position: 10520397, status: 'certain' },
              },
              id: 'FBtr0089349-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10520397,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089342',
        ensemblTranslationId: 'FBpp0088376',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 748, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10521277, status: 'certain' },
                end: { position: 10520397, status: 'certain' },
              },
              id: 'FBtr0089349-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10520397,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089349',
        ensemblTranslationId: 'FBpp0088383',
      },
    ],
  },
  {
    accession: 'Q7KQZ4-4',
    name: 'LOLA3_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQGLLELSLNQMFYYDSEMPPPPIPPPVVVESPPASPPLAVVTPVVQLRRGKLRSRRRKAANSSNSTTKKSIPPPTVRSSSAANLARNADMRDDGKLQCPQCPNAYTRLSALKRHLEFECGMLENFRCQVCDAGFKRKDSLNRHCKVKKHNTKYLF',
    protein: {
      recommendedName: {
        fullName:
          'Isoform L of Longitudinals lacking protein, isoforms A/B/D/L',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 608, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10525862, status: 'certain' },
                end: { position: 10525402, status: 'certain' },
              },
              id: 'FBtr0089352-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10525402,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089352',
        ensemblTranslationId: 'FBpp0088386',
      },
    ],
  },
  {
    accession: 'Q867Z4-1',
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
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 569, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10510136, status: 'certain' },
                end: { position: 10509795, status: 'certain' },
              },
              id: 'FBtr0089350-E6',
            },
            {
              proteinLocation: {
                begin: { position: 569, status: 'certain' },
                end: { position: 970, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10509554, status: 'certain' },
                end: { position: 10508350, status: 'certain' },
              },
              id: 'FBtr0089350-E7',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10508350,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            location: {
              begin: { position: 790, status: 'certain' },
              end: { position: 843, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10508892, status: 'certain' },
              end: { position: 10508731, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 903, status: 'certain' },
              end: { position: 925, status: 'certain' },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10508553, status: 'certain' },
              end: { position: 10508485, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 790, status: 'certain' },
              end: { position: 828, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10508892, status: 'certain' },
              end: { position: 10508776, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 933, status: 'certain' },
              end: { position: 955, status: 'certain' },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10508463, status: 'certain' },
              end: { position: 10508395, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 340, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532443, status: 'certain' },
            },
          },
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPSSECELINIKK',
            variation: [
              'ENSWTISVKSVTSLNNVSPSNNSHICPRCEKAYTYKKNLSRHLRYECGQLPTEKCRHCSYVARYKHSLNMHVKTQHPEQISDTFAGSSGSSDGVRDRRGRSLVRGLFDSAKGEKFLDYLNN',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 575, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051802',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10509535, status: 'certain' },
            },
          },
          {
            original:
              'SKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPS',
            variation: [
              'PSSYVSNSSQTPPPIGGSSSASSAQALIRDYWYELKFSDLFKFINPDGRYQCPRFNCLKSYKDASSLQRHIRYECGGQKKFRCLMCGKAFSQSSHLKRHLESGVCVKYYL',
            ],
            location: {
              begin: { position: 456, status: 'certain' },
              end: { position: 565, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051803',
            genomeLocation: {
              begin: { position: 10510134, status: 'certain' },
              end: { position: 10509805, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 453, status: 'certain' },
              end: { position: 467, status: 'certain' },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532045, status: 'certain' },
              end: { position: 10510099, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 115, status: 'certain' },
              end: { position: 200, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10533343, status: 'certain' },
              end: { position: 10532863, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 829, status: 'certain' },
              end: { position: 843, status: 'certain' },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10508775, status: 'certain' },
              end: { position: 10508731, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 32, status: 'certain' },
              end: { position: 97, status: 'certain' },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: { id: 'PRU00037', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 10533656, status: 'certain' },
              end: { position: 10533395, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 447, status: 'certain' },
              end: { position: 468, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532063, status: 'certain' },
              end: { position: 10510096, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 107, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '11880341', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10533367, status: 'certain' },
              end: { position: 10533365, status: 'certain' },
            },
          },
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASH',
            variation: [
              'DFVLTWYQHACDQCGKSYKTRKSLSRHRRFECRFTTERPIFQCPSCNYAAKRSDNLTKHIKTHFAKMKKDFLPLAFQMQASTGIATKWEATA',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 546, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051801',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10509862, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 311, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532530, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089350',
        ensemblTranslationId: 'FBpp0088384',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 569, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10510136, status: 'certain' },
                end: { position: 10509795, status: 'certain' },
              },
              id: 'FBtr0089350-E6',
            },
            {
              proteinLocation: {
                begin: { position: 569, status: 'certain' },
                end: { position: 970, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10509554, status: 'certain' },
                end: { position: 10508350, status: 'certain' },
              },
              id: 'FBtr0343132-E7',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10508350,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            location: {
              begin: { position: 790, status: 'certain' },
              end: { position: 843, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10508892, status: 'certain' },
              end: { position: 10508731, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 903, status: 'certain' },
              end: { position: 925, status: 'certain' },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10508553, status: 'certain' },
              end: { position: 10508485, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 790, status: 'certain' },
              end: { position: 828, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10508892, status: 'certain' },
              end: { position: 10508776, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 933, status: 'certain' },
              end: { position: 955, status: 'certain' },
            },
            description: 'C2H2-type 2.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10508463, status: 'certain' },
              end: { position: 10508395, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 340, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532443, status: 'certain' },
            },
          },
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPSSECELINIKK',
            variation: [
              'ENSWTISVKSVTSLNNVSPSNNSHICPRCEKAYTYKKNLSRHLRYECGQLPTEKCRHCSYVARYKHSLNMHVKTQHPEQISDTFAGSSGSSDGVRDRRGRSLVRGLFDSAKGEKFLDYLNN',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 575, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051802',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10509535, status: 'certain' },
            },
          },
          {
            original:
              'SKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASHSEPKPTLTTLTSTPIKLPS',
            variation: [
              'PSSYVSNSSQTPPPIGGSSSASSAQALIRDYWYELKFSDLFKFINPDGRYQCPRFNCLKSYKDASSLQRHIRYECGGQKKFRCLMCGKAFSQSSHLKRHLESGVCVKYYL',
            ],
            location: {
              begin: { position: 456, status: 'certain' },
              end: { position: 565, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051803',
            genomeLocation: {
              begin: { position: 10510134, status: 'certain' },
              end: { position: 10509805, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 453, status: 'certain' },
              end: { position: 467, status: 'certain' },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532045, status: 'certain' },
              end: { position: 10510099, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 115, status: 'certain' },
              end: { position: 200, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10533343, status: 'certain' },
              end: { position: 10532863, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 829, status: 'certain' },
              end: { position: 843, status: 'certain' },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10508775, status: 'certain' },
              end: { position: 10508731, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 32, status: 'certain' },
              end: { position: 97, status: 'certain' },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: { id: 'PRU00037', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 10533656, status: 'certain' },
              end: { position: 10533395, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 447, status: 'certain' },
              end: { position: 468, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532063, status: 'certain' },
              end: { position: 10510096, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 107, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '11880341', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10533367, status: 'certain' },
              end: { position: 10533365, status: 'certain' },
            },
          },
          {
            original:
              'ASKQDKGEQTEGAQDEFELDDCLLESNDIVITQNKDGFVLHVKKLGNITAAKLEENQAVAQQQGQAAVTVTGPAGQPTPTITELLNAAAASH',
            variation: [
              'DFVLTWYQHACDQCGKSYKTRKSLSRHRRFECRFTTERPIFQCPSCNYAAKRSDNLTKHIKTHFAKMKKDFLPLAFQMQASTGIATKWEATA',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 546, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051801',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10509862, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 311, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532530, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0343132',
        ensemblTranslationId: 'FBpp0309831',
      },
    ],
  },
  {
    accession: 'Q867Z4-2',
    name: 'LOLA4_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQAPSSYVSNSSQTPPPIGGSSSASSAQALIRDYWYELKFSDLFKFINPDGRYQCPRFNCLKSYKDASSLQRHIRYECGGQKKFRCLMCGKAFSQSSHLKRHLESGVCVKYYL',
    protein: {
      recommendedName: {
        fullName:
          'Isoform F of Longitudinals lacking protein, isoforms F/I/K/T',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 527, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10516051, status: 'certain' },
                end: { position: 10515835, status: 'certain' },
              },
              id: 'FBtr0089348-E6',
            },
            {
              proteinLocation: {
                begin: { position: 527, status: 'certain' },
                end: { position: 565, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10515658, status: 'certain' },
                end: { position: 10515544, status: 'certain' },
              },
              id: 'FBtr0089348-E7',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10515544,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089348',
        ensemblTranslationId: 'FBpp0088382',
      },
    ],
  },
  {
    accession: 'Q867Z4-3',
    name: 'LOLA4_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDFVLTWYQHACDQCGKSYKTRKSLSRHRRFECRFTTERPIFQCPSCNYAAKRSDNLTKHIKTHFAKMKKDFLPLAFQMQASTGIATKWEATA',
    protein: {
      recommendedName: {
        fullName:
          'Isoform K of Longitudinals lacking protein, isoforms F/I/K/T',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 546, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10518202, status: 'certain' },
                end: { position: 10517928, status: 'certain' },
              },
              id: 'FBtr0089353-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10517928,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089353',
        ensemblTranslationId: 'FBpp0088387',
      },
    ],
  },
  {
    accession: 'Q867Z4-5',
    name: 'LOLA4_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQENSWTISVKSVTSLNNVSPSNNSHICPRCEKAYTYKKNLSRHLRYECGQLPTEKCRHCSYVARYKHSLNMHVKTQHPEQISDTFAGSSGSSDGVRDRRGRSLVRGLFDSAKGEKFLDYLNN',
    protein: {
      recommendedName: {
        fullName:
          'Isoform T of Longitudinals lacking protein, isoforms F/I/K/T',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 575, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10511004, status: 'certain' },
                end: { position: 10510643, status: 'certain' },
              },
              id: 'FBtr0089351-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10510643,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089351',
        ensemblTranslationId: 'FBpp0088385',
      },
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 575, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10511004, status: 'certain' },
                end: { position: 10510643, status: 'certain' },
              },
              id: 'FBtr0089351-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10510643,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089359',
        ensemblTranslationId: 'FBpp0088393',
      },
    ],
  },
  {
    accession: 'Q9V5M3-2',
    name: 'LOLA6_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDIYPILGSLLGVDTSTSANPGSSANASDEFYGYHLNNNNTTTSSSTTISHAKNTSNSGAFSSGGGGGGGLSRDSFMQCKHCNRYYKSHQKLQEHVRKYCLKQKKYKCVSCEYRSRRKDHVLRHAKRKHCMLYEQSRDDEESLYVIRNEDDMSNDEEAVDGDDGDPEDGDPGGMDDVAAALCEINFDFAGRDLTITAVPALQESEEDDEDYDDDG',
    protein: {
      recommendedName: {
        fullName:
          'Isoform O of Longitudinals lacking protein, isoforms N/O/W/X/Y',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 668, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10492585, status: 'certain' },
                end: { position: 10491945, status: 'certain' },
              },
              id: 'FBtr0089361-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10491945,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089361',
        ensemblTranslationId: 'FBpp0088395',
      },
    ],
  },
  {
    accession: 'Q9V5M3-3',
    name: 'LOLA6_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDGYWTILETVPYSIASAAPNQTLTTATTLSNGGSSLLTGATVVVELPPDDLGNPVGNIQYTIPALTKNATTNTNTTSLLHKPQATTIQIVKQQHQQQHQQQHQHPQQQHQPQQQQHRQHLTIQQSQTHARQEYIKIDTSRLEDKMLLRDVMQYGATSIAMAPQSATTTVVSTHPVESGLLLADADEAERELELEAMKVDQHDEEHLLDDEGYVIEKIHGDGETVNQPQEKLYINGMSNIIHTATTMTLQPDDCKYACNVCGKTYKIKGSLKRHKNYECGVEPNLKCPHCPHKCKYRSDLRKHMNQKHADSGEAILAT',
    protein: {
      recommendedName: {
        fullName:
          'Isoform W of Longitudinals lacking protein, isoforms N/O/W/X/Y',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 771, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10491051, status: 'certain' },
                end: { position: 10490102, status: 'certain' },
              },
              id: 'FBtr0089364-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10490102,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089364',
        ensemblTranslationId: 'FBpp0088950',
      },
    ],
  },
  {
    accession: 'Q9V5M3-4',
    name: 'LOLA6_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQVITVDRKYNLRTQESSGSSADLPSTSKQKVAAVQHKLAELASLDQKSENEEPTDLDNAASLKKAMATSDAMIALQQLASISTARSLQHLVQNMSNIDNSALVPGRKLPRNAAKRSPKYESNRCPLCSRVCRSQAFLNEHMRKEHSVLI',
    protein: {
      recommendedName: {
        fullName:
          'Isoform X of Longitudinals lacking protein, isoforms N/O/W/X/Y',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 602, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10488426, status: 'certain' },
                end: { position: 10487984, status: 'certain' },
              },
              id: 'FBtr0089365-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10487984,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            original: 'Q',
            variation: ['P'],
            location: { position: { position: 587, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10488031, status: 'certain' },
              end: { position: 10488029, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089365',
        ensemblTranslationId: 'FBpp0088951',
      },
    ],
  },
  {
    accession: 'Q9V5M3-5',
    name: 'LOLA6_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDFVRHGPKNQLLCQCGRYYNTLSRLMLHQREECQDFKRFQCDFCLKWFKRRSHLNRHKKLHDAELFLEPLSKQKPKTTSGQNLSHDANTDDEVATTNPAATEDESNYPFTSEIKIENEFDEFI',
    protein: {
      recommendedName: {
        fullName:
          'Isoform Y of Longitudinals lacking protein, isoforms N/O/W/X/Y',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 577, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10489143, status: 'certain' },
                end: { position: 10488776, status: 'certain' },
              },
              id: 'FBtr0089366-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10488776,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            original: 'E',
            variation: ['D'],
            location: { position: { position: 485, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10489054, status: 'certain' },
              end: { position: 10489052, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089366',
        ensemblTranslationId: 'FBpp0088948',
      },
    ],
  },
  {
    accession: 'Q9V5M6-1',
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
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 490, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10502462, status: 'certain' },
                end: { position: 10502358, status: 'certain' },
              },
              id: 'FBtr0089346-E6',
            },
            {
              proteinLocation: {
                begin: { position: 490, status: 'certain' },
                end: { position: 963, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10502059, status: 'certain' },
                end: { position: 10500639, status: 'certain' },
              },
              id: 'FBtr0089355-E7',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10500639,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            location: {
              begin: { position: 878, status: 'certain' },
              end: { position: 901, status: 'certain' },
            },
            description: 'C2H2-type 2; degenerate.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10500896, status: 'certain' },
              end: { position: 10500825, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 849, status: 'certain' },
              end: { position: 871, status: 'certain' },
            },
            description: 'C2H2-type 1; degenerate.',
            evidence: [
              {
                dbReference: { id: 'PRU00042', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'zinc finger region',
            genomeLocation: {
              begin: { position: 10500983, status: 'certain' },
              end: { position: 10500915, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 494, status: 'certain' },
              end: { position: 520, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10502048, status: 'certain' },
              end: { position: 10501968, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 340, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532443, status: 'certain' },
            },
          },
          {
            original:
              'EAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTY',
            variation: [
              'LRTLYCNYATAVIAAASAASKKPAEHQTAASSTANHQNQNLNHQNLLQQHHSNSSSNSNCGPAAEICEPEVTIRRMFKCGNSGQAEAIVNHLQMTGQQHQQLHCNVSNCSGCHMSAAAASFQLANLLNSGIRSSSTSKPQRNHISASGNTSSSSNANTNNNSSGNSSLSLAAKKTSVQFHCEFCNFSCSWRYDLKLHLRQKHGIHQLKKV',
            ],
            location: {
              begin: { position: 456, status: 'certain' },
              end: { position: 665, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051808',
            genomeLocation: {
              begin: { position: 10502460, status: 'certain' },
              end: { position: 10501533, status: 'certain' },
            },
          },
          {
            original: 'M',
            variation: ['V'],
            location: { position: { position: 549, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10501883, status: 'certain' },
              end: { position: 10501881, status: 'certain' },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTYDAVKIENEEFEDSYLMDNDDDDDDLLTTAAATQKHAKQSNEKQMAGSMVAGAGSG',
            variation: [
              'ARTQHEHIHTTPPAISLFLNSTTPYFDSLSLSVLSVRIVKQSQQILDKNPITILTDLRTLYCNYATAVIAAASAASKKPAEHQTAASSTANHQNQNLNHQNLLQQHHSNSSSNSNCGPAAEICEPEVTIRRMFKCGNSGQAEAIVNHLQMTGQQHQQLHCNVSNCSGCHMSAAAASFQLANLLNSGIRSSSTSKPQRNHISASGNTSSSSNANTNNNSSGNSSLSLAAKKTSVQFHCEFCNFSCSWRYDLKLHLRQKHGIHQLKKV',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 720, status: 'certain' },
            },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'splice variant',
            id: 'VSP_017255',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10501368, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 228, status: 'certain' },
              end: { position: 311, status: 'certain' },
            },
            description: 'Polar residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10532781, status: 'certain' },
              end: { position: 10532530, status: 'certain' },
            },
          },
          {
            original: 'L',
            variation: ['F'],
            location: { position: { position: 115, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10533343, status: 'certain' },
              end: { position: 10533341, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 447, status: 'certain' },
              end: { position: 469, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10532063, status: 'certain' },
              end: { position: 10502419, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 482, status: 'certain' },
              end: { position: 520, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10502382, status: 'certain' },
              end: { position: 10501968, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 32, status: 'certain' },
              end: { position: 97, status: 'certain' },
            },
            description: 'BTB.',
            evidence: [
              {
                dbReference: { id: 'PRU00037', type: 'PROSITE-ProRule' },
                code: 'ECO:0000255',
              },
            ],
            type: 'domain',
            genomeLocation: {
              begin: { position: 10533656, status: 'certain' },
              end: { position: 10533395, status: 'certain' },
            },
          },
          {
            original: 'S',
            variation: ['N'],
            location: { position: { position: 475, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10502403, status: 'certain' },
              end: { position: 10502401, status: 'certain' },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAAL',
            variation: [
              'DSMVVPKITAVRGSSKRLARRKATLAIATAMATSASATHMMSRRKRTSSSCRNASSGGNAPSTSTSASSATTASISKSKCKSSDAASAPFVCQTCGRRYQVLGTLRRHMRKECNQPKKYVCRMCERRFHYNFKLQDHYYYVHKGVQKRE',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 603, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051807',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10501719, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['G'],
            location: { position: { position: 477, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10502397, status: 'certain' },
              end: { position: 10502395, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 626, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10501652, status: 'certain' },
              end: { position: 10501650, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 115, status: 'certain' },
              end: { position: 200, status: 'certain' },
            },
            description: 'Disordered.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'region of interest',
            genomeLocation: {
              begin: { position: 10533343, status: 'certain' },
              end: { position: 10532863, status: 'certain' },
            },
          },
          {
            original:
              'DEAGQNEGGESRIRVRNWLMLADKSIIGKSSDEPSDKLTQSKKSLISDAKTTNKTSTPIRPKVSTTTTSTSTAAAAAAAATIAAKQAAAAIASSNINNNNSSLTQTVTQTVTRIGSIGRTTIACITPANNGNKSSSSNCNVDAASAAALAAAGVELDSIDDTMTEVIVKIENPESMPLNDDEDDAVCNEAIEDENTFDYDLKLGSPLSWTYDAVKIENEEFEDSYLMDNDDDDDDLLTTAAATQKHAKQSNEKQMAGSMVAGAGSGGAVKKIVLSAQQQQQLLEQQQHLQHLQLQPTSQSLQI',
            variation: [
              'DFGRLSPNRRNYNLLGGIKSSPYNSPIGTPVIKFEPGSGQEDHNEHKSGRVTPTAHCPGNLLVPKTQPRHGNGDNDDSNDEDSMEPCDLRIDLAKAFLAAAQSGAATTLPLGHHHHHGHHPHGRTLPNLIYPAVPVKVPRPDTPTRRYSSSSGPVQDAASSVAVQFVAAAAAAGLAANNTSASTNTGGGASTSAAAAAAAAAAAAAAAAAAGGSVAGNWSSGGGSGGAGGGIGGGGSGGGGGGGGGGAYACDRCGNTYARPHSLNRHVRFECGVEPKFECPICHKKSKHKHNLVLHMRTHQHR',
            ],
            location: {
              begin: { position: 455, status: 'certain' },
              end: { position: 757, status: 'certain' },
            },
            evidence: [
              {
                dbReference: { id: '12853139', type: 'PubMed' },
                code: 'ECO:0000303',
              },
            ],
            type: 'splice variant',
            id: 'VSP_051809',
            genomeLocation: {
              begin: { position: 10532039, status: 'certain' },
              end: { position: 10501257, status: 'certain' },
            },
          },
          {
            original: 'M',
            variation: ['I'],
            location: { position: { position: 485, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10502373, status: 'certain' },
              end: { position: 10502371, status: 'certain' },
            },
          },
          {
            location: {
              begin: { position: 900, status: 'certain' },
              end: { position: 915, status: 'certain' },
            },
            description: 'Basic and acidic residues.',
            evidence: [
              {
                dbReference: { id: 'MobiDB-lite', type: 'SAM' },
                code: 'ECO:0000256',
              },
            ],
            type: 'compositionally biased region',
            genomeLocation: {
              begin: { position: 10500830, status: 'certain' },
              end: { position: 10500783, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 107, status: 'certain' } },
            evidence: [
              {
                dbReference: { id: '11880341', type: 'PubMed' },
                code: 'ECO:0000269',
              },
            ],
            type: 'mutagenesis site',
            genomeLocation: {
              begin: { position: 10533367, status: 'certain' },
              end: { position: 10533365, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089355',
        ensemblTranslationId: 'FBpp0088389',
      },
    ],
  },
  {
    accession: 'Q9V5M6-2',
    name: 'LOLA5_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDFGRLSPNRRNYNLLGGIKSSPYNSPIGTPVIKFEPGSGQEDHNEHKSGRVTPTAHCPGNLLVPKTQPRHGNGDNDDSNDEDSMEPCDLRIDLAKAFLAAAQSGAATTLPLGHHHHHGHHPHGRTLPNLIYPAVPVKVPRPDTPTRRYSSSSGPVQDAASSVAVQFVAAAAAAGLAANNTSASTNTGGGASTSAAAAAAAAAAAAAAAAAAGGSVAGNWSSGGGSGGAGGGIGGGGSGGGGGGGGGGAYACDRCGNTYARPHSLNRHVRFECGVEPKFECPICHKKSKHKHNLVLHMRTHQHR',
    protein: {
      recommendedName: {
        fullName:
          'Isoform J of Longitudinals lacking protein, isoforms J/P/Q/S/Z',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 757, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10498089, status: 'certain' },
                end: { position: 10497182, status: 'certain' },
              },
              id: 'FBtr0089360-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10497182,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089360',
        ensemblTranslationId: 'FBpp0088394',
      },
    ],
  },
  {
    accession: 'Q9V5M6-3',
    name: 'LOLA5_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDSMVVPKITAVRGSSKRLARRKATLAIATAMATSASATHMMSRRKRTSSSCRNASSGGNAPSTSTSASSATTASISKSKCKSSDAASAPFVCQTCGRRYQVLGTLRRHMRKECNQPKKYVCRMCERRFHYNFKLQDHYYYVHKGVQKRE',
    protein: {
      recommendedName: {
        fullName:
          'Isoform Q of Longitudinals lacking protein, isoforms J/P/Q/S/Z',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 506, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10527219, status: 'certain' },
                end: { position: 10527066, status: 'certain' },
              },
              id: 'FBtr0089356-E6',
            },
            {
              proteinLocation: {
                begin: { position: 506, status: 'certain' },
                end: { position: 603, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10526974, status: 'certain' },
                end: { position: 10526683, status: 'certain' },
              },
              id: 'FBtr0089356-E7',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10526683,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            original: 'M',
            variation: ['I'],
            location: { position: { position: 485, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10527130, status: 'certain' },
              end: { position: 10527128, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['G'],
            location: { position: { position: 477, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10527154, status: 'certain' },
              end: { position: 10527152, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0089356',
        ensemblTranslationId: 'FBpp0088390',
      },
    ],
  },
  {
    accession: 'Q9V5M6-5',
    name: 'LOLA5_DROME',
    taxid: 7227,
    sequence:
      'MDDDQQFCLRWNNHQSTLISVFDTLLENETLVDCTLAAEGKFLKAHKVVLSACSPYFATLLQEQYDKHPIFILKDVKYQELRAMMDYMYRGEVNISQDQLAALLKAAESLQIKGLSDNRTGGGVAPKPESSGHHRGGKLSGAYTLEQTKRARLATGGAMDTSGDVSGSREGSSSPSRRRRKVRRRSMENDAHDNSNSSVLQAAASNQSILQQTGAGLAVSALVTTQLSSGPAAGTSSQASSTQQQQPLTSTNVTKKTESAKLTSSTAAPASGASASAAVQQAHLHQQQAQTTSDAINTENVQAQSQGGAQGVQGDDEDIDEGSAVGGPNSATGPNPASASASAVHAGVVVKQLASVVDKSSSNHKHKIKDNSVSSVGSEMVIEPKAEYDDDAHDENVEDLTLDEEDMTMEELDQTAGTSQGGEGSSQTYATWQHDRSQDELGLMAQDAQQRDPQDLRTLYCNYATAVIAAASAASKKPAEHQTAASSTANHQNQNLNHQNLLQQHHSNSSSNSNCGPAAEICEPEVTIRRMFKCGNSGQAEAIVNHLQMTGQQHQQLHCNVSNCSGCHMSAAAASFQLANLLNSGIRSSSTSKPQRNHISASGNTSSSSNANTNNNSSGNSSLSLAAKKTSVQFHCEFCNFSCSWRYDLKLHLRQKHGIHQLKKV',
    protein: {
      recommendedName: {
        fullName:
          'Isoform Z of Longitudinals lacking protein, isoforms J/P/Q/S/Z',
      },
    },
    gene: [
      { value: 'lola', type: 'primary' },
      { value: 'CG12052', type: 'ORF' },
    ],
    gnCoordinate: [
      {
        genomicLocation: {
          exon: [
            {
              proteinLocation: {
                begin: { position: 1, status: 'certain' },
                end: { position: 58, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533749, status: 'certain' },
                end: { position: 10533576, status: 'certain' },
              },
              id: 'FBtr0089356-E2',
            },
            {
              proteinLocation: {
                begin: { position: 59, status: 'certain' },
                end: { position: 190, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10533511, status: 'certain' },
                end: { position: 10533118, status: 'certain' },
              },
              id: 'FBtr0089356-E3',
            },
            {
              proteinLocation: {
                begin: { position: 190, status: 'certain' },
                end: { position: 428, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532894, status: 'certain' },
                end: { position: 10532181, status: 'certain' },
              },
              id: 'FBtr0089356-E4',
            },
            {
              proteinLocation: {
                begin: { position: 428, status: 'certain' },
                end: { position: 455, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10532119, status: 'certain' },
                end: { position: 10532039, status: 'certain' },
              },
              id: 'FBtr0089356-E5',
            },
            {
              proteinLocation: {
                begin: { position: 455, status: 'certain' },
                end: { position: 665, status: 'certain' },
              },
              genomeLocation: {
                begin: { position: 10522969, status: 'certain' },
                end: { position: 10522338, status: 'certain' },
              },
              id: 'FBtr0100286-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10522338,
          reverseStrand: true,
          nucleotideId: 'AE013599.5',
          assemblyName: 'BDGP6.46',
        },
        feature: [
          {
            original: 'S',
            variation: ['N'],
            location: { position: { position: 475, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10522910, status: 'certain' },
              end: { position: 10522908, status: 'certain' },
            },
          },
          {
            original: 'A',
            variation: ['V'],
            location: { position: { position: 626, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10522457, status: 'certain' },
              end: { position: 10522455, status: 'certain' },
            },
          },
          {
            original: 'M',
            variation: ['V'],
            location: { position: { position: 549, status: 'certain' } },
            evidence: [{ code: 'ECO:0000305' }],
            type: 'sequence conflict',
            genomeLocation: {
              begin: { position: 10522688, status: 'certain' },
              end: { position: 10522686, status: 'certain' },
            },
          },
        ],
        ensemblGeneId: 'FBgn0283521',
        ensemblTranscriptId: 'FBtr0100286',
        ensemblTranslationId: 'FBpp0099680',
      },
    ],
  },
];

export default mock;
