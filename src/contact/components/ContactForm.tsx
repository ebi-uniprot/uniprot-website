import { useCallback, FormEventHandler } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { PageIntro } from 'franklin-sites';

import HTMLHead from '../../shared/components/HTMLHead';
import { LocationToPath, Location } from '../../app/config/urls';

const ContactForm = () => {
  const isUpdate = !!useRouteMatch(LocationToPath[Location.ContactUpdate]);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) {
        return;
      }
      event.preventDefault();
      console.log(form, ...form.elements);
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
        <input type="text" name="email" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ContactForm;
