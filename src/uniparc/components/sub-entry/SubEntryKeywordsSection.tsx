import { Card } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import {
  ModifiedPrediction,
  UniFireModel,
} from '../../adapters/uniParcSubEntryConverter';

type Props = {
  data: UniFireModel | undefined;
};

const SubEntryKeywordsSection = ({ data }: Props) => {
  const predictions =
    (data?.predictions as ModifiedPrediction[])?.filter(
      (prediction) => prediction.annotationType === 'keyword'
    ) || [];
  if (predictions?.length) {
    return (
      <Card header={<h2>Keywords</h2>} id="keywords" data-entry-section>
        {predictions.map((prediction, index) => (
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
            <UniProtKBEvidenceTag evidences={prediction.evidence} />
          </div>
        ))}
      </Card>
    );
  }
  return null;
};

export default SubEntryKeywordsSection;
