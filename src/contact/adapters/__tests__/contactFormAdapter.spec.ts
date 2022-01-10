import { generateForm } from '../contactFormAdapter';

let userAgentGetter: jest.SpyInstance;

describe('Test contact form adapter', () => {
  beforeEach(() => {
    userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get');
  });

  test('it should parse the inputs and generate a generic form', () => {
    userAgentGetter.mockReturnValue('Browser and OS info');
    const form = generateForm(
      {
        email: 'pat@pencaster.co.uk',
        name: 'Postman Pat',
        subject: 'General enquiry',
        message: 'I would like this entry to be updated',
      },
      'random_token_id'
    );
    const formObj: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of form.entries()) {
      formObj[key] = value;
    }
    expect(formObj).toMatchSnapshot();
  });

  test('it should set the subject in the case of entry updates', () => {
    const form = generateForm(
      {
        email: 'pat@pencaster.co.uk',
        name: 'Postman Pat',
        subject: 'entry update',
        accession: 'P05067',
        entryType: 'SwissProt',
        message: 'I would like this entry to be updated',
      },
      'random_token_id'
    );

    expect(form.get('subject')).toBe('SwissProt P05067 entry update');
  });
});
