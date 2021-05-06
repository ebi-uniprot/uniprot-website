import { useMemo } from 'react';
import {
  HeroContainer,
  ExternalLink,
  Loader,
  CalendarIcon,
  CameraIcon,
  WorldIcon,
  LocationPinIcon,
} from 'franklin-sites';
import cn from 'classnames';
import { Consortium, Course, Event } from 'schema-dts';
import 'lite-youtube-embed';

import useDataApi from '../../../shared/hooks/useDataApi';
import useStructuredData from '../../../shared/hooks/useStructuredData';

import parseDate from '../../../shared/utils/parseDate';
import cleanText from '../../../shared/utils/cleanText';

import styles from './styles/non-critical.module.scss';

import TwitterLogo from '../../../images/twitter-logo.svg';
import FacebookLogo from '../../../images/facebook-logo.svg';

import traingImg from '../../../images/training.jpg';

type Payload = {
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
      date_time_clean: string[]; // eslint-disable-line camelcase
      status: string[];
    };
    fieldURLs: Array<{
      name: string;
      value: string;
    }>;
  }>;
};

// Copy from https://www.ebi.ac.uk/training/search-results?query=uniprot&domain=ebiweb_training_online&page=1&facets=type:Online%20tutorial,type:Recorded%20webinar
const fallback: Payload['entries'][0] = {
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
    date_time_clean: [],
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

// eslint-disable-next-line arrow-body-style
const NeedHelp = () => {
  const { data, loading } = useDataApi<Payload>(
    'https://www.ebi.ac.uk/ebisearch/ws/rest/ebiweb_training_events?query=timeframe:upcoming AND resources:UniProt The Universal Protein Resource 5544&facets=status:Open&format=json&fieldurl=true&viewurl=true&fields=title,subtitle,description,location,city,country,venue,date_time_clean,status&size=1'
  );

  const seminar = data?.entries[0] || fallback;
  const title = `${seminar.fields.title}${
    seminar.fields.subtitle[0] ? ` - ${seminar.fields.subtitle[0]}` : ''
  }`;
  const url =
    seminar?.fieldURLs.find(({ name }) => name === 'main')?.value || '';
  const venue = seminar?.fields.venue[0];
  const location = seminar?.fields.location[0];

  useStructuredData<Course | Event>(
    useMemo(() => {
      const organiser: Consortium = {
        // TODO: reference to the consortium markup from the footer
        '@type': 'Consortium',
        name: 'UniProt consortium',
        url: 'https://www.uniprot.org',
      };

      let event: Event | undefined;
      if (seminar.source === 'ebiweb_training_events') {
        const startDate = parseDate(seminar.fields.date_time_clean[0]);
        event = {
          '@type': 'Event',
          '@id': `training-event-${seminar.id}`,
          name: title,
          startDate:
            startDate &&
            `${startDate.getFullYear()}-${
              startDate.getMonth() + 1
            }-${startDate.getDate()}`,
          description: seminar.fields.description,
          eventAttendanceMode: `https://schema.org/${
            venue === 'Online' ? 'On' : 'Off'
          }lineEventAttendanceMode` as const,
          organizer: organiser,
          location:
            venue === 'Online'
              ? {
                  '@type': 'VirtualLocation',
                  name: title,
                  url,
                }
              : {
                  '@type': 'Place',
                  name: venue,
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: seminar.fields.country[0],
                    addressLocality: seminar.fields.city[0],
                  },
                },
        };
      }

      const course: Course = {
        '@type': 'Course',
        name: title,
        description: seminar.fields.description,
        url,
        hasCourseInstance: event?.['@id'] ? { '@id': event['@id'] } : undefined,
        provider: organiser,
      };

      if (event) {
        return {
          '@context': 'https://schema.org',
          '@graph': [course, event],
        };
      }

      return {
        '@context': 'https://schema.org',
        ...course,
      };
    }, [seminar, title, url, venue])
  );

  let seminarHeading = 'Live webinar';
  if (seminar?.source === 'ebiweb_training_online') {
    seminarHeading = 'Online training';
  } else if (venue !== 'Online') {
    seminarHeading = 'Live seminar';
  }

  return (
    <HeroContainer
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        'uniprot-grid--with-bleed',
        styles['home-page-section'],
        styles['need-help']
      )}
      titleClassName="uniprot-grid-cell--span-12"
      noSidePadding
    >
      <div
        className={cn(
          'uniprot-grid-cell--span-3',
          styles['need-help__need-help-top']
        )}
      >
        <h2 className="medium">Need help?</h2>
        <p>Find answers through our help center or get in touch</p>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--span-3',
          styles['need-help__need-help-bottom']
        )}
      >
        <ExternalLink
          url="https://www.uniprot.org/help/"
          noIcon
          className={cn(styles['help-center-link'])}
        >
          Help center
        </ExternalLink>{' '}
        <ExternalLink url="https://www.uniprot.org/contact" noIcon>
          Contact us
        </ExternalLink>
        <br />
        <ExternalLink
          url="https://twitter.com/uniprot"
          title="UniProt posts on Twitter"
          noIcon
        >
          <TwitterLogo width="3ch" />
        </ExternalLink>
        <ExternalLink
          url="https://www.facebook.com/uniprot.org"
          title="UniProt posts on Facebook"
          noIcon
        >
          <FacebookLogo width="3ch" />
        </ExternalLink>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--span-3',
          styles['need-help__attend-training-top']
        )}
      >
        <img loading="lazy" src={traingImg} alt="" width="256" height="144" />
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--span-3',
          styles['need-help__attend-training-bottom']
        )}
      >
        <h2 className="tiny">
          <CalendarIcon height="1em" /> Attend training
        </h2>
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
          'uniprot-grid-cell--span-3',
          styles['need-help__tutorial-videos-top']
        )}
      >
        {/* NOTE: privacy issue? When clicking, we embed YouTube in the website,
        with all the related tracking, might need to link to YouTube instead */}
        <lite-youtube videoid="9IYI4QDVPa0" playlabel="UniProt intro" />
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--span-3',
          styles['need-help__tutorial-videos-bottom']
        )}
      >
        <ExternalLink
          url="https://www.youtube.com/c/uniprotvideos/featured"
          noIcon
        >
          <CameraIcon width="2ch" /> Tutorial &amp; videos
        </ExternalLink>
        <ExternalLink
          url="https://www.youtube.com/watch?v=1swnzBM7eZo&list=PLk96kjgxotiZrj6GWC2SFoOKfB1H3tyxt"
          noIcon
        >
          <CameraIcon width="2ch" /> Past webinars
        </ExternalLink>
        <ExternalLink
          url="https://www.ebi.ac.uk/training/search-results?query=uniprot&domain=ebiweb_training&page=1&facets="
          noIcon
        >
          <WorldIcon width="2ch" /> Online courses
        </ExternalLink>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--span-3',
          styles['need-help__next-up']
        )}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className={styles['training-loaded-container']}>
            {seminar ? (
              <>
                <h3>{seminarHeading}</h3>
                {seminar.source === 'ebiweb_training_events' && (
                  <div className={styles['details-container']}>
                    <span>{seminar?.fields.status[0]}</span>
                    {seminar?.fields.date_time_clean && (
                      <time
                        dateTime={parseDate(
                          seminar.fields.date_time_clean[0]
                        )?.toISOString()}
                      >
                        <CalendarIcon height="1em" />{' '}
                        {seminar.fields.date_time_clean[0]}
                      </time>
                    )}
                    <span>
                      <LocationPinIcon height="1em" />
                      {venue}
                      {location && location !== 'Online' && `, ${location}`}
                    </span>
                  </div>
                )}

                <h4 className="micro">
                  <ExternalLink url={url} noIcon>
                    {title}
                  </ExternalLink>
                </h4>
                {seminar?.fields.title[0].length <= 100 && (
                  <p
                    className={styles.description}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: cleanText(seminar?.fields.description[0]),
                    }}
                  />
                )}
              </>
            ) : (
              <p>No upcoming seminar or webinar</p>
            )}
          </div>
        )}
      </div>
    </HeroContainer>
  );
};

export default NeedHelp;
