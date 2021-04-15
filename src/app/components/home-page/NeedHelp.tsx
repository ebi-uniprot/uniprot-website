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
import 'lite-youtube-embed';

import useDataApi from '../../../shared/hooks/useDataApi';

import parseDate from '../../../shared/utils/parseDate';

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
      training_type: string[]; // eslint-disable-line camelcase
      type: string[];
      venue: string[];
      country: string[];
      location: string[];
      year: string[];
      date_time_clean: string[]; // eslint-disable-line camelcase
      course_image: string[]; // eslint-disable-line camelcase
      status: string[];
      materials: string[];
      timeframe: string[];
    };
    fieldURLs: Array<{
      name: string;
      value: string;
    }>;
  }>;
};

// eslint-disable-next-line arrow-body-style
const NeedHelp = () => {
  const { data, loading } = useDataApi<Payload>(
    'https://www.ebi.ac.uk/ebisearch/ws/rest/ebiweb_training_events?query=uniprot&facets=status:Open&format=json&fieldurl=true&viewurl=true&fields=title,subtitle,description,training_type,type,venue,country,location,year,date_time_clean,course_image,status,materials,timeframe'
  );

  const nextTraining = data?.entries[0];

  console.log(nextTraining);

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
          styles['need-help__need-help']
        )}
      >
        <h2 className="medium">Need help?</h2>
        <p>Find answers through our help center or get in touch</p>
        <div>
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
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--span-3',
          styles['need-help__attend-training']
        )}
      >
        <img loading="lazy" src={traingImg} alt="" width="256" height="144" />
        <h2 className="tiny">
          <CalendarIcon height="1em" /> Attend training
        </h2>
        <ExternalLink url="https://www.ebi.ac.uk/training/" noIcon>
          European Bioinformatics Institute (EBI) 🇬🇧
        </ExternalLink>
        <ExternalLink
          url="https://proteininformationresource.org/training/"
          noIcon
        >
          Protein Information Resource (PIR) 🇺🇸
        </ExternalLink>
        <ExternalLink
          url="https://www.sib.swiss/training/upcoming-training-courses"
          noIcon
        >
          Swiss Institute of Bioinformatics (SIB) 🇨🇭
        </ExternalLink>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--span-3',
          styles['need-help__tutorial-videos']
        )}
      >
        <lite-youtube videoid="9IYI4QDVPa0" playlabel="UniProt intro" />
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
            <h3>Live webinar</h3>
            <div className={styles['details-container']}>
              <span>{nextTraining?.fields.status[0]}</span>
              <time
                dateTime={parseDate(
                  nextTraining?.fields.date_time_clean[0]
                )?.toISOString()}
              >
                <CalendarIcon height="1em" />{' '}
                {nextTraining?.fields.date_time_clean[0]}
              </time>
              <span>
                <LocationPinIcon height="1em" />
                {nextTraining?.fields.location[0]}
              </span>
            </div>
            <h4 className="micro">
              <ExternalLink
                url={
                  nextTraining?.fieldURLs.find(({ name }) => name === 'main')
                    ?.value || ''
                }
                noIcon
              >
                {nextTraining?.fields.title}
              </ExternalLink>
            </h4>
            <p>{nextTraining?.fields.description[0]}</p>
          </div>
        )}
      </div>
    </HeroContainer>
  );
};

export default NeedHelp;
