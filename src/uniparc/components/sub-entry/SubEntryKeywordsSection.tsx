import { Card } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import { Evidence } from '../../../uniprotkb/types/modelTypes';
import { UniFireModel } from '../../adapters/uniParcSubEntryConverter';
import { constructPredictionEvidences } from './UniFirePredictionsList';

type Props = {
  data: UniFireModel | undefined;
};

const SubEntryKeywordsSection = ({ data }: Props) => {
  const predictions = data?.predictions?.filter(
    (prediction) => prediction.annotationType === 'keyword'
  );
  if (predictions?.length) {
    return (
      <Card header={<h2>Keywords</h2>} id="keywords" data-entry-section>
        {predictions.map((prediction, index) => {
          const evidences: Evidence[] = constructPredictionEvidences(
            prediction.evidence
          );
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={{ margin: '0.5em 0' }}>
              <Link
                to={{
                  pathname: LocationToPath[Location.KeywordsResults],
                  search: `query=(name:${prediction.annotationValue})&direct`,
                }}
              >
                {prediction.annotationValue}
              </Link>
              <UniProtKBEvidenceTag evidences={evidences} />
            </div>
          );
        })}
      </Card>
    );
  }
  return null;
};

export default SubEntryKeywordsSection;
