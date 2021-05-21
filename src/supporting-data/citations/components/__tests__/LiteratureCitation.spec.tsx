import { screen, fireEvent } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import { CitationsAPIModel } from '../../adapters/citationsConverter';
import LiteratureCitation from '../LiteratureCitation';
import literatureCitationData from '../__mocks__/literatureCitationData';

let rendered: ReturnType<typeof customRender>;

describe('Publication component', () => {
  beforeEach(async () => {
    rendered = customRender(
      <LiteratureCitation data={literatureCitationData} />
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

  test('should display 1 author', async () => {
    const mockData: CitationsAPIModel = {
      citation: {
        id: '14702039',
        authors: ['Ota T.'],
      },
    };
    rendered = customRender(<LiteratureCitation data={mockData} />);
    const author = await screen.findByText('Ota T.');
    expect(author).toBeTruthy();
  });

  test('should expand abstract', async () => {
    expect(screen.queryByText(/noncoding cDNAs/)).toBeNull();
    fireEvent.click(screen.getByText('View abstract [...]'));
    const abstract = await screen.findByText(/noncoding cDNAs/);
    expect(abstract).toBeTruthy();
  });
});
