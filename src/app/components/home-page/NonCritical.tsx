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
    {' '}
    <div
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        styles['home-page-section']
      )}
    >
      <Message level="info" className="uniprot-grid-cell--span-12">
        <small>
          Do data resources managed by EMBL-EBI and our collaborators make a
          difference to your work?
          <br />
          Please take 10 minutes to fill in our annual user survey, and help us
          make the case for why sustaining open data resources is critical for
          life sciences research.
          <br />
          Survey link:{' '}
          <ExternalLink url="https://www.surveymonkey.com/r/HJKYKTT?channel=uniprot">
            https://www.surveymonkey.com/r/HJKYKTT
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
