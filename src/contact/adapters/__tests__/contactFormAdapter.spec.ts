import { modifyFormData } from '../contactFormAdapter';

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
    const formData = new FormData();
    for (const [key, value] of Object.entries(mockData)) {
      formData.set(key, value);
    }

    modifyFormData(formData, 'random_token_id');

    expect(formData.get('message')).not.toBe(mockData.message);
    expect(formData.get('message')).toEqual(
      expect.stringContaining(mockData.message)
    );

    expect(formData.has('token_id')).toBe(true);

    expect(Object.fromEntries(formData)).toMatchSnapshot();
  });
});
