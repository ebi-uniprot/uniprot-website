import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import KeywordView from '../KeywordView';
import KeywordUIDataJson from '../__mocks__/KeywordUIData.json';

afterAll(() => cleanup());

describe('Keyword', () => {
  test(`should render Keywords for section`, () => {
    const { asFragment } = render(
      <Router>
        <KeywordView keywords={KeywordUIDataJson} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
