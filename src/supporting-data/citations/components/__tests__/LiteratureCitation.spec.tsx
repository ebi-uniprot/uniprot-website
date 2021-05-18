import { screen, fireEvent } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import LiteratureCitation from '../LiteratureCitation';

import literatureCitationData from '../__mocks__/literatureCitationData';

let rendered: ReturnType<typeof customRender>;

describe('Publication component', () => {
  beforeEach(() => {
    rendered = customRender(
      <LiteratureCitation data={literatureCitationData} />
    );
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should expand authors', async () => {
    expect(screen.queryByText('Ohara O.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('[...]'));
    const author = await screen.findByText('Ohara O.');
    expect(author).toBeInTheDocument();
  });

  test('should expand abstract', async () => {
    expect(screen.queryByText(/noncoding cDNAs/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('View abstract [...]'));
    const abstract = await screen.findByText(/noncoding cDNAs/);
    expect(abstract).toBeInTheDocument();
  });
});
