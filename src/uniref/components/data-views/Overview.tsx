import React, { FC } from 'react';
import { InfoList } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
// import EntrySection from '../../types/entrySection';

import { UniRefUIModel } from '../../adapters/uniRefConverter';

export const Overview: FC<{
  transformedData: UniRefUIModel;
}> = ({ transformedData }) => {
  // const { proteinNamesData, geneNamesData, organismData } = transformedData[
  //   EntrySection.NamesAndTaxonomy
  // ];

  const updated = transformedData.updated
    ? new Date(transformedData.updated)
    : undefined;

  const infoListData = [
    {
      title: 'Name',
      content: transformedData.name,
    },
    {
      title: 'Common taxonomy',
      content: transformedData.commonTaxonId && transformedData.commonTaxon && (
        <TaxonomyView
          data={{
            taxonId: transformedData.commonTaxonId,
            scientificName: transformedData.commonTaxon,
          }}
        />
      ),
    },
    {
      title: 'Updated',
      content: updated && (
        <time dateTime={updated.toISOString()}>{transformedData.updated}</time>
      ),
    },
    // NOTE: add seed information?
    // NOTE: add members composition?
  ];

  return (
    <section>
      {transformedData.name && <p>{transformedData.name}</p>}
      <p>other text</p>
    </section>
  );
};

export default Overview;
