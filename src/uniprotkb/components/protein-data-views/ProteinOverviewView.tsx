import { FC, ReactNode } from 'react';

import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from './AnnotationScoreDoughnutChart';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import { OrganismDataView } from '../../../shared/components/views/OrganismDataView';

const ProteinOverview: FC<{
  data: UniProtkbAPIModel;
}> = ({ data }) => {
  let recommendedNameNode;
  const recommendedName =
    data.proteinDescription?.recommendedName?.fullName.value;
  if (recommendedName) {
    recommendedNameNode = `${recommendedName} · `;
  }

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
        <OrganismDataView organism={data.organism} />
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
          .filter((geneName) => geneName.geneName)
          .map(
            (geneName) =>
              `${geneName.geneName?.value}${
                geneName.synonyms
                  ? ` (${geneName.synonyms
                      ?.map((synonym) => synonym.value)
                      .join(', ')})`
                  : ''
              }`
          )
          .join(', ')}
        {' · '}
      </>
    );
  }

  const sequenceLengthNode = `${data.sequence.length} amino-acids · `;

  const { annotationScore } = data;
  const annotationScoreNode = (
    <AnnotationScoreDoughnutChart
      score={annotationScore}
      size={DoughnutChartSize.small}
    />
  );

  return (
    <section>
      {recommendedNameNode}
      {organismNameNode}
      {ecNumberNode}
      {geneNameListNode}
      {sequenceLengthNode}
      {data.proteinExistence && `${data.proteinExistence} · `}
      {annotationScoreNode}
    </section>
  );
};

export default ProteinOverview;
