import customRender from '../../../../shared/__test-helpers__/customRender';
import { JobTypes } from '../../../types/toolsJobTypes';
import { mockDownloadUrlOptions } from '../../state/__tests__/asyncDownloadFormReducer.spec';

import AsyncDownloadForm from '../AsyncDownloadForm';

describe('AsyncDownloadForm', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });
  it('should render', () => {
    const { asFragment } = customRender(
      <AsyncDownloadForm
        downloadUrlOptions={mockDownloadUrlOptions}
        count={1}
        inputParamsData={{
          from: 'UniProtKB_AC-ID',
          to: 'UniProtKB',
          ids: 'P05067',
        }}
        jobType={JobTypes.ID_MAPPING}
        onClose={jest.fn()}
        onDisableForm={jest.fn()}
      />,
      {
        route:
          '/id-mapping/uniprotkb/5bee222d914d0826f8b1b9d9b751aaac56ac28f8/overview',
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
