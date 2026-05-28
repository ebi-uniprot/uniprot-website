import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../shared/hooks/useDataApi';
import data from '../../../__mocks__/proteomesEntryModelData';
import proteomesConverter, {
  type ProteomesUIModel,
} from '../../../adapters/proteomesConverter';
import { PanProteome } from '../PanProteome';

jest.mock('../../../../shared/hooks/useDataApi');

const mockUseDataApi = useDataApi as jest.Mock;

const proteomeWithPanProteome = (): ProteomesUIModel => ({
  ...proteomesConverter(data),
  // taxonId 131567 ('cellular organisms') is present in the mock taxonLineage
  panproteomeTaxon: { taxonId: 131567 },
});

describe('PanProteome', () => {
  beforeEach(() => {
    mockUseDataApi.mockReturnValue({ loading: false, status: 200 });
  });

  afterEach(() => {
    mockUseDataApi.mockReset();
  });

  it('should not render if no panproteomeTaxon', () => {
    const { container } = customRender(
      <PanProteome proteome={proteomesConverter(data)} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render species name and FASTA link when HEAD request succeeds', () => {
    customRender(<PanProteome proteome={proteomeWithPanProteome()} />);
    expect(screen.getByText(/cellular organisms/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'FASTA' })).toBeInTheDocument();
  });

  it('should render species name but no link when HEAD request returns 404', () => {
    mockUseDataApi.mockReturnValue({
      loading: false,
      status: 404,
      error: { response: { status: 404 } },
    });
    customRender(<PanProteome proteome={proteomeWithPanProteome()} />);
    expect(screen.getByText(/cellular organisms/)).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'FASTA' })
    ).not.toBeInTheDocument();
  });

  it('should render species name but no link while the HEAD request is loading', () => {
    mockUseDataApi.mockReturnValue({ loading: true });
    customRender(<PanProteome proteome={proteomeWithPanProteome()} />);
    expect(screen.getByText(/cellular organisms/)).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'FASTA' })
    ).not.toBeInTheDocument();
  });

  it('should not render when panproteomeTaxon taxonId is not found in taxonLineage', () => {
    const customisedData: ProteomesUIModel = {
      ...proteomesConverter(data),
      panproteomeTaxon: { taxonId: 99999 },
    };
    const { container } = customRender(
      <PanProteome proteome={customisedData} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
