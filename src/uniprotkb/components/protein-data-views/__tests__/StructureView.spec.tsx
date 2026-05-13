import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  type ProcessedStructureData,
  type ProtvistaUniprotStructure,
} from 'protvista-uniprot';

import customRender from '../../../../shared/__test-helpers__/customRender';
import StructureView from '../StructureView';

const pdbStructure: ProcessedStructureData = {
  id: '5R7Y',
  source: 'PDB',
  method: 'X-ray',
  resolution: '2.5 A',
  chain: 'A',
  positions: '1-100',
  protvistaFeatureId: 'feat-1',
};

const alphaFoldStructure: ProcessedStructureData = {
  id: 'AF-P12345-F1-model_v4',
  source: 'AlphaFold DB',
  method: 'Predicted',
  protvistaFeatureId: 'feat-2',
  downloadUrl: 'https://alphafold.ebi.ac.uk/files/AF-P12345-F1-model_v4.pdb',
};

function fireStructuresLoaded(structures: ProcessedStructureData[]) {
  const el = document.querySelector('protvista-uniprot-structure');
  if (!el) {
    throw new Error('protvista-uniprot-structure not found');
  }
  (el as unknown as ProtvistaUniprotStructure).selectedId = structures[0]?.id;
  act(() => {
    el.dispatchEvent(
      new CustomEvent('structures-loaded', {
        detail: structures,
        bubbles: true,
        composed: true,
      })
    );
  });
}

describe('StructureView', () => {
  it('shows no table before structures-loaded fires', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders the custom element with the accession attribute', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    const el = document.querySelector('protvista-uniprot-structure');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('accession', 'P12345');
  });

  it('renders the Feature Viewer message when primaryAccession is set and not viewerOnly', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    expect(
      screen.getByRole('link', { name: 'Feature Viewer' })
    ).toBeInTheDocument();
  });

  it('hides the Feature Viewer message when viewerOnly', () => {
    customRender(<StructureView primaryAccession="P12345" viewerOnly />, {
      route: '/uniprotkb/P12345/entry',
    });
    expect(
      screen.queryByRole('link', { name: 'Feature Viewer' })
    ).not.toBeInTheDocument();
  });

  it('renders the table after structures-loaded fires', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([pdbStructure]);
    expect(screen.getByRole('cell', { name: '5R7Y' })).toBeInTheDocument();
  });

  it('replaces "A" with "Å" in the resolution column', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([pdbStructure]);
    expect(screen.getByRole('cell', { name: '2.5 Å' })).toBeInTheDocument();
  });

  it('renders PDB external links', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([pdbStructure]);
    expect(screen.getByRole('link', { name: /PDBe/i })).toHaveAttribute(
      'href',
      'https://www.ebi.ac.uk/pdbe-srv/view/entry/5R7Y'
    );
    expect(screen.getByRole('link', { name: /RCSB-PDB/i })).toHaveAttribute(
      'href',
      'https://www.rcsb.org/structure/5R7Y'
    );
  });

  it('renders AlphaFold DB link and Foldseek link', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([alphaFoldStructure]);
    expect(screen.getByRole('link', { name: /AlphaFold DB/i })).toHaveAttribute(
      'href',
      'https://alphafold.ebi.ac.uk/entry/P12345'
    );
    expect(screen.getByRole('link', { name: /Foldseek/i })).toHaveAttribute(
      'href',
      'https://search.foldseek.com/search?accession=P12345&source=AlphaFoldDB'
    );
  });

  it('renders a Source download link with the download icon', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([alphaFoldStructure]);
    const sourceLink = screen.getByRole('link', { name: /Source/i });
    expect(sourceLink).toHaveAttribute('href', alphaFoldStructure.downloadUrl);
  });

  it('hides the table when viewerOnly, even after structures-loaded', () => {
    customRender(<StructureView primaryAccession="P12345" viewerOnly />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([pdbStructure]);
    expect(
      screen.queryByRole('cell', { name: '5R7Y' })
    ).not.toBeInTheDocument();
  });

  it('marks the selected row after a row click', async () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([pdbStructure, alphaFoldStructure]);

    const afRow = screen
      .getAllByRole('row')
      .find((r) => r.textContent?.includes('AF-P12345'));
    if (!afRow) {
      throw new Error('AlphaFold row not found');
    }
    await userEvent.click(afRow);

    // After click the element's selectedId should be updated
    const el = document.querySelector(
      'protvista-uniprot-structure'
    ) as unknown as ProtvistaUniprotStructure;
    expect(el.selectedId).toBe(alphaFoldStructure.id);
  });

  it('shows the Isoform column when isoforms prop is provided', () => {
    const isoforms = [{ isoformId: 'P12345-2', sequence: 'MKVL' }];
    customRender(
      <StructureView primaryAccession="P12345" isoforms={isoforms} />,
      { route: '/uniprotkb/P12345/entry' }
    );
    fireStructuresLoaded([
      { ...pdbStructure, isoformId: 'P12345-2', isoformIsCanonical: false },
    ]);
    expect(
      screen.getByRole('columnheader', { name: 'Isoform' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'P12345-2' })).toBeInTheDocument();
  });

  it('does not show the Isoform column without isoforms prop', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([pdbStructure]);
    expect(
      screen.queryByRole('columnheader', { name: 'Isoform' })
    ).not.toBeInTheDocument();
  });

  it('shows an empty-state message when structures-loaded fires with []', () => {
    customRender(<StructureView primaryAccession="P12345" />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([]);
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(
      screen.getByText(/No structure information available for P12345/i)
    ).toBeInTheDocument();
  });

  it('does not show the empty-state message in viewerOnly mode', () => {
    customRender(<StructureView primaryAccession="P12345" viewerOnly />, {
      route: '/uniprotkb/P12345/entry',
    });
    fireStructuresLoaded([]);
    expect(
      screen.queryByText(/No structure information available/i)
    ).not.toBeInTheDocument();
  });
});
