import cn from 'classnames';
import {
  CalendarIcon,
  CameraIcon,
  HeroContainer,
  Loader,
  LocationPinIcon,
  WorldIcon,
} from 'franklin-sites';
import { lazy, useMemo } from 'react';
import { Link } from 'react-router-dom';

import ContactLink from '../../../contact/components/ContactLink';
import LinkedInLogo from '../../../images/linkedin-logo.svg';
import traingImg from '../../../images/training.jpg';
import XLogo from '../../../images/x-logo.svg';
import ExternalLink from '../../../shared/components/ExternalLink';
import LazyComponent from '../../../shared/components/LazyComponent';
import useDataApi from '../../../shared/hooks/useDataApi';
import useStructuredData from '../../../shared/hooks/useStructuredData';
import cleanText, {
  cleanTextDefaultOptions,
  getTransformTags,
} from '../../../shared/utils/cleanText';
import parseDate from '../../../shared/utils/parseDate';
import { linkedIn, twitterX } from '../../config/socialUrls';
import { Location, LocationToPath } from '../../config/urls';
import styles from './styles/non-critical.module.scss';
import dataToSchema, { isCourseOnsite } from './training.structured';

const YouTubeEmbed = lazy(
  () =>
    import(
      /* webpackChunkName: "youtube-embed" */ '../../../shared/components/YouTubeEmbed'
    )
);

// If the urlEBISearch URL ever stops working then do a text query for UniProt and include the "resources" field and update the query accordingly
// https://www.ebi.ac.uk/ebisearch/ws/rest/ebiweb_training_events?query=timeframe:upcoming%20AND%20UniProt&facets=status:Open&format=json&fieldurl=true&viewurl=true&fields=title,subtitle,description,location,city,country,venue,date_time_clean,start_date,end_date,status,resources&size=10&sort=start_date
// The resource is currently "UniProt: The Universal Protein Resource" but the ":" presents issues for the lucene query so use the wildcard "*" instead.
const resource = 'UniProt* The Universal Protein Resource';
const urlEBISearch = `https://www.ebi.ac.uk/ebisearch/ws/rest/ebiweb_training_events?query=timeframe:upcoming AND resources:${resource}&facets=status:Open&format=json&fieldurl=true&viewurl=true&fields=title,subtitle,description,location,city,country,venue,date_time_clean,start_date,end_date,status&size=1&sort=start_date`;

// corresponding schema
export type PayloadEBISearch = {
  hitCount: number;
  entries: Array<{
    id: string;
    source: string;
    fields: {
      title: string[];
      subtitle: string[];
      description: string[];
      city: string[];
      country: string[];
      // Only country?
      location: string[];
      // More precise venue
      venue: string[];
      date_time_clean: string[];
      start_date: string[];
      end_date: string[];
      status: string[];
    };
    fieldURLs: Array<{
      name: string;
      value: string;
    }>;
  }>;
};

// Copy from https://www.ebi.ac.uk/training/search-results?query=uniprot&domain=ebiweb_training_online&page=1&facets=type:Online%20tutorial,type:Recorded%20webinar
const fallback: PayloadEBISearch['entries'][0] = {
  id: '102',
  source: 'ebiweb_training_online',
  fields: {
    title: ['UniProt'],
    subtitle: ['Quick tour'],
    description: [
      'This quick tour provides a brief introduction to the Universal Protein Resource, UniProt.',
    ],
    location: ['Online'],
    venue: ['Online'],
    status: [],
    date_time_clean: [], // eslint-disable-line camelcase
    start_date: [], // eslint-disable-line camelcase
    end_date: [], // eslint-disable-line camelcase
    city: [],
    country: [],
  },
  fieldURLs: [
    {
      name: 'main',
      value: 'https://www.ebi.ac.uk/training/online/courses/uniprot-quick-tour',
    },
  ],
};

const isCourseOnline = (source: PayloadEBISearch['entries'][0]['source']) =>
  source === 'ebiweb_training_online';

const NeedHelp = () => {
  const { data, loading } = useDataApi<PayloadEBISearch>(urlEBISearch);

  const seminar = data?.entries[0] || fallback;
  const structuredData = useMemo(() => dataToSchema(seminar), [seminar]);
  useStructuredData(structuredData);

  const { source } = seminar;
  const venue = seminar.fields.venue[0];
  const location = seminar.fields.location[0];

  const seminarHeading =
    (isCourseOnline(source) && 'Online training') ||
    (isCourseOnsite(data?.entries[0]?.fields.location) && 'Live seminar') ||
    'Live webinar';

  return (
    <HeroContainer
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        'uniprot-grid--with-bleed',
        styles['home-page-section'],
        styles['need-help']
      )}
      noSidePadding
    >
      <div
        className={cn(
          'uniprot-grid-cell--small-span-6',
          'uniprot-grid-cell--medium-span-3',
          'uniprot-grid-cell--small-offset-1',
          'uniprot-grid-cell--medium-offset-10',
          styles['need-help__need-help-top']
        )}
      >
        <h2>Need help?</h2>
        <p>Find answers through our help center or get in touch</p>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--small-span-6',
          'uniprot-grid-cell--medium-span-3',
          'uniprot-grid-cell--small-offset-1',
          'uniprot-grid-cell--medium-offset-10',
          styles['need-help__need-help-bottom']
        )}
      >
        <Link
          to={LocationToPath[Location.HelpResults]}
          className={cn(styles['help-center-link'])}
        >
          Help center
        </Link>{' '}
        <ContactLink className={cn(styles['help-center-link'])}>
          Contact us
        </ContactLink>
        <br />
        <ExternalLink url={linkedIn} title="UniProt posts on LinkedIn" noIcon>
          <LinkedInLogo width="2em" />
        </ExternalLink>
        <ExternalLink
          url={twitterX}
          title="UniProt posts on X (formerly Twitter)"
          noIcon
        >
          <XLogo width="2em" />
        </ExternalLink>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--small-span-6',
          'uniprot-grid-cell--medium-span-3',
          'uniprot-grid-cell--small-offset-7',
          'uniprot-grid-cell--medium-offset-7',
          styles['need-help__attend-training-top']
        )}
      >
        <img loading="lazy" src={traingImg} alt="" width="256" height="144" />
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--small-span-6',
          'uniprot-grid-cell--medium-span-3',
          'uniprot-grid-cell--small-offset-7',
          'uniprot-grid-cell--medium-offset-7',
          styles['need-help__attend-training-bottom']
        )}
      >
        <h3 className="small">
          <CalendarIcon height="1em" /> Attend training
        </h3>
        <ExternalLink url="https://www.ebi.ac.uk/training/" noIcon>
          European Bioinformatics Institute (EBI)
        </ExternalLink>
        <ExternalLink
          url="https://proteininformationresource.org/training/"
          noIcon
        >
          Protein Information Resource (PIR)
        </ExternalLink>
        <ExternalLink
          url="https://www.sib.swiss/training/upcoming-training-courses"
          noIcon
        >
          Swiss Institute of Bioinformatics (SIB)
        </ExternalLink>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--small-span-6',
          'uniprot-grid-cell--medium-span-3',
          'uniprot-grid-cell--small-offset-1',
          'uniprot-grid-cell--medium-offset-4',
          styles['need-help__tutorial-videos-top']
        )}
      >
        <LazyComponent fallback={null} rootMargin="50px">
          <YouTubeEmbed
            videoid="OwOJmKmc7VM"
            title="Welcome to UniProt || UniProt introduction"
          />
        </LazyComponent>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--small-span-6',
          'uniprot-grid-cell--medium-span-3',
          'uniprot-grid-cell--small-offset-1',
          'uniprot-grid-cell--medium-offset-4',
          styles['need-help__tutorial-videos-bottom']
        )}
      >
        <ExternalLink
          url="https://www.youtube.com/c/uniprotvideos/featured"
          noIcon
        >
          <CameraIcon width="1.5em" /> Tutorial &amp; videos
        </ExternalLink>
        <ExternalLink
          url="https://www.ebi.ac.uk/training/search-results?query=uniprot&domain=ebiweb_training&page=1&facets="
          noIcon
        >
          <WorldIcon width="1.5em" /> Online courses
        </ExternalLink>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--small-span-6',
          'uniprot-grid-cell--medium-span-3',
          'uniprot-grid-cell--small-offset-7',
          'uniprot-grid-cell--medium-offset-1',
          styles['need-help__next-up']
        )}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className={styles['training-loaded-container']}>
            <h3>{seminarHeading}</h3>
            {source === 'ebiweb_training_events' && (
              <div className={styles['details-container']}>
                <span>{seminar?.fields.status[0]}</span>
                {seminar?.fields.date_time_clean && (
                  <time
                    dateTime={parseDate(
                      seminar.fields.start_date[0] ||
                        seminar.fields.date_time_clean[0]
                    )?.toISOString()}
                  >
                    <CalendarIcon height="1em" />{' '}
                    {seminar.fields.date_time_clean[0]}
                  </time>
                )}
                <span>
                  <LocationPinIcon height="1em" />
                  {venue && venue !== 'null' ? (
                    <>
                      {venue}
                      {location && location !== 'Online' && `, ${location}`}
                    </>
                  ) : (
                    location
                  )}
                </span>
              </div>
            )}

            <h4 className="tiny">
              <ExternalLink
                url={
                  seminar?.fieldURLs.find(({ name }) => name === 'main')
                    ?.value || ''
                }
                noIcon
              >
                {`${seminar.fields.title}${
                  seminar.fields.subtitle[0]
                    ? ` - ${seminar.fields.subtitle[0]}`
                    : ''
                }`}
              </ExternalLink>
            </h4>
            {seminar?.fields.title[0].length <= 100 && (
              <p
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: cleanText(seminar?.fields.description[0], {
                    ...cleanTextDefaultOptions,
                    transformTags: {
                      ...getTransformTags('strong'),
                    },
                  }),
                }}
              />
            )}
          </div>
        )}
      </div>
    </HeroContainer>
  );
};

export default NeedHelp;
