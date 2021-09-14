import { generatePath, Link } from 'react-router-dom';
import { CommunityAnnotationIcon } from 'franklin-sites';
import cn from 'classnames';

import HelpQuickSearch from './HelpQuickSearch';
import { Contact } from '../../../shared/components/layouts/UniProtFooter';
import IllustratedListTile from './IllustratedListTile';

import { NamespaceLabels } from '../../../shared/types/namespaces';
import {
  LocationToPath,
  Location,
  getHelpEntryPath,
} from '../../../app/config/urls';

import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import DB from './svgs/db.svg';
import Cog from './svgs/cog.svg';
import TalkingPerson from './svgs/talking-person.svg';
import Terminal from './svgs/terminal.svg';
import Reader from './svgs/reader.svg';

import landing from './styles/help-landing-page.module.scss';

const tileData = [
  {
    title: 'UniProt data',
    linkList: [
      {
        to: getHelpEntryPath('uniprotkb_manual'),
        label: NamespaceLabels.uniprotkb,
      },
      {
        to: getHelpEntryPath('proteomes_manual'),
        label: NamespaceLabels.proteomes,
      },
      {
        to: getHelpEntryPath('uniref'),
        label: NamespaceLabels.uniref,
      },
      {
        to: getHelpEntryPath('uniparc'),
        label: NamespaceLabels.uniparc,
      },
    ],
    moreTo: getHelpEntryPath('data'),
    image: <DB />,
  },
  {
    title: 'Get started',
    linkList: [
      {
        to: getHelpEntryPath('uniprotkb_manual'),
        label: 'UniProtKB manual',
      },
      {
        to: getHelpEntryPath('text-search'),
        label: 'Text search and advanced search',
      },
    ],
    moreTo: 'https://www.ebi.ac.uk/training/online/courses/uniprot-quick-tour',
    image: <Cog />,
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
    moreTo: generatePath(LocationToPath[Location.HelpEntry], {
      accession: 'data',
    }),
    image: <TalkingPerson />,
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
        label: 'UniProt JAPI',
      },
    ],
    moreTo: getHelpEntryPath('technical'),
    image: <Terminal />,
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
    moreTo: getHelpEntryPath('biocuration'),
    image: <Reader />,
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
    moreTo: getHelpEntryPath('about'),
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
  <div
    className={cn(
      'uniprot-grid uniprot-grid--centered',
      landing['help-landing']
    )}
  >
    <h2 className="uniprot-grid-cell--span-12">Help center</h2>
    <div className="uniprot-grid-cell--span-9">
      <HelpQuickSearch />
      <div className={landing['help-landing__tiles']}>
        {tileData.map((data) => (
          <IllustratedListTile {...data} />
        ))}
      </div>
    </div>
    <div
      className={cn(
        'uniprot-grid-cell--span-3',
        landing['help-landing__faq-contact']
      )}
    >
      <h4>Suggested FAQs</h4>
      <ul className="no-bullet">
        <li>How can I get all the proteins involved in a given disease?</li>
        <li>What is the canonical sequence? </li>
        <li>What are reference proteomes?</li>
      </ul>
      <div className={landing['help-landing__faq-contact__view-all']}>
        View all FAQs
      </div>
      <Contact />
    </div>
    <div className="uniprot-grid-cell--span-3">
      <h4>Help videos</h4>
    </div>
  </div>
);

export default HelpLandingPage;
