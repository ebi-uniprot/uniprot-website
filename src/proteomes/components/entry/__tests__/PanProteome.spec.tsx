import { renderHook, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../shared/hooks/useDataApi';
import data from '../../../__mocks__/proteomesEntryModelData';
import proteomesConverter, {
  type ProteomesUIModel,
} from '../../../adapters/proteomesConverter';
import { PanProteome, usePanProteomePreview } from '../PanProteome';

jest.mock('../../../../shared/hooks/useDataApi');

const mockUseDataApi = useDataApi as jest.Mock;

// The mock proteome (Homo sapiens) has no species-rank entry in its lineage, so
// the species falls back to its own taxon (9606).
const proteomeOwnTaxonSpecies = (): ProteomesUIModel =>
  proteomesConverter(data);

// A strain-level proteome whose pan proteome lives at the species-rank ancestor.
const proteomeWithSpeciesLineage = (): ProteomesUIModel => ({
  ...proteomesConverter(data),
  taxonLineage: [
    ...data.taxonLineage,
    {
      taxonId: 9,
      rank: 'species',
      scientificName: 'Buchnera aphidicola',
    },
  ],
});

describe('usePanProteomePreview', () => {
  beforeEach(() => {
    mockUseDataApi.mockReturnValue({ loading: false, status: 200 });
  });

  afterEach(() => {
    mockUseDataApi.mockReset();
  });

  it("uses the organism's own taxon when there is no species-rank ancestor", () => {
    const { result } = renderHook(() =>
      usePanProteomePreview(proteomeOwnTaxonSpecies())
    );
    expect(result.current?.scientificName).toBe('Homo sapiens');
    expect(result.current?.fastaUrl).toBe(
      'https://ftp.ebi.ac.uk/pub/contrib/insana/pan_proteomes_preview/pp9606/pp9606.fa.gz'
    );
  });

  it('uses the species-rank ancestor when the organism is below species', () => {
    const { result } = renderHook(() =>
      usePanProteomePreview(proteomeWithSpeciesLineage())
    );
    expect(result.current?.scientificName).toBe('Buchnera aphidicola');
    expect(result.current?.fastaUrl).toContain('pp9/pp9.fa.gz');
  });

  it('returns undefined when the preview directory is absent (HEAD 404)', () => {
    mockUseDataApi.mockReturnValue({
      loading: false,
      status: 404,
      error: { response: { status: 404 } },
    });
    const { result } = renderHook(() =>
      usePanProteomePreview(proteomeOwnTaxonSpecies())
    );
    expect(result.current).toBeUndefined();
  });

  it('returns undefined while the preview HEAD is loading', () => {
    mockUseDataApi.mockReturnValue({ loading: true });
    const { result } = renderHook(() =>
      usePanProteomePreview(proteomeOwnTaxonSpecies())
    );
    expect(result.current).toBeUndefined();
  });
});

describe('PanProteome', () => {
  it('renders the species name and FASTA link', () => {
    customRender(
      <PanProteome
        scientificName="Buchnera aphidicola"
        fastaUrl="https://example.org/pp9/pp9.fa.gz"
      />
    );
    expect(
      screen.getByText(/part of the Buchnera aphidicola pan proteome/)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'FASTA' })).toHaveAttribute(
      'href',
      'https://example.org/pp9/pp9.fa.gz'
    );
  });
});
