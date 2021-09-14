import { generatePath, Link } from 'react-router-dom';
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
import DB from './svgs/db.svg';
import landing from './styles/help-landing-page.module.scss';
/*

Get started
Training
Technical corner
Biocuration
About us
*/
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
        label: NamespaceLabels.uniprotkb,
      },
    ],
    moreTo: getHelpEntryPath('data'),
    image: 'image',
  },
  {
    title: 'Biocuration',
    linkList: [
      {
        to: getHelpEntryPath('uniprotkb_manual'),
        label: NamespaceLabels.uniprotkb,
      },
    ],
    moreTo: generatePath(LocationToPath[Location.HelpEntry], {
      accession: 'data',
    }),
    image: 'image',
  },
  {
    title: 'About us',
    linkList: [
      {
        to: getHelpEntryPath('uniprotkb_manual'),
        label: NamespaceLabels.uniprotkb,
      },
    ],
    moreTo: getHelpEntryPath('data'),
    image: 'image',
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
