import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import { type EnrichedRelatedProteome } from '../../../adapters/proteomesConverter';
import SimilarProteomes from '../SimilarProteomes';

const sample: EnrichedRelatedProteome[] = [
  {
    proteomeId: 'UP000000001',
    similarity: 0.72,
    taxonomy: { taxonId: 11 },
    scientificName: 'Foo species',
  },
  {
    proteomeId: 'UP000000002',
    similarity: 0.91,
    taxonomy: { taxonId: 22 },
    scientificName: 'Bar species',
  },
];

describe('SimilarProteomes', () => {
  it('renders the reference-specific placeholder for a Reference proteome with no data', () => {
    customRender(<SimilarProteomes proteomeType="Reference proteome" />);
    expect(
      screen.getByText(
        /typically because the proteome is the only one for its species/
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/taxonomically undefined species/)
    ).not.toBeInTheDocument();
  });

  it('renders the generic placeholder for a Non Reference proteome with no data', () => {
    customRender(<SimilarProteomes proteomeType="Non-reference proteome" />);
    expect(
      screen.getByText(/No similar proteome is available for this proteome/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/taxonomically undefined species/)
    ).toBeInTheDocument();
  });

  it('renders the generic placeholder when relatedProteomes is empty', () => {
    customRender(
      <SimilarProteomes
        proteomeType="Non-reference proteome"
        relatedProteomes={[]}
      />
    );
    expect(
      screen.getByText(/No similar proteome is available for this proteome/)
    ).toBeInTheDocument();
  });

  it('renders an excluded-specific placeholder when proteomeType is Excluded', () => {
    customRender(
      <SimilarProteomes
        proteomeType="Excluded"
        exclusionReasons={['over-represented proteome']}
      />
    );
    expect(screen.getByText(/this proteome has been/)).toBeInTheDocument();
    expect(screen.getByText(/over-represented proteome/)).toBeInTheDocument();
    expect(
      screen.queryByText(/taxonomically undefined species/)
    ).not.toBeInTheDocument();
  });

  it('renders a row per related proteome, sorted by similarity desc', () => {
    customRender(
      <SimilarProteomes
        proteomeType="Non-reference proteome"
        relatedProteomes={sample}
      />
    );
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('UP000000002');
    expect(screen.getByText('91.0%')).toBeInTheDocument();
    expect(screen.getByText('72.0%')).toBeInTheDocument();
    expect(screen.getByText('Bar species')).toBeInTheDocument();
    expect(screen.getByText('Foo species')).toBeInTheDocument();
  });

  it('falls back to the taxon ID when scientificName is missing', () => {
    customRender(
      <SimilarProteomes
        proteomeType="Non-reference proteome"
        relatedProteomes={[
          {
            proteomeId: 'UP000000003',
            similarity: 0.5,
            taxonomy: { taxonId: 33 },
          },
        ]}
      />
    );
    expect(screen.getByRole('link', { name: '33' })).toBeInTheDocument();
  });
});
