import { Card, ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';
import { type UniProtkbUIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import KeywordView from '../../../uniprotkb/components/protein-data-views/KeywordView';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import UniProtKBEntrySection from '../../../uniprotkb/types/entrySection';
import { type KeywordUIModel } from '../../../uniprotkb/utils/KeywordsUtil';
import {
  type ModifiedPrediction,
  type UniFireModel,
} from '../../adapters/uniParcSubEntryConverter';

/**
 * Precomputed keywords whose category `uniProtKbConverter` sections into a page
 * the UniParc sub-entry does not render on its own — `Disease` (there is no
 * Diseases & Variants section) and `Coding sequence diversity` / `Technical
 * term` (the Sequence section is bespoke and entry-driven, so it ignores
 * annotation keywords). Collected here so they fall back into the Keywords & GO
 * section rather than being dropped.
 */
export const getFallbackKeywords = (
  annotations?: UniProtkbUIModel
): KeywordUIModel[] =>
  annotations
    ? [
        ...(annotations[UniProtKBEntrySection.DiseaseVariants]?.keywordData ??
          []),
        ...(annotations[UniProtKBEntrySection.Sequence]?.keywordData ?? []),
      ]
    : [];

const getPredictions = (
  unifire: UniFireModel | undefined,
  annotationType: string
): ModifiedPrediction[] =>
  (unifire?.predictions as ModifiedPrediction[])?.filter(
    (prediction) => prediction.annotationType === annotationType
  ) ?? [];

/** Whether the Keywords & GO section has anything to show, for either source. */
export const keywordsAndGOSectionHasContent = (
  unifire?: UniFireModel,
  annotations?: UniProtkbUIModel
): boolean =>
  getPredictions(unifire, 'keyword').length > 0 ||
  getPredictions(unifire, 'xref.GO').length > 0 ||
  getFallbackKeywords(annotations).length > 0;

type Props = {
  unifire?: UniFireModel;
  annotations?: UniProtkbUIModel;
};

const SubEntryKeywordsSection = ({ unifire, annotations }: Props) => {
  const keywordPredictions = getPredictions(unifire, 'keyword');
  const goPredictions = getPredictions(unifire, 'xref.GO');
  const fallbackKeywords = getFallbackKeywords(annotations);

  if (
    !keywordPredictions.length &&
    !goPredictions.length &&
    !fallbackKeywords.length
  ) {
    return null;
  }

  return (
    <Card
      header={<h2>Keywords & Gene Ontology</h2>}
      id="keywords_and_go"
      data-entry-section
    >
      {keywordPredictions.length ? (
        <>
          <h3>Keywords</h3>
          {keywordPredictions.map((prediction, index) => (
            // eslint-disable-next-line @eslint-react/no-array-index-key
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
      {/* Precomputed keywords whose category has no dedicated sub-entry
          section — rendered here so they are not dropped. KeywordView renders
          nothing when the list is empty (the UniFire branch). */}
      <KeywordView keywords={fallbackKeywords} />
      {goPredictions.length ? (
        <>
          <h3>Gene Ontology</h3>
          {goPredictions
            .filter(
              (
                prediction
              ): prediction is ModifiedPrediction & {
                annotationValue: string;
              } => Boolean(prediction.annotationValue)
            )
            .map((prediction, index) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key
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
};

export default SubEntryKeywordsSection;
