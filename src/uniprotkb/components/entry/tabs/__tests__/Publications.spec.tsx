import { screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import entryPublicationData from '../../__tests__/__mocks__/entryPublicationsData';
import { PublicationReference, PublicationSource } from '../Publications';

describe('PublicationReference', () => {
  it('should render correctly', () => {
    const { asFragment } = customRender(
      <PublicationReference
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        references={entryPublicationData.results[0].references!}
        accession="O43865"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should pass the citation ID down to the community submission link', () => {
    const communityResult = entryPublicationData.results.find((result) =>
      result.references?.some((reference) => reference.source?.name === 'ORCID')
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const references = communityResult!.references!;
    const { citationId } =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      references.find((reference) => reference.source?.name === 'ORCID')!;

    customRender(
      <PublicationReference references={references} accession="O43865" />
    );

    expect(
      screen.getByRole('link', { name: /see community submission/ })
    ).toHaveAttribute('href', expect.stringContaining(`pmid=${citationId}`));
  });
});

describe('PublicationSource', () => {
  describe('UniProtKB', () => {
    it('renders UniProtKB reviewed', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'UniProtKB reviewed (Swiss-Prot)' }}
        />
      );
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders UniProtKB unreviewed', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'UniProtKB unreviewed (TrEMBL)' }}
        />
      );
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Community annotations', () => {
    it('renders ORCID links', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'ORCID', id: '0009-0004-6150-6467' }}
        />
      );
      expect(screen.getAllByRole('link')).toHaveLength(2);
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders ORCID links', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'ORCID', id: 'Anonymous' }}
        />
      );
      expect(screen.getAllByRole('link')).toHaveLength(1);
      expect(asFragment()).toMatchSnapshot();
    });

    it('links the community submission to the specific publication when the citation is a PubMed ID', () => {
      customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'ORCID', id: '0009-0004-6150-6467' }}
          citationId="12345678"
        />
      );
      expect(
        screen.getByRole('link', { name: /see community submission/ })
      ).toHaveAttribute(
        'href',
        expect.stringContaining('accession=P12345&pmid=12345678')
      );
    });

    it('links the community submission to the accession when the citation is not a PubMed ID', () => {
      customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'ORCID', id: '0009-0004-6150-6467' }}
          citationId="CI-1234ABCD5"
        />
      );
      const href = screen
        .getByRole('link', { name: /see community submission/ })
        .getAttribute('href');
      expect(href).toContain('accession=P12345');
      expect(href).not.toContain('pmid');
    });
  });

  describe('Normal xref', () => {
    it('renders correctly for normal xrefs', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'IntAct', id: 'P12345' }}
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', expect.stringContaining('P12345'));
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders but without links for unknown DBs', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'not-a-db', id: 'ID1234' }}
        />
      );
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Exceptions', () => {
    it('renders correctly for GeneRif', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'GeneRif', id: '351' }}
        />
      );
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders correctly for MGI', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'MGI', id: '1860086' }}
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', expect.stringContaining('MGI:'));
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders correctly for IEDB', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'IEDB', id: 'P05067' }}
        />
      );
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders correctly for IMPC', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'IMPC', id: 'MGI:1860086' }}
        />
      );
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders correctly for GAD', () => {
      const { asFragment } = customRender(
        <PublicationSource
          accession="P12345"
          source={{ name: 'GAD', id: '117462' }}
        />
      );
      expect(asFragment()).toMatchSnapshot();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });
});
