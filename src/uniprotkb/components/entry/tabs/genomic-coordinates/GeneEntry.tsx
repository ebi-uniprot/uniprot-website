import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, ExternalLink, InfoList, Message } from 'franklin-sites';

import CoordinateTable from './CoordinateTable';
import Isoform from './Isoform';
import LazyComponent from '../../../../../shared/components/LazyComponent';

import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';

import listFormat from '../../../../../shared/utils/listFormat';
import { pluralise } from '../../../../../shared/utils/utils';
import { processUrlTemplate } from '../../../../../shared/utils/xrefs';
import { getEntryPathFor } from '../../../../../app/config/urls';

import { FlatGenomicEntry } from './types';
import { TabLocation } from '../../../../types/entry';
import { Namespace } from '../../../../../shared/types/namespaces';

const getEntryPathForUniprotKB = getEntryPathFor(Namespace.uniprotkb);

type GeneEntryProps = {
  entries: Record<string, Array<FlatGenomicEntry>>;
  index: number;
  isoformIDs: string[];
  canonical?: string;
  maneSelect: Set<string>;
};

const GeneEntry = ({
  entries,
  index,
  isoformIDs,
  canonical,
  maneSelect,
}: GeneEntryProps) => {
  const isoformGenomicEntryPairs = Object.entries(entries);
  // First pair, entry info, first flattened entry info
  const representativeEntry = isoformGenomicEntryPairs[0][1][0];

  const databaseInfoMap = useDatabaseInfoMaps();

  const isEnsemblID = Boolean(
    representativeEntry.gnCoordinate.ensemblGeneId?.startsWith('ENS')
  );
  const xrefInfo =
    databaseInfoMap?.databaseToDatabaseInfo[
      isEnsemblID ? 'Ensembl' : 'EnsemblBacteria'
    ];

  const infoData = [
    {
      title: 'Chromosome',
      content: representativeEntry.gnCoordinate.genomicLocation.chromosome,
    },
    {
      title: 'Strand',
      content: representativeEntry.gnCoordinate.genomicLocation.reverseStrand
        ? 'Reverse'
        : 'Forward',
    },
    {
      title: 'Assembly Name',
      content: representativeEntry.gnCoordinate.genomicLocation.assemblyName,
    },
    {
      title: 'Nucleotide ID',
      content: representativeEntry.gnCoordinate.genomicLocation.nucleotideId,
    },
    {
      title: `${isEnsemblID ? 'Ensembl g' : 'G'}ene ID`,
      content: (
        <ExternalLink
          url={
            (representativeEntry.gnCoordinate.ensemblGeneId &&
              processUrlTemplate(xrefInfo?.uriLink, {
                id: representativeEntry.gnCoordinate.ensemblGeneId,
              })) ||
            null
          }
        >
          {representativeEntry.gnCoordinate.ensemblGeneId}
        </ExternalLink>
      ),
    },
  ];

  const mappedIsoforms = isoformGenomicEntryPairs.map(
    ([accession]) => accession
  );
  const notMappedIsoforms = isoformIDs.filter(
    (isoform) => !mappedIsoforms.includes(isoform)
  );

  return (
    <Card
      header={
        <h3>
          {representativeEntry.gnCoordinate.ensemblGeneId
            ? // TODO: better gene name whenever the endpoint provides it
              `Gene ${representativeEntry.gnCoordinate.ensemblGeneId}`
            : `Genomic location ${index}`}
        </h3>
      }
    >
      <InfoList infoData={infoData} columns />
      {isoformGenomicEntryPairs.map(([accession, entries]) => (
        <Isoform
          key={accession}
          entries={entries}
          xrefInfo={xrefInfo}
          isEnsemblID={isEnsemblID}
          oneIsoformOnly={isoformIDs.length === 1}
          isCanonical={canonical === accession}
          maneSelect={maneSelect}
        />
      ))}
      <LazyComponent rootMargin="0px 0px">
        <CoordinateTable
          flatGenomicEntries={isoformGenomicEntryPairs.flatMap(
            ([, entries]) => entries
          )}
          xrefInfo={xrefInfo}
          mappedIsoforms={mappedIsoforms}
          isEnsemblID={isEnsemblID}
          canonical={canonical}
        />
      </LazyComponent>
      {notMappedIsoforms.length ? (
        <Message level="info">
          The {pluralise('isoform', notMappedIsoforms.length)}{' '}
          {notMappedIsoforms.map((isoformID, index) => (
            <Fragment key={isoformID}>
              {listFormat(index, notMappedIsoforms)}
              <Link to={getEntryPathForUniprotKB(isoformID, TabLocation.Entry)}>
                {isoformID}
              </Link>
            </Fragment>
          ))}{' '}
          {pluralise('has', notMappedIsoforms.length, 'have')} no known mapping
          for this genomic location
        </Message>
      ) : null}
    </Card>
  );
};

export default GeneEntry;
