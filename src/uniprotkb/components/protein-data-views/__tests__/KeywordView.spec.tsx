import customRender from '../../../../shared/__test-helpers__/customRender';
import KeywordView from '../KeywordView';
import KeywordUIData from './__mocks__/keywordUIData';

describe('Keyword', () => {
  test(`should render Keywords for section`, () => {
    const { asFragment } = customRender(
      <KeywordView keywords={KeywordUIData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
