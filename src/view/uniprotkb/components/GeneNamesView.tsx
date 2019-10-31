import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList } from 'franklin-sites';
import { GeneNamesData } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';

export const geneAlternativeNamesView = (
  alternativeNames: { value: string }[],
  firstComma: boolean = true
) => {
  const altNames = alternativeNames.map(altName => altName.value).join(', ');
  return `${firstComma ? ', ' : ''}${altNames}`;
};

const GeneNamesView: React.FC<{
  geneNamesData: GeneNamesData;
  isCompact?: boolean;
}> = ({ geneNamesData, isCompact = false }) => (
  <Fragment>
    {geneNamesData.map(geneNames => {
      const infoData = [
        {
          title: 'Name',
          content: geneNames.geneName && (
            <Fragment>{geneNames.geneName.value}</Fragment>
          ),
        },
      ];
      if (geneNames.synonyms) {
        infoData.push({
          title: 'Synonyms',
          content: (
            <Fragment>
              {geneAlternativeNamesView(geneNames.synonyms, false)}
            </Fragment>
          ),
        });
      }
      if (geneNames.orfNames) {
        infoData.push({
          title: 'ORF names',
          content: (
            <Fragment>
              {geneAlternativeNamesView(geneNames.orfNames, false)}
            </Fragment>
          ),
        });
      }
      if (geneNames.orderedLocusNames) {
        infoData.push({
          title: 'Ordered locus names',
          content: (
            <Fragment>
              {geneAlternativeNamesView(geneNames.orderedLocusNames, false)}
            </Fragment>
          ),
        });
      }
      return (
        <InfoList
          infoData={infoData}
          key={geneNames.geneName ? geneNames.geneName.value : v1()}
          isCompact={isCompact}
          highlightFirstItem={isCompact}
        />
      );
    })}
  </Fragment>
);

export default GeneNamesView;
