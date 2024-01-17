import { FC, Fragment } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';

import { NameWithEvidence } from './ProteinNamesView';

import { GeneNamesData } from '../../adapters/namesAndTaxonomyConverter';

import { ValueWithEvidence } from '../../types/modelTypes';

const geneAlternativeNamesView = (
  alternativeNames: ValueWithEvidence[],
  firstComma?: boolean
) => (
  <>
    {firstComma && ', '}
    {alternativeNames.map((altName, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {index ? ', ' : undefined}
        <NameWithEvidence data={altName} key={altName.value} />
      </Fragment>
    ))}
  </>
);

const GeneNamesView: FC<{
  geneNamesData: GeneNamesData;
  isCompact?: boolean;
  noTitles?: boolean;
}> = ({ geneNamesData, isCompact = false, noTitles = false }) => (
  <ExpandableList descriptionString="gene names">
    {geneNamesData.map((geneNames, index) => {
      const infoData = [
        {
          title: 'Name',
          content: geneNames.geneName && (
            <NameWithEvidence data={geneNames.geneName} />
          ),
        },
      ];
      if (geneNames.synonyms) {
        infoData.push({
          title: 'Synonyms',
          content: geneAlternativeNamesView(geneNames.synonyms),
        });
      }
      if (geneNames.orfNames) {
        infoData.push({
          title: 'ORF names',
          content: geneAlternativeNamesView(geneNames.orfNames),
        });
      }
      if (geneNames.orderedLocusNames) {
        infoData.push({
          title: 'Ordered locus names',
          content: geneAlternativeNamesView(geneNames.orderedLocusNames),
        });
      }
      return (
        <InfoList
          infoData={infoData}
          key={geneNames.geneName?.value || index}
          isCompact={isCompact}
          highlightFirstItem={isCompact}
          noTitles={noTitles}
        />
      );
    })}
  </ExpandableList>
);

export default GeneNamesView;
