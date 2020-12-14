import { FC, ReactNode } from 'react';
import { InfoList } from 'franklin-sites';

import { NameWithEvidence } from './ProteinNamesView';

import { GeneNamesData } from '../../adapters/namesAndTaxonomyConverter';

import { ValueWithEvidence } from '../../types/modelTypes';

export const geneAlternativeNamesView = (
  alternativeNames: ValueWithEvidence[],
  firstComma = true
) => (
  <>
    {firstComma && ', '}
    {alternativeNames
      .map<ReactNode>((altName) => (
        <NameWithEvidence data={altName} key={altName.value} />
      ))
      .reduce((prev, curr) => [prev, ', ', curr])}
  </>
);

const GeneNamesView: FC<{
  geneNamesData: GeneNamesData;
  isCompact?: boolean;
  noTitles?: boolean;
}> = ({ geneNamesData, isCompact = false, noTitles = false }) => (
  <>
    {geneNamesData.map((geneNames, index) => {
      const infoData = [
        {
          title: 'Name',
          content: geneNames.geneName && (
            <>
              <NameWithEvidence data={geneNames.geneName} />
            </>
          ),
        },
      ];
      if (geneNames.synonyms) {
        infoData.push({
          title: 'Synonyms',
          content: <>{geneAlternativeNamesView(geneNames.synonyms, false)}</>,
        });
      }
      if (geneNames.orfNames) {
        infoData.push({
          title: 'ORF names',
          content: <>{geneAlternativeNamesView(geneNames.orfNames, false)}</>,
        });
      }
      if (geneNames.orderedLocusNames) {
        infoData.push({
          title: 'Ordered locus names',
          content: (
            <>{geneAlternativeNamesView(geneNames.orderedLocusNames, false)}</>
          ),
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
  </>
);

export default GeneNamesView;
