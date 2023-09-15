import { memo } from 'react';
import { Message } from 'franklin-sites';
import cn from 'classnames';

// Sections
import CoreData from './CoreData';
import SupportingData from './SupportingData';
import LatestNews from './LatestNews';
import AnalysisTools from './AnalysisTools';
import NeedHelp from './NeedHelp';
import UniProtData from './UniProtData';

import ExternalLink from '../../../shared/components/ExternalLink';

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
        <small>
          We are excited to share that it&apos;s been a year since we have been
          providing our services through the new UniProt website. To help us
          improve our services and better meet your needs, please take a few
          minutes to complete our{' '}
          <ExternalLink url="https://forms.gle/BMX8Ln6f6Bnbt25q8">
            survey
          </ExternalLink>
        </small>
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
