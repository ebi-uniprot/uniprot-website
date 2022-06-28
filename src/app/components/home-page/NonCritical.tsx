import { memo } from 'react';
import { Message } from 'franklin-sites';
import { generatePath, Link } from 'react-router-dom';
import cn from 'classnames';

import ExternalLink from '../../../shared/components/ExternalLink';

// Sections
import CoreData from './CoreData';
import SupportingData from './SupportingData';
import LatestNews from './LatestNews';
import AnalysisTools from './AnalysisTools';
import NeedHelp from './NeedHelp';
import UniProtData from './UniProtData';

import { LocationToPath, Location } from '../../config/urls';

import styles from './styles/non-critical.module.scss';

const HomePageNonCritical = () => (
  <>
    <div
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        styles['home-page-section']
      )}
    >
      <Message level="info" className="uniprot-grid-cell--span-12">
        Accessing UniProt programmatically? Have a look at the{' '}
        <Link
          to={generatePath(LocationToPath[Location.HelpEntry], {
            accession: 'api',
          })}
        >
          new API documentation
        </Link>
        .
      </Message>
      <Message level="info" className="uniprot-grid-cell--span-12">
        If you still need it, the{' '}
        <ExternalLink url="https://legacy.uniprot.org" rel="nofollow" noIcon>
          legacy version of the website
        </ExternalLink>{' '}
        is available until the 2022_03 release.
      </Message>
    </div>

    <CoreData />

    <SupportingData />

    <LatestNews />

    <AnalysisTools />

    <NeedHelp />

    <UniProtData />
  </>
);

export default memo(HomePageNonCritical);
