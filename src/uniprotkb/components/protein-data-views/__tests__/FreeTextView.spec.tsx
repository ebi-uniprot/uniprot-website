import { render, screen } from '@testing-library/react';
import customRender from '../../../../shared/__test-helpers__/customRender';

import FreeTextView, { RichText } from '../FreeTextView';

import freeTextUIData from './__mocks__/freeTextUIData';

describe('FreeText component', () => {
  describe('Free text CC', () => {
    beforeEach(() => {
      customRender(<FreeTextView comments={[freeTextUIData[0]]} />, {
        route: `/uniprotkb/P05067/entry`,
      });
    });

    it('should not render pubmed links', () => {
      expect(screen.queryAllByRole('link')).toHaveLength(0);
    });

    it('should render evidence tags', () => {
      expect(
        screen.getByRole('button', { name: '1 publication' })
      ).toBeInTheDocument();
    });
  });

  describe('Free text CC with inlined PubMeds', () => {
    beforeEach(() => {
      customRender(<FreeTextView comments={[freeTextUIData[1]]} />, {
        route: `/uniprotkb/P05067/entry`,
      });
    });

    it('should not render pubmed links', () => {
      expect(screen.getAllByRole('link')).toHaveLength(2);
    });

    it('should render evidence tags', () => {
      expect(
        screen.getByRole('button', { name: '1 publication' })
      ).toBeInTheDocument();
    });
  });

  describe('Free text CC, with inlined PubMeds and AC<accession>', () => {
    beforeEach(() => {
      customRender(<FreeTextView comments={[freeTextUIData[2]]} />, {
        route: `/uniprotkb/P05067/entry`,
      });
    });

    it('should render pubmed and AC links', () => {
      expect(screen.queryAllByRole('link')).toHaveLength(3);
    });
  });
});

describe('RichText component', () => {
  it('should render superscript', () => {
    const { container } = render(
      <RichText>Required for Cu(2+) reduction</RichText>
    );
    const superscript = container.querySelector('sup');
    expect(superscript).toHaveTextContent('2+');
  });

  it('should render dbSNP link', () => {
    render(
      <RichText>
        in AD1; increased amyloid-beta protein 42/40 ratio; dbSNP:rs63750973
      </RichText>
    );
    expect(
      screen.getByRole('link', { name: 'dbSNP:rs63750973' })
    ).toHaveAttribute('href', 'https://www.ncbi.nlm.nih.gov/snp/rs63750973');
  });

  it.skip('should render two dbSNP links', () => {
    render(
      <RichText>
        in AD1; increased amyloid-beta protein 42/40 ratio; dbSNP:rs63750973;
        dbSNP:rs12345678
      </RichText>
    );
    expect(
      screen.getByRole('link', { name: 'dbSNP:rs63750973' })
    ).toHaveAttribute('href', 'https://www.ncbi.nlm.nih.gov/snp/rs63750973');
    expect(
      screen.getByRole('link', { name: 'dbSNP:rs12345678' })
    ).toHaveAttribute('href', 'https://www.ncbi.nlm.nih.gov/snp/rs12345678');
  });

  // 	in AD1; dbSNP:rs63750643
});
