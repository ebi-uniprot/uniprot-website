import { type SearchResults } from '../../../shared/types/results';
import { type CitationsAPIModel } from '../adapters/citationsConverter';

// Source: citations/search?query=nature&size=2
// Retrieved: 2026-06-03
const mock: SearchResults<CitationsAPIModel> = {
  results: [
    {
      citation: {
        id: '12366374',
        citationType: 'UniProt indexed literatures',
        authors: ['Griffin M.', 'Casadio R.', 'Bergamini C.M.'],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '12366374',
          },
          {
            database: 'DOI',
            id: '10.1042/bj20021234',
          },
        ],
        title: "Transglutaminases: nature's biological glues.",
        publicationDate: '2002',
        journal: 'Biochem J',
        firstPage: '377',
        lastPage: '396',
        volume: '368',
        completeAuthorList: true,
        literatureAbstract:
          'Transglutaminases (Tgases) are a widely distributed group of enzymes that catalyse the post-translational modification of proteins by the formation of isopeptide bonds. This occurs either through protein cross-linking via epsilon- (gamma-glutamyl)lysine bonds or through incorporation of primary amines at selected peptide-bound glutamine residues. The cross-linked products, often of high molecular mass, are highly resistant to mechanical challenge and proteolytic degradation, and their accumulation is found in a number of tissues and processes where such properties are important, including skin, hair, blood clotting and wound healing. However, deregulation of enzyme activity generally associated with major disruptions in cellular homoeostatic mechanisms has resulted in these enzymes contributing to a number of human diseases, including chronic neurodegeneration, neoplastic diseases, autoimmune diseases, diseases involving progressive tissue fibrosis and diseases related to the epidermis of the skin. In the present review we detail the structural and regulatory features important in mammalian Tgases, with particular focus on the ubiquitous type 2 tissue enzyme. Physiological roles and substrates are discussed with a view to increasing and understanding the pathogenesis of the diseases associated with transglutaminases. Moreover the ability of these enzymes to modify proteins and act as biological glues has not gone unnoticed by the commercial sector. As a consequence, we have included some of the present and future biotechnological applications of this increasingly important group of enzymes.',
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
        id: '22303823',
        citationType: 'UniProt indexed literatures',
        authors: [
          'Sakai K.',
          'Imamoto Y.',
          'Su C.Y.',
          'Tsukamoto H.',
          'Yamashita T.',
          'Terakita A.',
          'Yau K.W.',
          'Shichida Y.',
        ],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '22303823',
          },
          {
            database: 'DOI',
            id: '10.1021/bi2018283',
          },
        ],
        title: 'Photochemical nature of parietopsin.',
        publicationDate: '2012',
        journal: 'Biochemistry',
        firstPage: '1933',
        lastPage: '1941',
        volume: '51',
        completeAuthorList: true,
        literatureAbstract:
          'Parietopsin is a nonvisual green light-sensitive opsin closely related to vertebrate visual opsins and was originally identified in lizard parietal eye photoreceptor cells. To obtain insight into the functional diversity of opsins, we investigated by UV-visible absorption spectroscopy the molecular properties of parietopsin and its mutants exogenously expressed in cultured cells and compared the properties to those of vertebrate and invertebrate visual opsins. Our mutational analysis revealed that the counterion in parietopsin is the glutamic acid (Glu) in the second extracellular loop, corresponding to Glu181 in bovine rhodopsin. This arrangement is characteristic of invertebrate rather than vertebrate visual opsins. The photosensitivity and the molar extinction coefficient of parietopsin were also lower than those of vertebrate visual opsins, features likewise characteristic of invertebrate visual opsins. On the other hand, irradiation of parietopsin yielded meta-I, meta-II, and meta-III intermediates after batho and lumi intermediates, similar to vertebrate visual opsins. The pH-dependent equilibrium profile between meta-I and meta-II intermediates was, however, similar to that between acid and alkaline metarhodopsins in invertebrate visual opsins. Thus, parietopsin behaves as an "evolutionary intermediate" between invertebrate and vertebrate visual opsins.',
      },
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 1,
        computationallyMappedProteinCount: 0,
        communityMappedProteinCount: 0,
      },
    },
  ],
};

export default mock.results;
