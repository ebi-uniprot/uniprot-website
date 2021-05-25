import { screen, fireEvent } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import LiteratureCitation from '../LiteratureCitation';

import { CitationsAPIModel } from '../../adapters/citationsConverter';

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
    fireEvent.click(screen.getByRole('button', { name: 'Show more' }));
    expect(screen.getByText('Ohara O.')).toBeInTheDocument();
  });

  test('should display 1 author', async () => {
    const mockData: CitationsAPIModel = {
      citation: {
        id: '14702039',
        authors: ['Smith X.'],
      },
    };
    rendered.rerender(<LiteratureCitation data={mockData} />);
    expect(screen.getByText('Smith X.')).toBeInTheDocument();
  });

  test('should expand abstract', async () => {
    expect(screen.queryByText(/noncoding cDNAs/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'View abstract' }));
    expect(screen.getByText(/noncoding cDNAs/)).toBeInTheDocument();
  });
});
