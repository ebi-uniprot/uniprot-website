import { memo } from 'react';
import { Message } from 'franklin-sites';
import cn from 'classnames';

// Sections
import CoreData from './CoreData';
import ExtraLinks from './ExtraLinks';
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
        We need your help to understand how data is reused by biomedical
        resources! We have developed 2 surveys for{' '}
        <ExternalLink url="https://forms.gle/YwDc59mJcZ91rbsj8">
          users of biomedical resources
        </ExternalLink>
        and for{' '}
        <ExternalLink url="https://forms.gle/Fxy5iSqPzj4SCpzT7">
          resource providers
        </ExternalLink>
        . Please help by filling the appropriate one in by February 21
      </Message>
    </div>

    <CoreData />

    <ExtraLinks />

    <SupportingData />

    <LatestNews />

    <AnalysisTools />

    <NeedHelp />

    <UniProtData />
  </>
);

export default memo(HomePageNonCritical);
