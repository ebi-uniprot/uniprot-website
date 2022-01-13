import { useCallback, FormEventHandler, useRef } from 'react';
import {
  generatePath,
  Link,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import {
  Button,
  PageIntro,
  ExternalLink,
  ErrorIcon,
  SuccessIcon,
} from 'franklin-sites';
import { v1 } from 'uuid';
import cn from 'classnames';
import { LocationDescriptor } from 'history';

import HTMLHead from '../../shared/components/HTMLHead';

import { LocationToPath, Location } from '../../app/config/urls';
import postContactForm, {
  ContactFormInputData,
} from '../adapters/contactFormAdapter';

import styles from './styles/contact-form.module.scss';

import HelperContactImage from './svgs/helper-contact.svg';

// ARIA hide all of these, are the state is available in the form already
const validity = (
  <>
    <span aria-hidden="true" className={cn(styles.validity, styles.required)}>
      *
    </span>
    <SuccessIcon
      aria-hidden="true"
      width="1em"
      className={cn(styles.validity, styles.valid)}
    />
    <ErrorIcon
      aria-hidden="true"
      width="1em"
      className={cn(styles.validity, styles.invalid)}
    />
  </>
);

const ContactForm = () => {
  const idRef = useRef(v1());
  const isUpdate = !!useRouteMatch(LocationToPath[Location.ContactUpdate]);
  const referrer =
    useLocation<{ referrer?: LocationDescriptor }>().state?.referrer;

  console.log('referrer', referrer);

  const privacyCheckBox = useCallback((checkbox: HTMLInputElement) => {
    checkbox.setCustomValidity('Please tick the box to agree.');
  }, []);

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

  const id = idRef.current;

  return (
    <>
      <HTMLHead title="Contact us" />
      <PageIntro title="Contact us" />
      <section className={styles.container}>
        <h2 className="medium">{description}</h2>
        <hr />
        <form aria-label="Contact form" onSubmit={handleSubmit}>
          {/* Name */}
          <label className={styles.label} htmlFor={`name-${id}`}>
            Name:
          </label>
          <span className={styles.input}>
            <input
              type="text"
              name="name"
              placeholder=" "
              id={`name-${id}`}
              maxLength={100}
            />
            {validity}
          </span>
          {/* E-mail */}
          <label className={styles.label} htmlFor={`email-${id}`}>
            E-mail:
          </label>
          <span className={styles.input}>
            <input
              type="email"
              name="email"
              placeholder="myemail@example.com"
              id={`email-${id}`}
              required
              minLength={4}
              maxLength={100}
            />
            {validity}
          </span>
          {/* Subject */}
          <label className={styles.label} htmlFor={`subject-${id}`}>
            Subject:
          </label>
          <span className={styles.input}>
            <input
              type="text"
              name="subject"
              placeholder=" "
              id={`subject-${id}`}
              required
              minLength={1}
              maxLength={100}
            />
            {validity}
          </span>
          {/* Message */}
          <label className={styles.label} htmlFor={`message-${id}`}>
            Message:
          </label>
          <span className={cn(styles.input, styles.input__message)}>
            <textarea
              name="message"
              placeholder="my message"
              id={`message-${id}`}
              required
              minLength={1}
            />
            {validity}
          </span>
          {/* Privacy */}
          <label className={styles.privacy}>
            <input
              type="checkbox"
              name="privacy"
              required
              ref={privacyCheckBox}
            />
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
          </label>
          {/* 🍯 */}
          <input
            type="text"
            name="requiredForRobots"
            // Make sure it's NOT reachable, on purpose
            tabIndex={-1}
            aria-hidden="true"
          />
          <Button type="submit">Send message</Button>
          {/* TODO: after TRM-25295, make sure this is not even loaded on
           * smaller screens when loaded as an image */}
          <HelperContactImage
            className={styles.illustration}
            // override the viewBox in order to make it disappear a bit
            viewBox="0 0 211 140"
          />
          <aside>
            <h2 className="small">Other ways to contact us</h2>
            {/* Link to switch the contact form */}
            <div>
              <Link
                to={{
                  pathname:
                    LocationToPath[
                      isUpdate
                        ? Location.ContactGeneric
                        : Location.ContactUpdate
                    ],
                  // Make sure to pass along the previour referrer if switching
                  state: { referrer },
                }}
              >
                {isUpdate
                  ? 'Send us general questions and suggestions'
                  : 'Send updates or corrections'}
              </Link>
            </div>
            <div>
              <ExternalLink url="https://www.ebi.ac.uk/swissprot/Submissions/spin/">
                Submit new protein sequence data
              </ExternalLink>
            </div>
          </aside>
        </form>
      </section>
    </>
  );
};

export default ContactForm;
