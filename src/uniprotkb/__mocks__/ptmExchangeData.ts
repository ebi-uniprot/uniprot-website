import { ProteomicsPtm } from '../types/proteomicsPtm';

// Source: https://www.ebi.ac.uk/proteins/api/proteomics/ptm/Q653S1
// Retrieved: 2025-10-15
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
            url: 'https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/GetPeptide?atlas_build_id=539&action=QUERY&searchWithinThis=Peptide+Sequence&searchForThis=AAESDVNVSSPR',
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
                'Confidence score': 'Silver',
                'PSM Score': '1.0',
                'Site q value': '0.0324160029004621',
                'Dataset ID': 'PXD004939',
                'Universal Spectrum Id':
                  'mzspec:PXD004939:Rice_phos_ABA_12h_20per_F1_R3:scan:08788:AAESDVNVSS[Phospho]PR/2',
                'Final site probability': '0.8635',
                'PSM Count (0.05 gFLR)': '9',
                Proforma: 'AAESDVNVSS[Phospho]PR',
              },
            },
            {
              id: 'PXD004705',
              properties: {
                'Pubmed ID': '28439285',
                'Confidence score': 'Silver',
                'PSM Score': '1.0',
                'Site q value': '0.0013287411370464',
                'Dataset ID': 'PXD004705',
                'Universal Spectrum Id':
                  'mzspec:PXD004705:Rice_phos_BR_12h_20per_F1_R3:scan:08038:AAESDVNVSS[Phospho]PR/2',
                'Final site probability': '0.9609',
                'PSM Count (0.05 gFLR)': '11',
                Proforma: 'AAESDVNVSS[Phospho]PR',
              },
            },
            {
              id: 'PXD002756',
              properties: {
                'Pubmed ID': '26360816',
                'Confidence score': 'Silver',
                'PSM Score': '0.9992',
                'Site q value': '0.0402428485463762',
                'Dataset ID': 'PXD002756',
                'Universal Spectrum Id':
                  'mzspec:PXD002756:Orbi00853XM-Yej-Rice-Anthor-T-1:scan:10162:AAESDVNVSS[Phospho]PR/2',
                'Final site probability': '0.802210443499118',
                'PSM Count (0.05 gFLR)': '2',
                Proforma: 'AAESDVNVSS[Phospho]PR',
              },
            },
            {
              id: 'PXD002222',
              properties: {
                'Pubmed ID': '26112675',
                'Confidence score': 'Silver',
                'PSM Score': '1.0',
                'Site q value': '0.031388089336716',
                'Dataset ID': 'PXD002222',
                'Universal Spectrum Id':
                  'mzspec:PXD002222:Rice_leaf_0h_phospho_test2:scan:05381:AAESDVNVSS[Phospho]PR/2',
                'Final site probability': '0.8804908973614423',
                'PSM Count (0.05 gFLR)': '2',
                Proforma: 'AAESDVNVSS[Phospho]PR',
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
            url: 'https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/GetPeptide?atlas_build_id=539&action=QUERY&searchWithinThis=Peptide+Sequence&searchForThis=AAESDVNVSSPR',
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
              id: 'PXD019291',
              properties: {
                'Pubmed ID': '33658224',
                'Confidence score': 'Silver',
                'PSM Score': '1.0',
                'Site q value': '0.0331830606553421',
                'Dataset ID': 'PXD019291',
                'Universal Spectrum Id':
                  'mzspec:PXD019291:S9588TPST_Fr4:scan:12375:[TMT6plex]AAESDVNVSS[Phospho]PR/3',
                'Final site probability': '0.7701361874966861',
                'PSM Count (0.05 gFLR)': '1',
                Proforma: '[TMT6plex]AAESDVNVSS[Phospho]PR',
              },
            },
          ],
        },
      ],
    },
  ],
};
export default data;
