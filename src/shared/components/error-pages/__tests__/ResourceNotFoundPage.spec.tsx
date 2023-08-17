import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import ResourceNotFoundPage, { redirectFromTo } from '../ResourceNotFoundPage';

describe('ResourceNotFoundPage component', () => {
  it('should render', () => {
    const { asFragment, history } = customRender(<ResourceNotFoundPage />, {
      route: '/uniprotkb',
    });
    expect(history.location.pathname).toBe('/uniprotkb');
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should redirect to correct page', () => {
    const { history } = customRender(<ResourceNotFoundPage />, {
      route: '/unipark/UPI01',
    });
    expect(history.location.pathname).toBe('/uniparc/UPI01');
    expect(history.location.state).toEqual(
      expect.objectContaining({
        redirectFrom: '/unipark/UPI01',
      })
    );
  });
});

const correctURLs = new Set([
  '/keywords',
  '/uniparc/UPI01',
  '/uniprotkb/P00001/entry',
]);

const incorrectURLs = new Map<string, string>([
  ['/uniprot', '/uniprotkb'],
  ['/uniprot/P00001', '/uniprotkb/P00001'],
  ['/cross-referenced databases', '/database'],
  ['/publication', '/citations'],
]);

describe('replacement patterns', () => {
  it('should not provide a redirection', () => {
    for (const correct of correctURLs) {
      expect(redirectFromTo(correct)).toBeUndefined();
    }
  });

  it('should provide a redirection', () => {
    for (const [incorrect, correct] of incorrectURLs) {
      expect(redirectFromTo(incorrect)).toBe(correct);
    }
  });
});
