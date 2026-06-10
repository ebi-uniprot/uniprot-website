import cn from 'classnames';
import { ExternalLink, Message } from 'franklin-sites';
import { memo } from 'react';

import AnalysisTools from './AnalysisTools';
import CoreData from './CoreData';
import LatestNews from './LatestNews';
import NeedHelp from './NeedHelp';
import styles from './styles/non-critical.module.scss';
import SupportingData from './SupportingData';
import UniProtData from './UniProtData';

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
          Help us keep delivering gold-standard protein knowledge in the Age of
          AI. Share your thoughts via our survey:{' '}
          <ExternalLink url="https://forms.gle/mnn7j2RuveHW4d7d7">
            UniProt in the Age of AI
          </ExternalLink>
          .
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
