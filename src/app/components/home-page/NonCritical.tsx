import { memo } from 'react';
import { Message } from 'franklin-sites';
import { generatePath, Link } from 'react-router-dom';

// Sections
import CoreData from './CoreData';
import SupportingData from './SupportingData';
import LatestNews from './LatestNews';
import AnalysisTools from './AnalysisTools';
import NeedHelp from './NeedHelp';
import UniProtData from './UniProtData';

import { LocationToPath, Location } from '../../config/urls';

const HomePageNonCritical = () => (
  <>
    <div className="uniprot-grid uniprot-grid--centered">
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
