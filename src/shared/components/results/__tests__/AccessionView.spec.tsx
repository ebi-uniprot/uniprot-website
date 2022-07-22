import { screen } from '@testing-library/react';
import { Namespace } from '../../../types/namespaces';

import customRender from '../../../__test-helpers__/customRender';

import AccessionView from '../AccessionView';

describe('AccessionView', () => {
  it('should have icon when proteome type is reference', () => {
    customRender(
      <AccessionView
        id="UPI"
        entryType="Reference proteome"
        namespace={Namespace.proteomes}
      />
    );
    expect(screen.queryByTitle(/reference Proteome entry/)).toBeInTheDocument();
  });

  it('should not have icon when proteome type is not reference', () => {
    customRender(
      <AccessionView
        id="UPI"
        entryType="Other proteome"
        namespace={Namespace.proteomes}
      />
    );
    expect(
      screen.queryByTitle(/reference Proteome entry/)
    ).not.toBeInTheDocument();
  });

  it('should link only the accession leaving out the subset', () => {
    const { asFragment } = customRender(
      <AccessionView id="P59594[424-494]" namespace={Namespace.uniprotkb} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
