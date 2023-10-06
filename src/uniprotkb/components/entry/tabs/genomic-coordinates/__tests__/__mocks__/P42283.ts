import { GenomicEntry } from '../../types';

// Source: https://www.ebi.ac.uk/proteins/api/coordinates?accession=P42283-1%2CQ7KQZ4-2%2CQ7KQZ4-1%2CQ7KQZ4-3%2CQ867Z4-2%2CP42284-3%2CQ867Z4-1%2CQ9V5M6-2%2CQ867Z4-3%2CQ7KQZ4-4%2CP42284-1%2CQ9V5M3-1%2CQ9V5M3-2%2CQ9V5M6-1%2CQ9V5M6-3%2CQ9V5M6-4%2CQ867Z4-5%2CP42284-2%2CQ9V5M3-3%2CQ9V5M3-4%2CQ9V5M3-5%2CQ9V5M6-5
// Retrieved: 2023-10-05
const mock: GenomicEntry[] = [
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
        fullName: 'Isoform V of Longitudinals lacking protein, isoforms H/M/V',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
        },
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E6',
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
        fullName:
          'Isoform B of Longitudinals lacking protein, isoforms A/B/D/L',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089343-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10505076,
          reverseStrand: true,
        },
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089343-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10505076,
          reverseStrand: true,
        },
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089342-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10520397,
          reverseStrand: true,
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089342-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10520397,
          reverseStrand: true,
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
        fullName:
          'Isoform I of Longitudinals lacking protein, isoforms F/I/K/T',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
        },
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
        },
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089359-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10510643,
          reverseStrand: true,
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089359-E6',
            },
          ],
          chromosome: '2R',
          start: 10533749,
          end: 10510643,
          reverseStrand: true,
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
        fullName:
          'Isoform P of Longitudinals lacking protein, isoforms J/P/Q/S/Z',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E6',
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
        },
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
              id: 'FBtr0089355-E2',
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
              id: 'FBtr0089355-E3',
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
              id: 'FBtr0089355-E4',
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
              id: 'FBtr0089355-E5',
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
