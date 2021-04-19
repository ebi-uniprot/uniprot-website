import { CitationsAPIModel } from '../adapters/citationsConverter';

// data from /api/citations/search?query=nature&size=2
const mock: CitationsAPIModel[] = [
  {
    citation: {
      id: '10196735',
      citationType: 'UniProt indexed literatures',
      authors: ['Itoh M.', 'Kanamori Y.', 'Takao M.', 'Eguchi M.;'],
      citationCrossReferences: [
        { database: 'PubMed', id: '10196735' },
        { database: 'DOI', id: '10.1016/s0965-1748(98)00115-5' },
      ],
      title:
        'Cloning of soluble alkaline phosphatase cDNA and molecular basis of the\r polymorphic nature in alkaline phosphatase isozymes of Bombyx mori\r midgut."',
      publicationDate: '1999',
      journal: 'Insect Biochem Mol Biol',
      firstPage: '121',
      lastPage: '129',
      volume: '29',
      completeAuthorList: true,
      literatureAbstract:
        '\r \r \r A cDNA coding for soluble type alkaline phosphatase (sALP) of Bombyx mori was\r isolated. Deduced amino acid sequence showed high identities to various ALPs and\r partial similarities to ATPase of Manduca sexta. Using this cDNA sequence as a\r probe, the molecular basis of electrophoretic polymorphism in sALP and membrane-\r bound type ALP (mALP) was studied. As for mALP, the result suggested that post-\r translational modification was important for the proteins to express activity\r and to represent their extensive polymorphic nature, whereas the magnitude of\r activities was mainly regulated by transcription. On the other hand, sALP\r zymogram showed poor polymorphism, but one exception was the null mutant, in\r which the sALP gene was largely lost. Interestingly, the sALP gene was shown to\r be transcribed into two mRNAs of different sizes, 2.0 and 2.4 Kb. In addition to\r the null mutant of sALP, we found a null mutant for mALP. Both of these mutants\r seem phenotypically silent, suggesting that the functional differentiation\r between these isozymes is not perfect, so that they can still work mutually and\r complement each other as an indispensable enzyme for B. mori.\r',
    },
    statistics: {
      reviewedProteinCount: 0,
      unreviewedProteinCount: 1,
      computationallyMappedProteinCount: 0,
      communityMappedProteinCount: 0,
    },
  },
  {
    citation: {
      id: '10438823',
      citationType: 'UniProt indexed literatures',
      authors: ['McCullers J.A.', 'Wang G.C.', 'He S.', 'Webster R.G.;'],
      citationCrossReferences: [
        { database: 'PubMed', id: '10438823' },
        { database: 'DOI', id: '10.1128/jvi.73.9.7343-7348.1999' },
      ],
      title:
        'Reassortment and insertion-deletion are strategies for the evolution of\r influenza B viruses in nature."',
      publicationDate: '1999',
      journal: 'J Virol',
      firstPage: '7343',
      lastPage: '7348',
      volume: '73',
      completeAuthorList: true,
      literatureAbstract:
        '\r \r \r The evolution of influenza B viruses is poorly understood. Reassortment of\r influenza B viruses in nature as a means of genetic variation has not been\r considered to be a major contributor to their evolution. However, the current\r practice of assigning evolutionary relationships by antigenic analysis of the\r hemagglutinin of influenza B viruses would fail to detect reassortants. In this\r study, influenza B viruses isolated within the past 10 years from sites in the\r United States and China were studied by nucleotide sequencing of the\r hemagglutinin and neuraminidase genes and construction of phylogenetic trees to\r assess evolutionary relationships. A group of viruses represented by\r B/Houston/1/92 possess a hemagglutinin derived from a B/Yamagata/16/88-like\r strain and a neuraminidase derived from a B/Victoria/2/87-like strain. A second\r reassortment event between the hemagglutinin of a B/Yamagata/16/88-like virus\r closely related to the B/Beijing/184/93 strain and the neuraminidase of a\r B/Victoria/2/87-like strain is represented by a single virus, B/Memphis/3/93.\r The neuraminidase of the reassortant viruses is most closely related to that of\r B/Victoria/2/87-like viruses currently circulating in Nanchang, China. A pattern\r of insertions and deletions in the hemagglutinin and the neuraminidase of\r different strains of influenza B viruses is observed. Reassortment plays a role\r in the evolution of influenza B viruses and may necessitate a change in the\r methods used to assess and identify new influenza viruses.\r',
    },
    statistics: {
      reviewedProteinCount: 0,
      unreviewedProteinCount: 96,
      computationallyMappedProteinCount: 0,
      communityMappedProteinCount: 0,
    },
  },
];

export default mock;
