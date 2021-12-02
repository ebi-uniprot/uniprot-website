import { FC, ReactNode } from 'react';

import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from './AnnotationScoreDoughnutChart';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

const existenceRE = /^\d: /;

const ProteinOverview: FC<{
  // Note: it would be good to eventually use RenderColumnsInCard here
  // which would involve either converting UniProtkbAPIModel to UniProtkbUIModel
  // or refactoring UniProtKBColumnConfiguration to use UniProtkbAPIModel.
  data?: Partial<UniProtkbAPIModel>;
}> = ({ data }) => {
  if (!data) {
    return null;
  }
  const name =
    data.proteinDescription?.recommendedName?.fullName.value ||
    data.proteinDescription?.submissionNames?.[0].fullName.value;
  const nameNode = name && `${name} · `;

  const ecNumberNode = data.proteinDescription?.recommendedName?.ecNumbers && (
    <>
      <strong>EC number:</strong>{' '}
      {data.proteinDescription?.recommendedName?.ecNumbers
        ?.map((ec) => ec.value)
        .join(' ')}
      {' · '}
    </>
  );

  let organismNameNode: ReactNode;
  if (
    data.organism &&
    (data.organism.scientificName || data.organism.taxonId)
  ) {
    organismNameNode = (
      <>
        <TaxonomyView data={data.organism} />
        {' · '}
      </>
    );
  }

  let geneNameListNode;
  if (data.genes) {
    geneNameListNode = (
      <>
        <strong>Gene:</strong>{' '}
        {data.genes
          .map(
            (geneName) =>
              `${
                geneName.geneName?.value ||
                geneName.orderedLocusNames
                  ?.map((name) => name.value)
                  .join(', ') ||
                geneName.orfNames?.map((name) => name.value).join(', ')
              }${
                geneName.synonyms
                  ? ` (${geneName.synonyms
                      ?.map((synonym) => synonym.value)
                      .join(', ')})`
                  : ''
              }`
          )
          .join('; ')}
        {' · '}
      </>
    );
  }

  const sequenceLengthNode =
    data.sequence && `${data.sequence.length} amino acids · `;

  const { annotationScore } = data;
  const annotationScoreNode = typeof annotationScore !== 'undefined' && (
    <AnnotationScoreDoughnutChart
      score={annotationScore}
      size={DoughnutChartSize.small}
    />
  );

  return (
    <section>
      {nameNode}
      {organismNameNode}
      {ecNumberNode}
      {geneNameListNode}
      {sequenceLengthNode}
      {data.proteinExistence &&
        `${data.proteinExistence.replace(existenceRE, '')} · `}
      {annotationScoreNode}
    </section>
  );
};

export default ProteinOverview;
