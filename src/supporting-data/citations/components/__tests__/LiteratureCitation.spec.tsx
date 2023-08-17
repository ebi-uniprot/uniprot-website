import { screen, fireEvent } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import LiteratureCitation, { getLocatorUrl } from '../LiteratureCitation';

import { CitationsAPIModel } from '../../adapters/citationsConverter';

import literatureCitationData from '../__mocks__/literatureCitationData';

let rendered: ReturnType<typeof customRender>;

describe('Publication component', () => {
  beforeEach(() => {
    rendered = customRender(
      <LiteratureCitation data={literatureCitationData['14702039']} />
    );
  });

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should expand authors', async () => {
    expect(screen.queryByText('Ohara O.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show more' }));
    expect(screen.getByText('Ohara O.')).toBeInTheDocument();
  });

  it('should display 1 author', async () => {
    const mockData: CitationsAPIModel = {
      citation: {
        id: '14702039',
        authors: ['Smith X.'],
      },
    };
    rendered.rerender(<LiteratureCitation data={mockData} />);
    expect(screen.getByText('Smith X.')).toBeInTheDocument();
  });

  it('should expand abstract', async () => {
    expect(screen.queryByText(/noncoding cDNAs/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'View abstract' }));
    expect(screen.getByText(/noncoding cDNAs/)).toBeInTheDocument();
  });

  test('Publication component with submissionDatabase if present', () => {
    rendered.rerender(
      <LiteratureCitation data={literatureCitationData['CI-5GBDQ6B103N1E']} />
    );
    expect(screen.getByText(/Submitted to/)).toBeInTheDocument();
  });
});

describe('Publication component url', () => {
  test('Plant Gene Register', () => {
    const url = getLocatorUrl('PGR98-023', 'Plant Gene Register');
    expect(url).toEqual(
      'https://www.ebi.ac.uk/~textman/pgr-htdocs/pgr/PGR98-023.html'
    );
  });

  test("Worm Breeder's Gazette", () => {
    const url = getLocatorUrl('14(2):46', "Worm Breeder's Gazette");
    expect(url).toEqual('http://www.wormbook.org/wli/wbg14.2p46/');
  });

  test("Wrong locator for Worm Breeder's", () => {
    const url = getLocatorUrl('', "Worm Breeder's Gazette");
    expect(url).toBeNull();
  });
});
