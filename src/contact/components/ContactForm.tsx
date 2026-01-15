import cn from 'classnames';
import {
  Button,
  ErrorIcon,
  Message,
  PageIntro,
  SuccessIcon,
} from 'franklin-sites';
import { createPath } from 'history';
import { type ChangeEvent, type ReactNode, useId, useMemo } from 'react';
import {
  generatePath,
  Link,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import { Location, LocationToPath } from '../../app/config/urls';
import ExternalLink from '../../shared/components/ExternalLink';
import HTMLHead from '../../shared/components/HTMLHead';
import { RefProtContactPage } from '../../shared/components/RefProtMoveMessages';
import { translatedWebsite } from '../../shared/utils/translatedWebsite';
import {
  type ContactLocationState,
  type Suggestion,
  useFormLogic,
} from '../adapters/contactFormAdapter';
import ContactLink from './ContactLink';
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

const suggestionMessages: Record<Suggestion, ReactNode> = {
  update: (
    <>
      When submitting updates to an entry, please provide the relevant source
      information, such as a reference to a publication.
    </>
  ),
  PDB: (
    <>
      New structures published to PDB automatically get added to UniProtKB
      entries, but there might be a bit of delay, please see{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'synchronization',
        })}
      >
        this help article about the synchronization process
      </Link>
      .
    </>
  ),
  buy: (
    <>
      the UniProt consortium does not sell any biological products, neither
      proteins nor organisms. Please see{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'where_to_buy',
        })}
      >
        this help page for more information
      </Link>
      .
    </>
  ),
  blast: (
    <>
      Please find more information about the BLAST tool in our corresponding{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'blast-submission',
        })}
      >
        BLAST help page
      </Link>
      .
    </>
  ),
  align: (
    <>
      Please find more information about the Align tool in our corresponding{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'sequence-alignments',
        })}
      >
        sequence alignment help page
      </Link>
      .
    </>
  ),
  'id mapping': (
    <>
      Please find more information about the ID Mapping tool in our
      corresponding{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'id_mapping',
        })}
      >
        ID Mapping help page
      </Link>
      .
    </>
  ),
  'peptide search': (
    <>
      Please find more information about the Peptide Search tool in our
      corresponding{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'peptide_search',
        })}
      >
        Peptide Search help page
      </Link>
      .
    </>
  ),
  'not English': (
    <>
      Our team can only guarantee support in English. If you are able to, please
      try to formulate your request in English so that our team can help you
      quicker.
    </>
  ),
};

const ContactForm = () => {
  const formId = useId();
  const isUpdate = !!useRouteMatch(LocationToPath[Location.ContactUpdate]);
  const { state: locationState, search } = useLocation<ContactLocationState>();

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
      // At least 16 characters, and...
      e.target.value.trim().length >= 16 &&
        // ...at least 4 words
        e.target.value.trim().split(/\s+/).length >= 4
        ? ''
        : 'Please enter a complete message for our helpdesk.'
    );
  };

  const { handleSubmit, handleChange, sending, suggestions } =
    useFormLogic(referrerValue);

  const description = isUpdate
    ? 'Submit updates or corrections to UniProt'
    : 'Send us general questions and suggestions using the form below';

  return (
    <>
      <HTMLHead title="Contact us">
        {typeof window !== 'undefined' && (
          <link
            rel="canonical"
            href={window.location.origin + window.location.pathname}
          />
        )}
      </HTMLHead>
      <PageIntro heading="Contact us" />
      <section className={styles.container}>
        <h2 className="medium">{description}</h2>
        <p>Our helpdesk team will receive and review your message</p>
        <hr />
        <RefProtContactPage />
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
          <label
            className={cn(styles.label, styles['label-wide'])}
            htmlFor={`message-${formId}`}
          >
            Message:
            <br />
            <small>
              This will be received and reviewed by our team. If you are
              submitting an error report, please explain what you have been
              trying, include your input, specify what happened, and include the
              error message if there is one.
            </small>
          </label>
          <span className={cn(styles.input, styles.input__message)}>
            <textarea
              name="message"
              placeholder="My detailed message to the UniProt team"
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
          {suggestions?.length && (
            <div className={cn(styles.suggestion)}>
              {suggestions.map((suggestion) => (
                <Message level="info" key={suggestion}>
                  {suggestionMessages[suggestion]}
                </Message>
              ))}
            </div>
          )}
          <label
            className={cn(styles.label, styles['label-wide'])}
            htmlFor={`prefilled-${formId}`}
          >
            Additional information:
            <br />
            <small>
              This is sent with your message in order to help our helpdesk help
              you.
            </small>
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
              <li>
                <Link
                  to={`${generatePath(LocationToPath[Location.SupportingData])}#integration-form`}
                >
                  Connect your database with UniProt
                </Link>
              </li>
            </ul>
          </aside>
        </form>
      </section>
    </>
  );
};

export default ContactForm;
