import { generateForm } from '../contactFormAdapter';

describe('Test contact form adapter', () => {
  test('it should parse the inputs and generate a generic form', () => {
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
