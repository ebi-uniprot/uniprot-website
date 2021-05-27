import { screen } from '@testing-library/react';
import customRender from '../../../../shared/__test-helpers__/customRender';

import FreeTextView from '../FreeTextView';

import freeTextUIData from './__mocks__/freeTextUIData';

describe('FreeText component', () => {
  it('should render free text CC', () => {
    const { asFragment } = customRender(
      <FreeTextView comments={[freeTextUIData[0]]} />
    );
    expect(asFragment()).toMatchSnapshot();

    // PubMed links
    expect(screen.queryAllByRole('link')).toHaveLength(0);

    // Publication button / evidence tag
    expect(
      screen.getByRole('button', { name: '1 publication' })
    ).toBeInTheDocument();
  });

  it('should render free text CC with inlined pubmeds', () => {
    const { asFragment } = customRender(
      <FreeTextView comments={[freeTextUIData[1]]} />
    );
    expect(asFragment()).toMatchSnapshot();

    // PubMed links
    expect(screen.getAllByRole('link')).toHaveLength(2);

    // Publication button / evidence tag
    expect(
      screen.getByRole('button', { name: '1 publication' })
    ).toBeInTheDocument();
  });

  it('should render free text CC, without evidences nor inlined pubmeds', () => {
    const { asFragment } = customRender(
      <FreeTextView comments={[freeTextUIData[0]]} noEvidence />
    );
    expect(asFragment()).toMatchSnapshot();

    // PubMed links
    expect(screen.queryAllByRole('link')).toHaveLength(0);

    // Publication button / evidence tag
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
