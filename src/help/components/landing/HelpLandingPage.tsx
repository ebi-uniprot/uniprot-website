import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { CommunityAnnotationIcon, PageIntro } from 'franklin-sites';
import cn from 'classnames';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import HelpQuickSearch from './HelpQuickSearch';
import Contact from '../../../shared/components/layouts/Contact';
import IllustratedListTile, {
  IllustratedListTileProps,
} from './IllustratedListTile';
import HTMLHead from '../../../shared/components/HTMLHead';
import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import { searchableNamespaceLabels } from '../../../shared/types/namespaces';
import {
  LocationToPath,
  Location,
  getLocationEntryPathFor,
} from '../../../app/config/urls';

import DB from './svgs/db.img.svg';
import Cog from './svgs/cog.img.svg';
import TalkingPerson from './svgs/talking-person.img.svg';
import Terminal from './svgs/terminal.img.svg';
import Reader from './svgs/reader.img.svg';

import landing from './styles/help-landing-page.module.scss';

const UniProtFooter = lazy(
  () =>
    import(
      /* webpackChunkName: "footer" */ '../../../shared/components/layouts/UniProtFooter'
    )
);

const getHelpEntryPath = getLocationEntryPathFor(Location.HelpEntry);

const tileData: IllustratedListTileProps[] = [
  {
    title: 'UniProt data',
    linkList: [
      {
        to: getHelpEntryPath('uniprotkb_manual'),
        label: searchableNamespaceLabels.uniprotkb,
      },
      {
        to: getHelpEntryPath('proteomes_manual'),
        label: searchableNamespaceLabels.proteomes,
      },
      {
        to: getHelpEntryPath('uniref'),
        label: searchableNamespaceLabels.uniref,
      },
      {
        to: getHelpEntryPath('uniparc'),
        label: searchableNamespaceLabels.uniparc,
      },
    ],
    moreTo: {
      pathname: LocationToPath[Location.HelpResults],
      search: '?query=data',
    },
    image: <img src={DB} width="52" height="62" alt="" />,
  },
  {
    title: 'Get started',
    linkList: [
      {
        to: getHelpEntryPath('find_your_protein'),
        label: 'Find your protein',
      },
      {
        to: getHelpEntryPath('explore_uniprotkb_entry '),
        label: 'Explore UniProtKB entry',
      },
      {
        to: getHelpEntryPath('explore_proteomes '),
        label: 'Explore proteomes',
      },
    ],
    moreTo: {
      pathname: LocationToPath[Location.HelpResults],
      search: '?query=*&facets=category:Get started',
    },
    image: <img src={Cog} width="52" height="52" alt="" />,
  },
  {
    title: 'Training',
    linkList: [
      {
        url: 'https://www.ebi.ac.uk/training/online/courses/uniprot-quick-tour',
        label: 'Online training',
      },
      {
        url: 'https://www.ebi.ac.uk/training/search-results?query=uniprot&domain=ebiweb_training&page=1&facets=',
        label: 'Courses',
      },
    ],
    moreTo: {
      pathname: LocationToPath[Location.HelpResults],
      search: '?query=training',
    },
    image: <img src={TalkingPerson} width="52" height="40" alt="" />,
  },
  {
    title: 'Technical corner',
    linkList: [
      {
        to: getHelpEntryPath('programmatic_access'),
        label: 'Programmatic access',
      },
      {
        to: getHelpEntryPath('programmatic_access'),
        label: 'UniProt JAPI', // TODO: this goes to the same place as above but these links are subject to change anyway
      },
    ],
    moreTo: getHelpEntryPath('technical'),
    image: <img src={Terminal} width="52" height="41" alt="" />,
  },
  {
    title: 'Biocuration',
    linkList: [
      {
        to: getHelpEntryPath('biocuration'),
        label: 'UniProt biocuration',
      },
      {
        to: {
          pathname: LocationToPath[Location.HelpResults],
          search: '?query=*&facets=category:biocuration',
        },
        label: 'Biocuration projects',
      },
    ],
    moreTo: {
      pathname: LocationToPath[Location.HelpResults],
      search: '?query=*&facets=category:biocuration',
    },
    image: <img src={Reader} width="52" height="59" alt="" />,
  },
  {
    title: 'About us',
    linkList: [
      {
        to: getHelpEntryPath('about'),
        label: 'About UniProt',
      },
      {
        to: getHelpEntryPath('publications'),
        label: 'How to cite us',
      },
    ],
    moreTo: {
      pathname: LocationToPath[Location.HelpResults],
      search: '?query=*&facets=category:About UniProt',
    },
    image: (
      <div
        style={{
          opacity: 0.8, // To match the rest of the SVGs
          color: colors.helpGreen,
        }}
      >
        <CommunityAnnotationIcon />
      </div>
    ),
  },
];

const HelpLandingPage = () => (
  <>
    <main
      className={cn(
        'uniprot-grid uniprot-grid--centered',
        landing['help-landing']
      )}
    >
      <HTMLHead title="Help" />
      <PageIntro heading="Help center" className="uniprot-grid-cell--span-12" />
      <div className="uniprot-grid-cell--span-9">
        <HelpQuickSearch />
        <div className={landing['help-landing__tiles']}>
          {tileData.map((data) => (
            <IllustratedListTile key={data.title} {...data} />
          ))}
        </div>
      </div>
      <div className="uniprot-grid-cell--span-3">
        <section className={landing['help-landing__faqs']}>
          <h2 className="small">Suggested FAQs</h2>
          <ul className="no-bullet">
            <li>
              <Link to={getHelpEntryPath('disease_query')}>
                How can I get all the proteins involved in a given disease?
              </Link>
            </li>
            <li>
              <Link to={getHelpEntryPath('canonical_and_isoforms')}>
                What is the canonical sequence?
              </Link>
            </li>
            <li>
              <Link to={getHelpEntryPath('reference_proteome')}>
                What are reference proteomes?
              </Link>
            </li>
          </ul>
          <Link
            to={{
              pathname: LocationToPath[Location.HelpResults],
              search: '?query=*&facets=category:faq',
            }}
          >
            View all FAQs
          </Link>
        </section>
        <section className={landing['help-landing__contact']}>
          <Contact />
        </section>
        <section className={landing['help-landing__videos']}>
          <h4>Help videos</h4>
          <div className={landing['help-landing__videos__list']}>
            <YouTubeEmbed
              videoid="yp1O1gDK8oA"
              title="How to search UniProtKB"
            />
            {/* TODO: include more videos as they become available */}
          </div>
        </section>
      </div>
    </main>
    <ErrorBoundary>
      <Suspense fallback={null}>
        <UniProtFooter />
      </Suspense>
    </ErrorBoundary>
  </>
);

export default HelpLandingPage;
