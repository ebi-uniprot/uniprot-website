import { useId, useMemo, ChangeEvent } from 'react';
import { generatePath, Link, useLocation, useMatch } from 'react-router';
import {
  Button,
  PageIntro,
  ErrorIcon,
  SuccessIcon,
  Message,
} from 'franklin-sites';
import cn from 'classnames';
import { createPath } from 'history';

import HTMLHead from '../../shared/components/HTMLHead';
import ContactLink from './ContactLink';
import ExternalLink from '../../shared/components/ExternalLink';
import { translatedWebsite } from '../../shared/utils/translatedWebsite';

import {
  useFormLogic,
  ContactLocationState,
} from '../adapters/contactFormAdapter';

import { LocationToPath, Location } from '../../app/config/urls';

import styles from './styles/contact-form.module.scss';

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
  const formId = useId();
  const isUpdate = !!useMatch(LocationToPath[Location.ContactUpdate]);
  const { state, search } = useLocation();

  const locationState = state as ContactLocationState;
  let referrerValue = '';
  if (locationState?.referrer) {
    referrerValue =
      typeof locationState.referrer === 'string'
        ? locationState.referrer
        : createPath(locationState.referrer);
  }

  let subjectDefault: undefined | string;
  if (isUpdate) {
    const sp = new URLSearchParams(search);
    const entry = sp.get('entry');
    const entryType = sp.get('entryType');
    if (entryType && entry) {
      subjectDefault = `${entryType} ${entry} entry update request`;
    } else if (entry) {
      subjectDefault = `${entry} entry update request`;
    } else {
      subjectDefault = `UniProtKB entry update request`;
    }
  }

  const context = useMemo(() => {
    const websiteTranslation = translatedWebsite();
    let context = `${locationState?.formValues?.context || ''}
Referred from: ${globalThis.location.origin}${referrerValue}
User browser: ${navigator.userAgent}
Website version: ${GIT_COMMIT_HASH}`.trim();
    if (websiteTranslation) {
      context += `\nWebsite translated to: ${websiteTranslation}`;
    }
    return context;
  }, [locationState?.formValues?.context, referrerValue]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity(
      e.target.checked ? '' : 'Please tick the box to agree.'
    );
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity(
      e.target.value.trim().length >= 3
        ? ''
        : 'Please enter a message for our helpdesk.'
    );
  };

  const { handleSubmit, handleChange, sending } = useFormLogic(referrerValue);

  const description = isUpdate
    ? 'Submit updates or corrections to UniProt'
    : 'Send us general questions and suggestions using the form below';

  return (
    <>
      <HTMLHead title="Contact us">
        <link
          rel="canonical"
          href={window.location.origin + window.location.pathname}
        />
      </HTMLHead>
      <PageIntro heading="Contact us" />
      <section className={styles.container}>
        <h2 className="medium">{description}</h2>
        <hr />
        {isUpdate ? null : (
          <>
            <Message level="info">
              <small>
                Frequently asked: issues accessing UniProt programmatically?
                Have a look at the{' '}
                <Link
                  to={generatePath(LocationToPath[Location.HelpEntry], {
                    accession: 'api',
                  })}
                >
                  new API documentation
                </Link>{' '}
                including changes to the{' '}
                <Link
                  to={generatePath(LocationToPath[Location.HelpEntry], {
                    accession: 'return_fields',
                  })}
                >
                  return fields
                </Link>{' '}
                (aka &quot;columns&quot;) and specifically the{' '}
                <Link
                  to={generatePath(LocationToPath[Location.HelpEntry], {
                    accession: 'return_fields_databases',
                  })}
                >
                  cross-references return fields
                </Link>{' '}
                .
              </small>
            </Message>
            <br />
            <br />
          </>
        )}
        <form aria-label="Contact form" onSubmit={handleSubmit}>
          {/* Name */}
          <label className={styles.label} htmlFor={`name-${formId}`}>
            Name:
          </label>
          <span className={styles.input}>
            <input
              type="text"
              name="name"
              placeholder=" "
              id={`name-${formId}`}
              maxLength={100}
              onChange={handleChange}
              defaultValue={locationState?.formValues?.name}
              data-hj-allow
            />
            {validity}
          </span>
          {/* E-mail */}
          <label className={styles.label} htmlFor={`email-${formId}`}>
            E-mail:
          </label>
          <span className={styles.input}>
            <input
              type="email"
              name="email"
              placeholder="myemail@example.com"
              id={`email-${formId}`}
              required
              minLength={4}
              maxLength={100}
              onChange={handleChange}
              defaultValue={locationState?.formValues?.email}
              data-hj-allow
            />
            {validity}
          </span>
          {/* Subject */}
          <label className={styles.label} htmlFor={`subject-${formId}`}>
            Subject:
          </label>
          <span className={styles.input}>
            <input
              key={isUpdate ? 'update' : 'contact'}
              type="text"
              name="subject"
              placeholder=" "
              id={`subject-${formId}`}
              required
              minLength={1}
              maxLength={100}
              onChange={handleChange}
              defaultValue={
                locationState?.formValues?.subject || subjectDefault
              }
              data-hj-allow
            />
            {validity}
          </span>
          {/* Message */}
          <label className={styles.label} htmlFor={`message-${formId}`}>
            Message:
          </label>
          <span className={cn(styles.input, styles.input__message)}>
            <textarea
              name="message"
              placeholder="my message"
              id={`message-${formId}`}
              required
              minLength={1}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                handleTextareaChange(event);
                handleChange(event);
              }}
              defaultValue={locationState?.formValues?.message}
              data-hj-allow
            />
            {validity}
          </span>
          <label
            className={cn(styles.label, styles['label-wide'])}
            htmlFor={`prefilled-${formId}`}
          >
            Additional information (sent with your message to help our helpdesk
            help you):
          </label>
          <span className={cn(styles.input, styles.input__message)}>
            <textarea
              name="context"
              id={`context-${formId}`}
              value={context}
              readOnly
              data-hj-allow
            />
          </span>
          {/* Privacy */}
          <label className={styles.privacy}>
            <input
              type="checkbox"
              name="privacy"
              required
              onChange={handleCheckboxChange}
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
            <span aria-hidden="true" className={styles.required}>
              {' '}
              *
            </span>
          </label>
          {/* 🍯 */}
          <input
            type="text"
            name="requiredForRobots"
            // Make sure it's NOT reachable, on purpose
            tabIndex={-1}
            aria-hidden="true"
          />
          <Button type="submit" disabled={sending}>{`Send${
            sending ? 'ing' : ''
          } message`}</Button>
          <div className={styles.illustration} />
          <aside>
            <h2 className="small">Other ways to contact us</h2>
            {/* Link to switch the contact form */}
            <ul className="no-bullet">
              <li>
                <ContactLink
                  to={{
                    pathname:
                      LocationToPath[
                        isUpdate
                          ? Location.ContactGeneric
                          : Location.ContactUpdate
                      ],
                  }}
                >
                  {isUpdate
                    ? 'Send us general questions and suggestions'
                    : 'Send updates or corrections'}
                </ContactLink>
              </li>
              <li>
                <ExternalLink url="https://www.ebi.ac.uk/swissprot/Submissions/spin/">
                  Submit new protein sequence data
                </ExternalLink>
              </li>
            </ul>
          </aside>
        </form>
      </section>
    </>
  );
};

export default ContactForm;
