import { screen } from '@testing-library/react';

import CommunityCuration from '../CommunityCuration';

import customRender from '../../../../shared/__test-helpers__/customRender';

import { Reference } from '../../../../supporting-data/citations/adapters/citationsConverter';
import EntrySection from '../../../types/entrySection';

const mock: Reference[] = [
  {
    source: {
      name: 'ORCID',
      id: '0000-0001-6057-9374',
    },
    citationId: '36301857',
    sourceCategories: [
      'Function',
      'Expression',
      'Interaction',
      'Subcellular Location',
    ],
    communityAnnotation: {
      proteinOrGene: 'Epicuticlin',
      function:
        'Disordered proteins organized in tandem repeats with molecular recognition features and tyrosine motifs (Pfam02756 and Pfam02757). The epicuticlins form the insoluble outermost layer of the cuticle and can interact with cuticular collagens.',
      comment:
        'The cDNA AJ408886 is one of several sequences of nematodes, which is now identified as forming the epicuticlin structure of nematodes.',
    },
  },
];

describe('Community annotatation', () => {
  it('should render the community annotation content', async () => {
    const { asFragment } = customRender(
      <CommunityCuration
        accession="Q95PB5"
        section={EntrySection.NamesAndTaxonomy}
        communityReferences={mock}
      />
    );
    expect(await screen.findByText('Epicuticlin')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
