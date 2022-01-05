import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import { PanProteome } from '../PanProteome';

import proteomesConverter, {
  ProteomesUIModel,
} from '../../../adapters/proteomesConverter';

import data from '../../../__mocks__/proteomesEntryModelData';

describe('PanProteome', () => {
  it('should not render if no panproteome', () => {
    const { container } = customRender(
      <PanProteome proteome={proteomesConverter(data)} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render a link to FASTA, when is a panproteome', () => {
    const uiData = proteomesConverter(data);
    const customisedData: ProteomesUIModel = {
      ...uiData,
      panproteome: uiData.id,
    };
    const { asFragment } = customRender(
      <PanProteome proteome={customisedData} />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('link', { name: 'FASTA' })).toBeInTheDocument();
    expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      screen.getByText(customisedData.taxonomy.scientificName!, {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it('should render a link to entry and a link to FASTA, when is part of a panproteome', () => {
    // reuse the same mock as proteome and related panproteome (with a different id)
    const uiData = proteomesConverter(data, { ...data, id: 'UP1' });
    const { asFragment } = customRender(<PanProteome proteome={uiData} />);
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('link', { name: 'FASTA' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: uiData.taxonomy.scientificName })
    ).toBeInTheDocument();
  });
});
