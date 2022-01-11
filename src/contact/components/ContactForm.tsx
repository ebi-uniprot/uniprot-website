import { useCallback, FormEventHandler } from 'react';
import { generatePath, Link, useRouteMatch } from 'react-router-dom';
import { Button, PageIntro } from 'franklin-sites';

import HTMLHead from '../../shared/components/HTMLHead';

import { LocationToPath, Location } from '../../app/config/urls';
import postContactForm, {
  ContactFormInputData,
} from '../adapters/contactFormAdapter';

import styles from './styles/contact-form.module.scss';

import HelperContactImage from './svgs/helper-contact.svg';

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
      <section className={styles.container}>
        <h2 className="medium">{description}</h2>
        <hr />
        <form
          aria-label="Contact form"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <label>
            <span>Name:</span>
            <input type="text" name="name" />
          </label>
          <label>
            <span>E-mail:</span>
            <input type="email" name="email" required />
          </label>
          <label>
            <span>Subject:</span>
            <input type="text" name="subject" />
          </label>
          <label>
            <span>Message:</span>
            <textarea name="message" required />
          </label>
          <label className={styles.privacy}>
            <input type="checkbox" name="privacy" />
            <span>
              I agree to the processing of my data for the purposes described in
              this{' '}
              <Link
                to={generatePath(LocationToPath[Location.HelpEntry], {
                  accession: 'privacy',
                })}
              >
                privacy notice
              </Link>
              .
            </span>
          </label>
          <Button type="submit">Submit</Button>
          <HelperContactImage
            // override the viewBox in order to make it disappear a bit
            viewBox="0 0 211 140"
          />
          <section className={styles['other-ways']}>
            {/* TODO: whole section */}
            <h2 className="small">Other ways to contact us</h2>
            {isUpdate ? null : (
              <Link to={LocationToPath[Location.ContactUpdate]}>
                Send updates or corrections
              </Link>
            )}
            <p>Submit new protein sequence data</p>
          </section>
        </form>
      </section>
    </>
  );
};

export default ContactForm;
