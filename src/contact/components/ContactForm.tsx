import { useCallback, FormEventHandler } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { PageIntro } from 'franklin-sites';

import HTMLHead from '../../shared/components/HTMLHead';
import { LocationToPath, Location } from '../../app/config/urls';
import postContactForm, {
  ContactFormInputData,
} from '../adapters/contactFormAdapter';

const ContactForm = () => {
  const isUpdate = !!useRouteMatch(LocationToPath[Location.ContactUpdate]);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      const form = event.target;
      event.preventDefault();
      if (!(form instanceof HTMLFormElement)) {
        return;
      }
      // Parse form and generate form input data
      const contactFormInputData: ContactFormInputData = {
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLInputElement).value,
      };
      postContactForm(contactFormInputData);
      event.preventDefault();
    },
    []
  );

  const description = isUpdate
    ? 'Submit updates or corrections to UniProt'
    : 'Send us general questions and suggestions using the form below';

  return (
    <>
      <HTMLHead title="Contact us" />
      <PageIntro title="Contact us" />
      {description}
      <form aria-label="Contact form" onSubmit={handleSubmit}>
        <input type="text" name="email" required />
        <input type="text" name="name" />
        <input type="text" name="subject" />
        <textarea name="message" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ContactForm;
