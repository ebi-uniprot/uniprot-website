import { Card, ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import {
  type ModifiedPrediction,
  type UniFireModel,
} from '../../adapters/uniParcSubEntryConverter';

type Props = {
  data: UniFireModel | undefined;
};

const SubEntryKeywordsSection = ({ data }: Props) => {
  const keywordPredictions =
    (data?.predictions as ModifiedPrediction[])?.filter(
      (prediction) => prediction.annotationType === 'keyword'
    ) || [];
  const goPredictions =
    (data?.predictions as ModifiedPrediction[])?.filter(
      (prediction) => prediction.annotationType === 'xref.GO'
    ) || [];

  if (keywordPredictions.length || goPredictions.length) {
    return (
      <Card
        header={<h2>Keywords/GO</h2>}
        id="keywords_and_go"
        data-entry-section
      >
        {keywordPredictions.length ? (
          <>
            <h3>Keywords</h3>
            {keywordPredictions.map((prediction, index) => (
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
          </>
        ) : null}
        {goPredictions.length ? (
          <>
            <h3>Gene Ontology</h3>
            {goPredictions.map((prediction, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} style={{ margin: '0.5em 0' }}>
                <ExternalLink
                  url={externalUrls.QuickGOTerm(prediction.annotationValue)}
                >
                  {prediction.annotationValue}
                </ExternalLink>{' '}
                <UniProtKBEvidenceTag evidences={prediction.evidence} />
              </div>
            ))}
          </>
        ) : null}
      </Card>
    );
  }
  return null;
};

export default SubEntryKeywordsSection;
