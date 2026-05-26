import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import data from '../../../__mocks__/proteomesEntryModelData';
import proteomesConverter, {
  type ProteomesUIModel,
} from '../../../adapters/proteomesConverter';
import { PanProteome } from '../PanProteome';

describe('PanProteome', () => {
  it('should not render if no panproteomeTaxon', () => {
    const { container } = customRender(
      <PanProteome proteome={proteomesConverter(data)} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render species name and FASTA link when panproteomeTaxon matches taxonLineage', () => {
    const uiData = proteomesConverter(data);
    // taxonId 131567 ('cellular organisms') is present in the mock taxonLineage
    const customisedData: ProteomesUIModel = {
      ...uiData,
      panproteomeTaxon: { taxonId: 131567 },
    };
    customRender(<PanProteome proteome={customisedData} />);
    expect(screen.getByText(/cellular organisms/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'FASTA' })).toBeInTheDocument();
  });

  it('should not render when panproteomeTaxon taxonId is not found in taxonLineage', () => {
    const uiData = proteomesConverter(data);
    const customisedData: ProteomesUIModel = {
      ...uiData,
      panproteomeTaxon: { taxonId: 99999 },
    };
    const { container } = customRender(
      <PanProteome proteome={customisedData} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
