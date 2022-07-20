import { useRef, ChangeEvent } from 'react';
import { v1 } from 'uuid';
import {
  generatePath,
  Link,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
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

import {
  useFormLogic,
  ContactLocationState,
} from '../adapters/contactFormAdapter';

import { parseQueryString } from '../../shared/utils/url';

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
  const idRef = useRef(v1());
  const isUpdate = !!useRouteMatch(LocationToPath[Location.ContactUpdate]);
  const { state: locationState, search } = useLocation<ContactLocationState>();

  let referrerValue: undefined | string;
  if (locationState?.referrer) {
    referrerValue =
      typeof locationState.referrer === 'string'
        ? locationState.referrer
        : createPath(locationState.referrer);
  }

  let subjectDefault: undefined | string;
  if (isUpdate) {
    const { entry, entryType } = parseQueryString(search);
    if (entryType && entry) {
      subjectDefault = `${entryType} ${entry} entry update request`;
    } else if (entry) {
      subjectDefault = `${entry} entry update request`;
    } else {
      subjectDefault = `UniProtKB entry update request`;
    }
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.setCustomValidity(
      e.target.checked ? '' : 'Please tick the box to agree.'
    );

  const { handleSubmit, handleChange, sending } = useFormLogic(referrerValue);

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
        {isUpdate ? null : (
          <>
            <Message level="info">
              Frequently asked: issues accessing UniProt programmatically? Have
              a look at the{' '}
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
            </Message>
            <br />
            <br />
          </>
        )}
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
              onChange={handleChange}
              defaultValue={locationState?.formValues?.name}
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
              onChange={handleChange}
              defaultValue={locationState?.formValues?.email}
            />
            {validity}
          </span>
          {/* Subject */}
          <label className={styles.label} htmlFor={`subject-${id}`}>
            Subject:
          </label>
          <span className={styles.input}>
            <input
              key={isUpdate ? 'update' : 'contact'}
              type="text"
              name="subject"
              placeholder=" "
              id={`subject-${id}`}
              required
              minLength={1}
              maxLength={100}
              onChange={handleChange}
              defaultValue={
                locationState?.formValues?.subject || subjectDefault
              }
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
              onChange={handleChange}
              defaultValue={locationState?.formValues?.message}
            />
            {validity}
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
          <input hidden name="referrer" value={referrerValue} readOnly />
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
        <Message level="info" className="uniprot-grid-cell--span-12">
          If you still need it, the{' '}
          <ExternalLink url="https://legacy.uniprot.org" rel="nofollow" noIcon>
            legacy version of the website
          </ExternalLink>{' '}
          is available until the 2022_03 release.
        </Message>
      </section>
    </>
  );
};

export default ContactForm;
