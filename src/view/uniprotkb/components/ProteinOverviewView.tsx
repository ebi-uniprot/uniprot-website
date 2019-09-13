import React, { FC } from 'react';
import { InfoList, Bubble } from 'franklin-sites';
import idx from 'idx';
import OrganismView from './OrganismView';
import GeneNamesView from './GeneNamesView';
import { UniProtkbUIModel } from '../../../model/uniprotkb/UniProtkbConverter';
import EntrySection from '../../../model/types/EntrySection';

export const ProteinOverview: FC<{
  transformedData: UniProtkbUIModel;
}> = ({ transformedData }) => {
  const { proteinExistence, annotationScore } = transformedData;
  const { proteinNamesData, geneNamesData, organismData } = transformedData[
    EntrySection.NamesAndTaxonomy
  ];
  const proteinName = idx(
    proteinNamesData,
    _ => _.recommendedName.fullName.value
  );
  const ECnumbers = idx(proteinNamesData, _ => _.recommendedName.ecNumbers);
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
      content: geneNamesData && <GeneNamesView {...geneNamesData} />,
    },
    {
      title: 'Evidence',
      content: proteinExistence,
    },
    {
      title: 'Annotation score',
      content: <Bubble value={annotationScore} />,
    },
  ];

  return <InfoList infoData={infoListData} />;
};

export default ProteinOverview;
