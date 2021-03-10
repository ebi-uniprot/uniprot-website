import { screen, fireEvent } from '@testing-library/react';

import LiteratureCitation from '../LiteratureCitation';

import literatureCitationData from '../__mocks__/literatureCitationData';

import renderWithRouter from '../../../__test-helpers__/RenderWithRouter';
import { formatCitationData } from '../../../../supporting-data/citations/adapters/citationsConverter';

let rendered: ReturnType<typeof renderWithRouter>;

describe('Publication component', () => {
  beforeEach(async () => {
    const { citation, statistics } = literatureCitationData;
    const { title, authors, literatureAbstract } = citation;
    const { pubmedId, journalInfo } = formatCitationData(citation);

    rendered = renderWithRouter(
      <LiteratureCitation
        title={title}
        authors={authors}
        abstract={literatureAbstract}
        journalInfo={journalInfo}
        pubmedId={pubmedId}
        statistics={statistics}
      />
    );
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should expand authors', async () => {
    expect(screen.queryByText('Ohara O.')).toBeNull();
    fireEvent.click(screen.getByText('[...]'));
    const author = await screen.findByText('Ohara O.');
    expect(author).toBeTruthy();
  });

  test('should expand abstract', async () => {
    expect(screen.queryByText(/noncoding cDNAs/)).toBeNull();
    fireEvent.click(screen.getByText('View abstract [...]'));
    const abstract = await screen.findByText(/noncoding cDNAs/);
    expect(abstract).toBeTruthy();
  });
});
