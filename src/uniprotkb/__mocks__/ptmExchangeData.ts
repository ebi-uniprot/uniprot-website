import { ProteomicsPtm } from '../types/proteomicsPtm';

// Source: https://www.ebi.ac.uk/proteins/api/proteomics-ptm/Q653S1
// Retrieved: 2022-09-06
// TODO: replace this with a human entry when it is released
const data: ProteomicsPtm = {
  accession: 'Q653S1',
  entryName: 'Q653S1_ORYSJ',
  sequence:
    'MDALPDAADAAQLAAAAAPPQKRDEWSESGIVRLLEAYEAKWLLRNRAKLKWSDWVDIAHEVSAHCAMENAAATGKPGSSTAKTPNQCKNKIESMKKRYRAESAAAARAGPAAAGAGPSWRFFARMDGLLKGPAGSGQPQAELSNSIDLRAPPPAKVEVDVDADFVSQLADAGPGALSELVSAYANGSIQEKLDKVENSGHVEGRAAESDVNVSSPRIKEANEDAEEVDKVWDMSKKRKNTEFDIAKSIELLASSFLKIERARMDLYRETERMRVEAEIKKGEMELKRTEIMAKTHLQIAKLFAKRLKECSSKTGGSSSVTAEVDNHAKKGENGSG',
  sequenceChecksum: 'AC2FA51B39804EF9',
  taxid: 39947,
  features: [
    {
      type: 'PROTEOMICS_PTM',
      begin: '206',
      end: '217',
      xrefs: [
        {
          name: 'Proteomes',
          id: 'UP000059680',
          url: 'https://www.uniprot.org/proteomes/UP000059680',
        },
      ],
      evidences: [
        {
          code: 'ECO:0007829',
          source: {
            id: 'AAESDVNVSSPR',
            url: 'https://www.ebi.ac.uk/pride/peptidome/peptidedetails?keyword=AAESDVNVSSPR&proteinAccession=Q653S1',
          },
        },
      ],
      peptide: 'AAESDVNVSSPR',
      unique: true,
      ptms: [
        {
          name: 'Phosphorylation',
          position: 4,
          sources: ['PTMeXchange'],
          dbReferences: [
            {
              id: 'PXD002222',
              properties: {
                'Pubmed ID': '26112675',
                'Confidence score': 'Bronze',
                'PSM Score': '0.9997',
                'Dataset ID': 'PXD002222',
                'Binomial final q value': '0.04592241907878227',
                'Universal Spectrum Id':
                  'mzspec:PXD002222:Rice_leaf_0h_phospho_test3:scan:06648:AAES[Phospho]DVNVSS[Phospho]PR/2',
                'PSM Count': '9',
                'Site probability': '0.847',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'PROTEOMICS_PTM',
      begin: '206',
      end: '217',
      xrefs: [
        {
          name: 'Proteomes',
          id: 'UP000059680',
          url: 'https://www.uniprot.org/proteomes/UP000059680',
        },
      ],
      evidences: [
        {
          code: 'ECO:0007829',
          source: {
            id: 'AAESDVNVSSPR',
            url: 'https://www.ebi.ac.uk/pride/peptidome/peptidedetails?keyword=AAESDVNVSSPR&proteinAccession=Q653S1',
          },
        },
      ],
      peptide: 'AAESDVNVSSPR',
      unique: true,
      ptms: [
        {
          name: 'Phosphorylation',
          position: 10,
          sources: ['PTMeXchange'],
          dbReferences: [
            {
              id: 'PXD004939',
              properties: {
                'Pubmed ID': '28054942',
                'Confidence score': 'Bronze',
                'PSM Score': '1.0',
                'Dataset ID': 'PXD004939',
                'Binomial final q value': '0.03090671081048205',
                'Universal Spectrum Id':
                  'mzspec:PXD004939:Rice_phos_ABA_12h_20per_F1_R3:scan:08788:AAESDVNVSS[Phospho]PR/2',
                'PSM Count': '31',
                'Site probability': '0.9195',
              },
            },
            {
              id: 'PXD004705',
              properties: {
                'Pubmed ID': '28439285',
                'Confidence score': 'Bronze',
                'PSM Score': '1.0',
                'Dataset ID': 'PXD004705',
                'Binomial final q value': '0.011462835656555523',
                'Universal Spectrum Id':
                  'mzspec:PXD004705:Rice_phos_BR_12h_20per_F1_R3:scan:08038:AAESDVNVSS[Phospho]PR/2',
                'PSM Count': '31',
                'Site probability': '0.9763',
              },
            },
            {
              id: 'PXD002222',
              properties: {
                'Pubmed ID': '26112675',
                'Confidence score': 'Bronze',
                'PSM Score': '0.9997',
                'Dataset ID': 'PXD002222',
                'Binomial final q value': '0.026956683114549247',
                'Universal Spectrum Id':
                  'mzspec:PXD002222:Rice_leaf_0h_phospho_test2:scan:05381:AAESDVNVSS[Phospho]PR/2',
                'PSM Count': '5',
                'Site probability': '0.9285',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'PROTEOMICS_PTM',
      begin: '206',
      end: '217',
      xrefs: [
        {
          name: 'Proteomes',
          id: 'UP000059680',
          url: 'https://www.uniprot.org/proteomes/UP000059680',
        },
      ],
      evidences: [
        {
          code: 'ECO:0007829',
          source: {
            id: 'AAESDVNVSSPR',
            url: 'https://www.ebi.ac.uk/pride/peptidome/peptidedetails?keyword=AAESDVNVSSPR&proteinAccession=Q653S1',
          },
        },
      ],
      peptide: 'AAESDVNVSSPR',
      unique: true,
      ptms: [
        {
          name: 'Phosphorylation',
          position: 9,
          sources: ['PTMeXchange'],
          dbReferences: [
            {
              id: 'PXD012764',
              properties: {
                'Pubmed ID': '31424513',
                'Confidence score': 'Bronze',
                'PSM Score': '0.9768',
                'Dataset ID': 'PXD012764',
                'Binomial final q value': '0.02750672317530977',
                'Universal Spectrum Id':
                  'mzspec:PXD012764:P17540_180109014405:scan:17507:[iTRAQ8plex]AAESDVNVS[Phospho]S[Phospho]PR/2',
                'PSM Count': '9',
                'Site probability': '0.9582',
              },
            },
          ],
        },
        {
          name: 'Phosphorylation',
          position: 10,
          sources: ['PTMeXchange'],
          dbReferences: [
            {
              id: 'PXD012764',
              properties: {
                'Pubmed ID': '31424513',
                'Confidence score': 'Bronze',
                'PSM Score': '0.9768',
                'Dataset ID': 'PXD012764',
                'Binomial final q value': '0.03464281201761908',
                'Universal Spectrum Id':
                  'mzspec:PXD012764:P17540_180109014405:scan:17507:[iTRAQ8plex]AAESDVNVS[Phospho]S[Phospho]PR/2',
                'PSM Count': '4',
                'Site probability': '0.9582',
              },
            },
          ],
        },
      ],
    },
  ],
};
export default data;
