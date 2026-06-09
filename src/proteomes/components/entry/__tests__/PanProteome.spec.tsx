import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import { PanProteome } from '../PanProteome';

const taxonomy = { taxonId: 9606, scientificName: 'Homo sapiens' };

describe('PanProteome', () => {
  it('falls back to taxonomy when no species-rank lineage entry matches', () => {
    customRender(
      <PanProteome
        panproteomeTaxon={{ taxonId: 9606 }}
        taxonLineage={[]}
        taxonomy={taxonomy}
      />
    );
    // The species name + "pan proteome" links to the browseable FTP folder.
    expect(
      screen.getByRole('link', { name: /Homo sapiens pan proteome/ })
    ).toHaveAttribute(
      'href',
      'https://ftp.ebi.ac.uk/pub/contrib/insana/pan_proteomes_preview/pp9606/'
    );
  });

  it('uses the matching species-rank lineage entry', () => {
    customRender(
      <PanProteome
        panproteomeTaxon={{ taxonId: 562 }}
        taxonLineage={[
          {
            taxonId: 562,
            rank: 'species',
            scientificName: 'Escherichia coli',
            hidden: false,
          },
        ]}
        taxonomy={taxonomy}
      />
    );
    expect(
      screen.getByRole('link', { name: /Escherichia coli pan proteome/ })
    ).toHaveAttribute(
      'href',
      'https://ftp.ebi.ac.uk/pub/contrib/insana/pan_proteomes_preview/pp562/'
    );
  });
});
