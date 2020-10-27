import React, { FC } from 'react';
import { InfoList } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import EntrySection from '../../types/entrySection';
import AnnotationScoreDoughnutChart from './AnnotationScoreDoughnutChart';
import GeneNamesView from './GeneNamesView';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';

const ProteinOverview: FC<{
  transformedData: UniProtkbUIModel;
}> = ({ transformedData }) => {
  const { proteinExistence, annotationScore } = transformedData;
  const { proteinNamesData, geneNamesData, organismData } = transformedData[
    EntrySection.NamesAndTaxonomy
  ];

  const infoListData = [
    {
      title: 'Name',
      content: proteinNamesData?.recommendedName?.fullName.value,
    },
    {
      title: 'EC number',
      content: proteinNamesData?.recommendedName?.ecNumbers?.map((ec) => (
        <div key={ec.value}>{ec.value}</div>
      )),
    },
    {
      title: 'Organism',
      content: organismData && <TaxonomyView data={organismData} />,
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
