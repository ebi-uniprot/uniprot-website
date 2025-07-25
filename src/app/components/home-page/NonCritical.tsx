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
        Find out how much UniProt saves you!
        <br />
        Read CSIL’s cost-benefit analysis ‘
        <ExternalLink url="https://zenodo.org/records/15732022">
          ‘Measuring the value and impact of open science’
        </ExternalLink>
        ’, a case study on the financial impact of UniProt.
        <br />
        Read a summary of the report in our blog post: ‘
        <ExternalLink url="https://insideuniprot.blogspot.com/2025/06/uniprot-ultimate-colleague-on-your.html">
          UniProt - the ultimate colleague on your biological research team
        </ExternalLink>
        ’.
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
