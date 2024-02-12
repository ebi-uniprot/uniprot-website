import { renderHook } from '@testing-library/react';

import { modifyFormData, useFormLogic } from '../contactFormAdapter';

import useDataApi from '../../../shared/hooks/useDataApi';

jest.mock('../../../shared/hooks/useDataApi');

let userAgentGetter: jest.SpyInstance;

const mockData = {
  email: 'pat@pencaster.co.uk',
  name: 'Postman Pat',
  subject: 'General enquiry',
  message: 'I would like this entry to be updated',
  privacy: 'on',
  requiredForRobots: '',
  referrer: '/uniprotkb/P05067',
};

describe('Test contact form adapter', () => {
  beforeEach(() => {
    userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get');
  });

  it('should parse the inputs and generate a generic form', () => {
    userAgentGetter.mockReturnValue('Browser and OS info');
    const formData1 = new FormData();
    for (const [key, value] of Object.entries(mockData)) {
      formData1.set(key, value);
    }

    const formData2 = modifyFormData(formData1, 'random_token');

    expect(formData2.get('message')).not.toBe(mockData.message);
    expect(formData2.get('message')).toEqual(
      expect.stringContaining(mockData.message)
    );

    expect(formData2.has('token')).toBe(true);

    expect(Object.fromEntries(formData2)).toMatchSnapshot();
  });
});

describe('useContactForm custom hook', () => {
  beforeEach(() => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false });
  });

  it('should run and return correct values', () => {
    const { result } = renderHook(() => useFormLogic());
    expect(result.current.sending).toBe(false);
    expect(result.current.handleSubmit).toBeInstanceOf(Function);
    // No network call
    // token
    expect(useDataApi).toHaveBeenNthCalledWith(1, null);
    // send
    expect(useDataApi).toHaveBeenNthCalledWith(2, null, undefined);

    // NOTE: could do more here, of calling handleSubmit and checking updates
  });
});
