import { ProteomicsPtm } from '../types/proteomicsPtm';

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
                'PSM Score': '0.9997',
                'Dataset ID': 'PXD002222',
                'Organism part': 'Leaf',
                'Binomial final adjusted q_value': '0.045922419',
                'Universal Spectrum Id':
                  'mzspec:PXD002222:Rice_leaf_0h_phospho_test3.06648.06648.2:AAES[Phospho]DVNVSS[Phospho]PR/2',
                'PSM Count': '9',
                'Final adjusted site probability': '0.846743589',
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
                'PSM Score': '1',
                'Dataset ID': 'PXD004939',
                'Organism part': 'Leaf',
                'Binomial final adjusted q_value': '0.030906711',
                'Universal Spectrum Id':
                  'mzspec:PXD004939:Rice_phos_ABA_12h_20per_F1_R3.08788.08788.2:AAESDVNVSS[Phospho]PR/2',
                'PSM Count': '31',
                'Final adjusted site probability': '0.9195',
                'Site probability': '0.9195',
              },
            },
            {
              id: 'PXD004705',
              properties: {
                'Pubmed ID': '28439285',
                'PSM Score': '1',
                'Dataset ID': 'PXD004705',
                'Organism part': 'Leaf',
                'Binomial final adjusted q_value': '0.011462836',
                'Universal Spectrum Id':
                  'mzspec:PXD004705:Rice_phos_BR_12h_20per_F1_R3.08038.08038.2:AAESDVNVSS[Phospho]PR/2',
                'PSM Count': '31',
                'Final adjusted site probability': '0.9763',
                'Site probability': '0.9763',
              },
            },
            {
              id: 'PXD002222',
              properties: {
                'Pubmed ID': '26112675',
                'PSM Score': '0.9997',
                'Dataset ID': 'PXD002222',
                'Organism part': 'Leaf',
                'Binomial final adjusted q_value': '0.026956683',
                'Universal Spectrum Id':
                  'mzspec:PXD002222:Rice_leaf_0h_phospho_test2.05381.05381.2:AAESDVNVSS[Phospho]PR/2',
                'PSM Count': '5',
                'Final adjusted site probability': '0.920728568',
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
                'PSM Score': '0.9768',
                'Dataset ID': 'PXD012764',
                'Organism part': 'Root',
                'Binomial final adjusted q_value': '0.027506723',
                'Universal Spectrum Id':
                  'mzspec:PXD012764:P17540_180109014405.17507.17507.2:[iTRAQ8plex]AAESDVNVS[Phospho]S[Phospho]PR/2',
                'PSM Count': '9',
                'Final adjusted site probability': '0.935969356',
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
                'PSM Score': '0.9768',
                'Dataset ID': 'PXD012764',
                'Organism part': 'Root',
                'Binomial final adjusted q_value': '0.034642812',
                'Universal Spectrum Id':
                  'mzspec:PXD012764:P17540_180109014405.17507.17507.2:[iTRAQ8plex]AAESDVNVS[Phospho]S[Phospho]PR/2',
                'PSM Count': '4',
                'Final adjusted site probability': '0.912978736',
                'Site probability': '0.9582',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'PROTEOMICS_PTM',
      begin: '193',
      end: '205',
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
            id: 'LDKVENSGHVEGR',
            url: 'https://www.ebi.ac.uk/pride/peptidome/peptidedetails?keyword=LDKVENSGHVEGR&proteinAccession=Q653S1',
          },
        },
      ],
      peptide: 'LDKVENSGHVEGR',
      unique: true,
      ptms: [
        {
          name: 'Phosphorylation',
          position: 7,
          sources: ['PTMeXchange'],
          dbReferences: [
            {
              id: 'PXD004939',
              properties: {
                'Pubmed ID': '28054942',
                'PSM Score': '1',
                'Dataset ID': 'PXD004939',
                'Organism part': 'Leaf',
                'Binomial final adjusted q_value': '9.25E-10',
                'Universal Spectrum Id':
                  'mzspec:PXD004939:Rice_phos_ABA_12h_20per_F1_R3.04860.04860.2:LDKVENS[Phospho]GHVEGR/2',
                'PSM Count': '6',
                'Final adjusted site probability': '0.999999982',
                'Site probability': '1',
              },
            },
            {
              id: 'PXD005241',
              properties: {
                'Pubmed ID': '28382632',
                'PSM Score': '0.9796',
                'Dataset ID': 'PXD005241',
                'Organism part': 'Panicles',
                'Binomial final adjusted q_value': '0.022752762',
                'Universal Spectrum Id':
                  'mzspec:PXD005241:Rice_phos_mature_panicles__TiO2_25per_F3_R1_raw.08068.08068.2:LDKVENS[Phospho]GHVEGR/2',
                'PSM Count': '1',
                'Final adjusted site probability': '0.899024906',
                'Site probability': '1',
              },
            },
            {
              id: 'PXD004705',
              properties: {
                'Pubmed ID': '28439285',
                'PSM Score': '1',
                'Dataset ID': 'PXD004705',
                'Organism part': 'Leaf',
                'Binomial final adjusted q_value': '5.46E-12',
                'Universal Spectrum Id':
                  'mzspec:PXD004705:Rice_phos_Nip_0h_20per_F1_R1.04737.04737.2:LDKVENS[Phospho]GHVEGR/2',
                'PSM Count': '8',
                'Final adjusted site probability': '1',
                'Site probability': '1',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default data;
