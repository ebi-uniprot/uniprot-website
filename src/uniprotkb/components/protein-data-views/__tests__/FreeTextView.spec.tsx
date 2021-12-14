import { screen } from '@testing-library/react';
import customRender from '../../../../shared/__test-helpers__/customRender';

import FreeTextView from '../FreeTextView';

import freeTextUIData from './__mocks__/freeTextUIData';

describe('FreeText component', () => {
  describe('Free text CC', () => {
    beforeEach(() => {
      customRender(<FreeTextView comments={[freeTextUIData[0]]} />);
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
      customRender(<FreeTextView comments={[freeTextUIData[1]]} />);
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

  describe('Free text CC, no inlined PubMeds, no evidence tag', () => {
    beforeEach(() => {
      customRender(<FreeTextView comments={[freeTextUIData[0]]} noEvidence />);
    });

    it('should not render pubmed links', () => {
      expect(screen.queryAllByRole('link')).toHaveLength(0);
    });

    it('should not render evidence tags', () => {
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});

// describe('ACCommentView', () => {
//   it('should render link with a single instance of "AC <accession>"', () => {
//     customRender(
//       <ACCommentView string="For an example of a full-length immunoglobulin kappa light chain see AC P0DOX7." />
//     );
//     const links = screen.queryAllByRole('link');
//     expect(links).toHaveLength(1);
//     expect(links[0]).toHaveAttribute('href', '/uniprotkb/P0DOX7');
//   });
//   it('should render two links with two instances of "AC <accession>"', () => {
//     customRender(<ACCommentView string="See AC P0DOX7 and see AC P05067." />);
//     const links = screen.queryAllByRole('link');
//     expect(links).toHaveLength(2);
//     expect(links[0]).toHaveAttribute('href', '/uniprotkb/P0DOX7');
//     expect(links[1]).toHaveAttribute('href', '/uniprotkb/P05067');
//   });
// });
