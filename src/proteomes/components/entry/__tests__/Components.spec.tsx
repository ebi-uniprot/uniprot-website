import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Components from '../Components';
import proteomesConverter from '../../../adapters/proteomesConverter';
import mockData from '../../../__mocks__/proteomesEntryModelData';

describe('Components view', () => {
  it('should render', () => {
    const data = proteomesConverter(mockData);
    const { asFragment } = render(
      <Router>
        <Components components={data.components} id={data.id} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
