import { type SearchResults } from '../../../shared/types/results';
import { type CitationsAPIModel } from '../adapters/citationsConverter';

// Source: citations/search?query=nature&size=2
// Retrieved: 2026-01-26
const mock: SearchResults<CitationsAPIModel> = {
  results: [
    {
      citation: {
        id: 'CI-7TL41NBKJTRQJ',
        citationType: 'submission',
        authors: ['Wang J.', 'Liu S.J.', 'Xiao J.'],
        title: 'Nature gynogenetic fish.',
        publicationDate: 'DEC-2007',
        submissionDatabase: 'EMBL/GenBank/DDBJ databases',
      },
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 2,
        computationallyMappedProteinCount: 0,
        communityMappedProteinCount: 0,
      },
    },
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
  ],
};

export default mock.results;
