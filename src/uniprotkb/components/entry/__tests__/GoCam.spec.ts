import { GoCamModelInfo } from '../../../types/goCamTypes';
import { getGoCamStructures, isUniprotCurated } from '../GoCam';

describe('getGoCamStructures', () => {
  it('should get GO-CAM structures', () => {
    const allGoCamIdsResponse = [
      {
        gocam: 'http://model.geneontology.org/66b5638000002630',
        title: 'GRIM1 activates GRID1 via GNAQ in dopamine neurons (Human).',
      },
      {
        gocam: 'http://model.geneontology.org/66c7d41500000057',
        title: 'GRID1 acts as GABA receptor. (Human)',
      },
    ];

    const goCamIdToItem = new Map([
      [
        '66b5638000002630',
        {
          id: '66b5638000002630',
          label: 'GRIM1 activates GRID1 via GNAQ in dopamine neurons (Human).',
        },
      ],
      [
        '66c7d41500000057',
        {
          id: '66c7d41500000057',
          label: 'GRID1 acts as GABA receptor. (Human)',
        },
      ],
    ]);
    expect(getGoCamStructures(allGoCamIdsResponse)).toEqual(goCamIdToItem);
  });
});

describe('isUniprotCurated', () => {
  it('should determine if a GO-CAM model is UniProt curated', () => {
    const goCamModelInfo: {
      id: string;
      data: GoCamModelInfo;
    }[] = [
      {
        id: '5fce9b7300002436',
        data: {
          id: 'gomodel:5fce9b7300002436',
          individuals: [],
          facts: [],
          annotations: [
            {
              key: 'state',
              value: 'production',
            },
            {
              key: 'contributor',
              value: 'https://orcid.org/0000-0001-7646-0052',
            },
            {
              key: 'contributor',
              value: 'https://orcid.org/0000-0001-8769-177X',
            },
            {
              key: 'date',
              value: '2024-05-29',
            },
            {
              key: 'title',
              value: 'TREM2 activated by APP',
            },
            {
              key: 'providedBy',
              value: 'https://www.uniprot.org',
            },
            {
              key: 'https://w3id.org/biolink/vocab/in_taxon',
              value: 'NCBITaxon:9606',
              'value-type': 'IRI',
            },
          ],
        },
      },
      {
        id: 'SYNGO_2279',
        data: {
          id: 'gomodel:SYNGO_2279',
          individuals: [],
          facts: [],
          annotations: [
            {
              key: 'state',
              value: 'production',
            },
            {
              key: 'contributor',
              value: 'https://orcid.org/0000-0001-7351-8706',
            },
            {
              key: 'contributor',
              value: 'https://orcid.org/0000-0002-0755-5899',
            },
            {
              key: 'contributor',
              value: 'https://orcid.org/0000-0003-0938-8534',
            },
            {
              key: 'contributor',
              value: 'https://orcid.org/0000-0003-3185-5709',
            },
            {
              key: 'date',
              value: '2018-02-09',
            },
            {
              key: 'title',
              value: 'SYNGO_BP_2279',
            },
            {
              key: 'providedBy',
              value: 'https://syngo.vu.nl',
            },
            {
              key: 'comment',
              value:
                'Rationale: APP has been ascribed many processes. This paper performs cell specific knockouts to identify a role for APP as a synaptic organizer molecule. In a reduced system utilizing the recombinant HEK cell expression of APP and neuronal co-culture the work shows the recruitment of APP and synaptic markers into juxtaposition (Figure 6 and 7) to mechanistically explain deficits in synapse formation.. Experimental description: Dissociated neurons are of mouse species: "Briefly, primary hippocampal cultures were prepared from postnatal day 0 (P0) of C57BL/6J mice"\n\nFrom material and methods. The human full length APP (695 form) ...........were described by Wang et al (2007).',
            },
            {
              key: 'https://w3id.org/biolink/vocab/in_taxon',
              value: 'http://purl.obolibrary.org/obo/NCBITaxon_9606',
            },
          ],
        },
      },
    ];

    expect(
      goCamModelInfo
        .filter(({ data }) => isUniprotCurated(data))
        .map(({ id }) => id)
    ).toEqual(['5fce9b7300002436']);
  });
});
