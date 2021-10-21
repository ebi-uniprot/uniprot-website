import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import HelpCard from '../HelpCard';

import cleanText from '../../../../shared/utils/cleanText';

import helpData from '../../__mocks__/helpSearchModelData';

describe('HelpCard tests', () => {
  const { title, matches } = helpData.results[0];
  it('should render the card component', () => {
    const { asFragment } = customRender(
      <HelpCard id="help-page" title={title} />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  });

  it('should render the card component and find highlights', () => {
    const contentMatch = matches?.content?.[0];
    const titleMatch = matches?.title?.[0];
    const { asFragment } = customRender(
      <HelpCard
        id="help-page"
        title={title}
        titleMatch={titleMatch}
        contentMatch={contentMatch}
      />
    );
    expect(asFragment()).toMatchSnapshot();

    const clean = (html?: string) =>
      cleanText(html, { allowedTags: [], allowedAttributes: {} });

    // Content match
    const card = screen.getByTestId('help-card').children[1];
    expect(card).toHaveTextContent(clean(contentMatch || ''));

    // Title match
    expect(screen.getByTestId('help-title')).toHaveTextContent(
      clean(titleMatch)
    );
  });
});
