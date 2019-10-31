import React, { FC } from 'react';
import { InfoList } from 'franklin-sites';
import idx from 'idx';
import OrganismView from './OrganismView';
import { UniProtkbUIModel } from '../../../model/uniprotkb/UniProtkbConverter';
import EntrySection from '../../../model/types/EntrySection';
import AnnotationScoreDoughnutChart from './AnnotationScoreDoughnutChart';
import GeneNamesView from './GeneNamesView';

export const ProteinOverview: FC<{
  transformedData: UniProtkbUIModel;
}> = ({ transformedData }) => {
  const { proteinExistence, annotationScore } = transformedData;
  const { proteinNamesData, geneNamesData, organismData } = transformedData[
    EntrySection.NamesAndTaxonomy
  ];
  const proteinName = idx(
    proteinNamesData,
    o => o.recommendedName.fullName.value
  );
  const ECnumbers = idx(proteinNamesData, o => o.recommendedName.ecNumbers);

  const infoListData = [
    {
      title: 'Name',
      content: proteinName,
    },
    {
      title: 'EC number',
      content:
        ECnumbers && ECnumbers.map(ec => <div key={ec.value}>{ec.value}</div>),
    },
    {
      title: 'Organism',
      content: organismData && <OrganismView data={organismData} />,
    },
    {
      title: 'Gene',
      content: geneNamesData && (
        <GeneNamesView geneNamesData={geneNamesData} isCompact />
      ),
    },
    {
      title: 'Evidence',
      content: proteinExistence,
    },
    {
      title: 'Annotation score',
      content: <AnnotationScoreDoughnutChart score={annotationScore} />,
    },
  ];

  return <InfoList infoData={infoListData} />;
};

export default ProteinOverview;
