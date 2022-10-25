import { screen } from '@testing-library/react';
import customRender from '../../../../shared/__test-helpers__/customRender';

import FreeTextView from '../FreeTextView';

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
