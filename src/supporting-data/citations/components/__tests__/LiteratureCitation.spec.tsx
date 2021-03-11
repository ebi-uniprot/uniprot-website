import { screen, fireEvent } from '@testing-library/react';

import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';
import LiteratureCitation from '../LiteratureCitation';
import literatureCitationData from '../__mocks__/literatureCitationData';

let rendered: ReturnType<typeof renderWithRouter>;

describe('Publication component', () => {
  beforeEach(async () => {
    rendered = renderWithRouter(
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

  test('should expand abstract', async () => {
    expect(screen.queryByText(/noncoding cDNAs/)).toBeNull();
    fireEvent.click(screen.getByText('View abstract [...]'));
    const abstract = await screen.findByText(/noncoding cDNAs/);
    expect(abstract).toBeTruthy();
  });
});
