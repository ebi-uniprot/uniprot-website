import { memo, ReactNode } from 'react';
import { DoughnutChart, InfoList } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import { ECNumbersView } from './ProteinNamesView';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

const existenceRE = /^\d: /;

type Props = { data: Partial<UniProtkbAPIModel>; inCard?: boolean };

const ProteinOverview = ({ data, inCard }: Props) => {
  const name =
    data.proteinDescription?.recommendedName?.fullName.value ||
    data.proteinDescription?.submissionNames?.[0].fullName.value;

  const ecNumberNode = data.proteinDescription?.recommendedName?.ecNumbers && (
    <ECNumbersView
      ecNumbers={data.proteinDescription?.recommendedName?.ecNumbers}
      noEvidence
      noLinks
    />
  );

  let organismNameNode: ReactNode;
  if (
    data.organism &&
    (data.organism.scientificName || data.organism.taxonId)
  ) {
    organismNameNode = <TaxonomyView data={data.organism} />;
  }

  let geneNameListNode: string | undefined;
  if (data.genes) {
    geneNameListNode = data.genes
      .map(
        (geneName) =>
          `${
            geneName.geneName?.value ||
            geneName.orderedLocusNames?.map((name) => name.value).join(', ') ||
            geneName.orfNames?.map((name) => name.value).join(', ')
          }${
            geneName.synonyms
              ? ` (${geneName.synonyms
                  ?.map((synonym) => synonym.value)
                  .join(', ')})`
              : ''
          }`
      )
      .join('; ');
  }

  const proteinExistence = data.proteinExistence?.replace(existenceRE, '');

  const annotationScoreNode = data.annotationScore && (
    <DoughnutChart percent={data.annotationScore * 20} size="small">
      {`${data.annotationScore}/5`}
    </DoughnutChart>
  );

  if (inCard) {
    return (
      <div>
        {[
          name,
          organismNameNode,
          ecNumberNode,
          geneNameListNode && (
            <>
              <strong>Gene:</strong> {geneNameListNode}
            </>
          ),
          data.sequence?.length && `${data.sequence.length} amino acids`,
          proteinExistence,
          annotationScoreNode && (
            <>
              <strong>Annotation score:</strong> {annotationScoreNode}
            </>
          ),
        ]
          .filter(Boolean)
          .map((node, index) => (
            <>
              {index ? ' · ' : null}
              {node}
            </>
          ))}
      </div>
    );
  }

  const infoData = [
    { title: 'Protein', content: name },
    {
      title: 'Status',
      content: (
        <>
          <EntryTypeIcon entryType={data.entryType} />
          {data.entryType}
        </>
      ),
    },
    { title: 'Organism', content: organismNameNode },
    { title: 'Gene', content: geneNameListNode },
    { title: 'Amino acids', content: data.sequence?.length },
    {
      title: 'Protein existence',
      content: proteinExistence,
    },
    {
      title: 'Annotation score',
      content: annotationScoreNode,
    },
  ];

  return <InfoList columns infoData={infoData} />;
};

export default memo(ProteinOverview);
