import { Fragment, memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DoughnutChart, InfoList } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import { ECNumbersView } from './ProteinNamesView';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation } from '../entry/Entry';
import EntrySection from '../../types/entrySection';
import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

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
    if (inCard) {
      geneNameListNode = data.genes
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
        .join('; ');
    } else {
      geneNameListNode = data.genes
        .map((geneName) => geneName.geneName?.value)
        .filter(Boolean)
        .join('; ');
    }
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
          geneNameListNode && (
            <>
              <strong>Gene:</strong> {geneNameListNode}
            </>
          ),
          organismNameNode,
          ecNumberNode,
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
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              {index ? ' · ' : null}
              {node}
            </Fragment>
          ))}
      </div>
    );
  }

  const infoData = [
    {
      title: <span data-article-id="protein_names">Protein</span>,
      content: name && <strong>{name}</strong>,
    },
    {
      title: <span data-article-id="gene_name">Gene</span>,
      content: geneNameListNode && <strong>{geneNameListNode}</strong>,
    },
    {
      title: <span data-article-id="entry_status">Status</span>,
      content: (
        <>
          <EntryTypeIcon entryType={data.entryType} />
          {data.entryType}
        </>
      ),
    },
    {
      title: <span data-article-id="organism-name">Organism</span>,
      content: organismNameNode,
    },
    {
      title: 'Amino acids',
      content: (
        <span>
          {data.sequence?.length}{' '}
          {data.primaryAccession && (
            <small>
              {/* eslint-disable-next-line uniprot-website/use-config-location */}
              <Link
                to={{
                  pathname: getEntryPath(
                    Namespace.uniprotkb,
                    data.primaryAccession,
                    TabLocation.Entry
                  ),
                  hash: EntrySection.Sequence,
                }}
              >
                (go to sequence)
              </Link>
            </small>
          )}
        </span>
      ),
    },
    {
      title: <span data-article-id="protein_existence">Protein existence</span>,
      content: proteinExistence,
    },
    {
      title: <span data-article-id="annotation_score">Annotation score</span>,
      content: annotationScoreNode,
    },
  ];

  return <InfoList columns infoData={infoData} />;
};

export default memo(ProteinOverview);
