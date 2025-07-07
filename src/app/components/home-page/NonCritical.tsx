import cn from 'classnames';
import { Message } from 'franklin-sites';
import { memo } from 'react';

import ExternalLink from '../../../shared/components/ExternalLink';
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
          We need your help! Has UniProt saved you time or effort? Please take
          15 minutes to fill in a survey and help EMBL-EBI make the case for why
          open data resources are critical to life science research.
          <br />
          <ExternalLink url="https://www.surveymonkey.com/r/QGFMBH8?channel=[webpage]">
            https://www.surveymonkey.com/r/QGFMBH8
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
