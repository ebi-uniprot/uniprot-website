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
          UniProt invites you to participate in a survey on the use and value of
          UniProt.{' '}
          <ExternalLink url="https://ec.europa.eu/eusurvey/runner/use_value_assessment_of_UniProt">
            Please click on the link provided to complete the survey
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
