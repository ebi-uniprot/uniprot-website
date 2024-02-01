import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Chip, InfoList, LongNumber, Message } from 'franklin-sites';
import { groupBy } from 'lodash-es';
import cn from 'classnames';

import ExternalLink from '../../../../../shared/components/ExternalLink';
// import DatatableWrapper from '../../../../../shared/components/views/DatatableWrapper';
import Table from './Table';
import GenomicLoc, { getEnsemblLink } from './GenomicLoc';
import AddToBasketButton from '../../../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../../../shared/components/action-buttons/Align';
import BlastButton from '../../../../../shared/components/action-buttons/Blast';

import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';

import { processUrlTemplate } from '../../../../../shared/utils/xrefs';
import { pluralise } from '../../../../../shared/utils/utils';
import listFormat from '../../../../../shared/utils/listFormat';
import { getEntryPathFor } from '../../../../../app/config/urls';
import { sortExons } from './utils';

import { Namespace } from '../../../../../shared/types/namespaces';
import { TabLocation } from '../../../../types/entry';
import { FlatGenomicEntry, GroupedExon } from './types';
import { DatabaseInfoPoint } from '../../../../types/databaseRefs';

import styles from './styles/entries.module.scss';
import helper from '../../../../../shared/styles/helper.module.scss';
import LazyComponent from '../../../../../shared/components/LazyComponent';

const getEntryPathForUniprotKB = getEntryPathFor(Namespace.uniprotkb);

type EntryProps = {
  entries: FlatGenomicEntry[];
  xrefInfo?: DatabaseInfoPoint;
  isEnsemblID?: boolean;
  oneIsoformOnly: boolean;
  isCanonical: boolean;
  maneSelect: Set<string>;
};

const Entry = ({
  entries,
  xrefInfo,
  isEnsemblID,
  oneIsoformOnly,
  isCanonical,
  maneSelect,
}: EntryProps) => {
  const representativeEntry = entries[0];

  const infoData = [
    {
      title: 'Genomic location',
      content: representativeEntry.gnCoordinate.genomicLocation.start &&
        representativeEntry.gnCoordinate.genomicLocation.end && (
          <GenomicLoc
            genomicLocation={representativeEntry.gnCoordinate.genomicLocation}
            taxID={entries[0].taxid}
            noLink={!isEnsemblID}
          />
        ),
    },
    {
      title: 'Number of exons',
      content: representativeEntry.gnCoordinate.genomicLocation.exon.length,
    },
    {
      title: `${isEnsemblID ? 'Ensembl t' : 'T'}ranscript and translation IDs`,
      content: (
        <>
          {entries.map((entry, index) => {
            const { ensemblTranscriptId, ensemblTranslationId } =
              entry.gnCoordinate;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <ExternalLink
                  url={
                    (ensemblTranscriptId &&
                      processUrlTemplate(xrefInfo?.uriLink, {
                        id: ensemblTranscriptId,
                      })) ||
                    null
                  }
                >
                  {ensemblTranscriptId}
                </ExternalLink>
                <ExternalLink
                  url={
                    (ensemblTranslationId &&
                      processUrlTemplate(xrefInfo?.uriLink, {
                        id: ensemblTranslationId,
                      })) ||
                    null
                  }
                >
                  {ensemblTranslationId}
                </ExternalLink>
                {ensemblTranscriptId && maneSelect.has(ensemblTranscriptId) && (
                  <Chip compact>MANE-Select</Chip>
                )}
              </div>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <section>
      <h4 className={cn({ 'visually-hidden': oneIsoformOnly })}>
        Isoform:{' '}
        <Link
          to={getEntryPathForUniprotKB(
            representativeEntry.accession,
            TabLocation.Entry
          )}
        >
          {representativeEntry.accession}
        </Link>
        {isCanonical && <Chip compact>canonical</Chip>}
      </h4>
      <InfoList infoData={infoData} columns />
    </section>
  );
};

type InnerRowProps = {
  exon: GroupedExon;
  xrefInfo?: DatabaseInfoPoint;
  isEnsemblID: boolean;
  canonical: string;
  maneSelect?: string;
};

const InnerRow = ({
  exon,
  xrefInfo,
  isEnsemblID,
  canonical,
  maneSelect,
}: InnerRowProps) => (
  <>
    <td>
      <ExternalLink
        url={
          (exon.transcriptID &&
            processUrlTemplate(xrefInfo?.uriLink, {
              id: exon.transcriptID,
            })) ||
          null
        }
      >
        {exon.transcriptID}
      </ExternalLink>
    </td>
    <td>
      <ExternalLink
        url={
          (exon.translationID &&
            processUrlTemplate(xrefInfo?.uriLink, {
              id: exon.translationID,
            })) ||
          null
        }
      >
        {exon.translationID}
      </ExternalLink>
    </td>
    <td>
      <ExternalLink
        url={
          (isEnsemblID &&
            exon.id &&
            processUrlTemplate(xrefInfo?.uriLink, {
              id: exon.id,
            })) ||
          null
        }
      >
        {exon.id}
      </ExternalLink>
    </td>
    <td>
      <Link to={getEntryPathForUniprotKB(exon.accession, TabLocation.Entry)}>
        {exon.accession}
      </Link>
      {exon.accession === canonical && <Chip compact>canonical</Chip>}
      {exon.transcriptID === maneSelect && <Chip compact>MANE-Select</Chip>}
    </td>
    <td>
      {exon.proteinLocation.position
        ? exon.proteinLocation.position.position
        : `${exon.proteinLocation.begin.position}-${exon.proteinLocation.end.position}`}
    </td>
    <td>
      <div className="button-group">
        <BlastButton selectedEntries={[exon.accessionWithCoordinates]} />
        <AddToBasketButton selectedEntries={exon.accessionWithCoordinates} />
      </div>
    </td>
  </>
);

type RowProps = {
  representativeEntry: FlatGenomicEntry;
  exons: GroupedExon[];
  isEnsemblID: boolean;
  mappedIsoforms: string[];
};

const Row = ({
  representativeEntry,
  exons,
  isEnsemblID,
  mappedIsoforms,
}: RowProps) => {
  const location = (
    <>
      {representativeEntry.gnCoordinate.genomicLocation.chromosome &&
        `${representativeEntry.gnCoordinate.genomicLocation.chromosome}:`}
      {exons[0].genomeLocation.position ? (
        <LongNumber>{exons[0].genomeLocation.position.position}</LongNumber>
      ) : (
        <>
          <LongNumber>
            {representativeEntry.gnCoordinate.genomicLocation.reverseStrand
              ? exons[0].genomeLocation.end.position
              : exons[0].genomeLocation.begin.position}
          </LongNumber>
          {' - '}
          <LongNumber>
            {representativeEntry.gnCoordinate.genomicLocation.reverseStrand
              ? exons[0].genomeLocation.begin.position
              : exons[0].genomeLocation.end.position}
          </LongNumber>
        </>
      )}
    </>
  );
  return (
    <>
      <td>
        {isEnsemblID ? (
          <ExternalLink
            url={
              exons[0].genomeLocation.position
                ? getEnsemblLink(
                    representativeEntry.taxid,
                    exons[0].genomeLocation.position.position
                  )
                : getEnsemblLink(
                    representativeEntry.taxid,
                    representativeEntry.gnCoordinate.genomicLocation
                      .reverseStrand
                      ? exons[0].genomeLocation.end.position
                      : exons[0].genomeLocation.begin.position,
                    representativeEntry.gnCoordinate.genomicLocation
                      .reverseStrand
                      ? exons[0].genomeLocation.begin.position
                      : exons[0].genomeLocation.end.position,
                    representativeEntry.gnCoordinate.genomicLocation.chromosome
                  )
            }
          >
            {location}
          </ExternalLink>
        ) : (
          location
        )}
      </td>
      {mappedIsoforms.map((isoformID) => {
        const exon = exons.find((exon) => exon.accession === isoformID);
        // Structure of the 4 elements:
        // td1: start
        // td2: separator (or "no data" line)
        // td3: end (or unique position)
        // td4: margin to separate from the next isoform
        if (!exon) {
          return (
            <Fragment key={isoformID}>
              <td className={styles.coordinates} />
              <td className={styles.coordinates}>―</td>
              <td className={styles.coordinates} />
              <td className={styles.coordinates} />
            </Fragment>
          );
        }
        if (exon.proteinLocation.position) {
          return (
            <Fragment key={isoformID}>
              <td className={styles.coordinates} />
              <td className={styles.coordinates} />
              <td className={styles.coordinates}>
                <LongNumber>
                  {exon.proteinLocation.position.position}
                </LongNumber>
              </td>
              <td className={styles.coordinates} />
            </Fragment>
          );
        }
        return (
          <Fragment key={isoformID}>
            <td className={styles.coordinates}>
              <LongNumber>{exon.proteinLocation.begin.position}</LongNumber>
            </td>
            <td className={styles.coordinates}>-</td>
            <td className={styles.coordinates}>
              <LongNumber>{exon.proteinLocation.end.position}</LongNumber>
            </td>
            <td className={styles.coordinates} />
          </Fragment>
        );
      })}
    </>
  );
};

type ExtraContentProps = {
  exons: GroupedExon[];
  xrefInfo?: DatabaseInfoPoint;
  isEnsemblID: boolean;
  canonical: string;
  maneSelect?: string;
  colSpan: number;
};

const ExtraContent = ({
  exons,
  xrefInfo,
  isEnsemblID,
  canonical,
  maneSelect,
  colSpan,
}: ExtraContentProps) => {
  const uniqueSequences = new Set(exons.map((exon) => exon.proteinSequence));

  return (
    <td colSpan={colSpan}>
      <Card>
        {exons.length > 1 && (
          <div>
            {uniqueSequences.size === 1 ? (
              'All proteins sequences from these exons are identical.'
            ) : (
              <>
                There are {uniqueSequences.size} unique protein sequences
                resulting from these {exons.length} exons.{' '}
                <div className="button-group">
                  <AlignButton
                    selectedEntries={exons.map(
                      (exon) => exon.accessionWithCoordinates
                    )}
                    textSuffix={`${exons.length} peptides`}
                  />
                </div>
              </>
            )}
          </div>
        )}
        <Table>
          <Table.Head toggleAll={exons.length > 1}>
            <th>Transcript ID</th>
            <th>Translation ID</th>
            <th>Exon ID</th>
            <th>UniProtKB Isoform</th>
            <th>Position(s)</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
          </Table.Head>
          <Table.Body data={exons}>
            {(exon) => ({
              key: `${exon.transcriptID}|${exon.translationID}|${exon.id}`,
              row: (
                <InnerRow
                  exon={exon}
                  xrefInfo={xrefInfo}
                  isEnsemblID={isEnsemblID}
                  canonical={canonical}
                  maneSelect={maneSelect}
                />
              ),
              extraContent: <td colSpan={6}>{exon.proteinSequence}</td>,
            })}
          </Table.Body>
        </Table>
      </Card>
    </td>
  );
};

type ExonTableProps = {
  accessionEntriesPairs: [string, FlatGenomicEntry[]][];
  xrefInfo?: DatabaseInfoPoint;
  mappedIsoforms: string[];
  isEnsemblID: boolean;
  canonical: string;
  maneSelect?: string;
};

const ExonTable = ({
  accessionEntriesPairs,
  xrefInfo,
  mappedIsoforms,
  isEnsemblID,
  canonical,
  maneSelect,
}: ExonTableProps) => {
  // First pair, entry info, first flattened entry info
  const representativeEntry = accessionEntriesPairs[0][1][0];

  // Grouped by their genomic position
  const groupedExons = groupBy<GroupedExon>(
    accessionEntriesPairs
      .map(([, entries]) =>
        entries.map((entry) =>
          entry.gnCoordinate.genomicLocation.exon.map((exon) => {
            const groupedExon: GroupedExon = {
              ...exon,
              // Add accession info to each exon info before flattening
              accession: entry.accession,
              // Add transcript info to each exon info before flattening
              transcriptID: entry.gnCoordinate.ensemblTranscriptId,
              // Add translation info to each exon info before flattening
              translationID: entry.gnCoordinate.ensemblTranslationId,
              proteinSequence: exon.proteinLocation.position
                ? entry.sequence.charAt(
                    exon.proteinLocation.position.position - 1
                  )
                : entry.sequence.slice(
                    exon.proteinLocation.begin.position - 1,
                    exon.proteinLocation.end.position - 1
                  ),
              accessionWithCoordinates: `${entry.accession}[${
                exon.proteinLocation.position
                  ? exon.proteinLocation.position.position
                  : `${exon.proteinLocation.begin.position}-${exon.proteinLocation.end.position}`
              }]`,
            };
            return groupedExon;
          })
        )
      )
      .flat(2)
      .sort(
        sortExons(
          representativeEntry.gnCoordinate.genomicLocation.reverseStrand
        )
      ),
    (data) =>
      data.genomeLocation.position?.position ||
      `${data.genomeLocation.begin?.position}-${data.genomeLocation.end?.position}`
  );

  const groupedExonEntries = Object.entries(groupedExons);

  return (
    <Table className={cn(styles['coordinates-table'], helper['no-wrap'])}>
      <Table.Head toggleAll={groupedExonEntries.length > 1}>
        <th>Genomic coordinates</th>
        {mappedIsoforms.map((isoformID) => (
          <th
            key={isoformID}
            title={`Protein coordinates for ${isoformID} mapping to specific exons. Click to view isoform`}
            colSpan={4}
          >
            <Link to={getEntryPathForUniprotKB(isoformID, TabLocation.Entry)}>
              {isoformID}
            </Link>
            {canonical === isoformID && (
              <>
                <br />
                <Chip compact>canonical</Chip>
              </>
            )}
          </th>
        ))}
      </Table.Head>
      <Table.Body data={groupedExonEntries}>
        {([genomicCoordinates, exons]) => ({
          key: genomicCoordinates,
          row: (
            <Row
              representativeEntry={representativeEntry}
              exons={exons}
              isEnsemblID={isEnsemblID}
              mappedIsoforms={mappedIsoforms}
            />
          ),
          extraContent: (
            <ExtraContent
              exons={exons}
              xrefInfo={xrefInfo}
              isEnsemblID={isEnsemblID}
              canonical={canonical}
              colSpan={1 + 4 * mappedIsoforms.length}
            />
          ),
        })}
      </Table.Body>
    </Table>
  );
};

type EntriesProps = {
  entries: Record<string, Array<FlatGenomicEntry>>;
  index: number;
  isoformIDs: string[];
  canonical: string;
  maneSelect: Set<string>;
};

const Entries = ({
  entries,
  index,
  isoformIDs,
  canonical,
  maneSelect,
}: EntriesProps) => {
  const accessionEntriesPairs = Object.entries(entries);
  // First pair, entry info, first flattened entry info
  const representativeEntry = accessionEntriesPairs[0][1][0];

  const databaseInfoMap = useDatabaseInfoMaps();

  const isEnsemblID = Boolean(
    representativeEntry.gnCoordinate.ensemblGeneId?.startsWith('ENS')
  );
  let xrefInfo = databaseInfoMap?.databaseToDatabaseInfo.EnsemblBacteria;
  if (isEnsemblID) {
    xrefInfo = databaseInfoMap?.databaseToDatabaseInfo.Ensembl;
  }

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

  const mappedIsoforms = accessionEntriesPairs.map(([accession]) => accession);
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
      {accessionEntriesPairs.map(([accession, entries]) => (
        <Entry
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
        <ExonTable
          accessionEntriesPairs={accessionEntriesPairs}
          xrefInfo={xrefInfo}
          mappedIsoforms={mappedIsoforms}
          isEnsemblID={isEnsemblID}
          canonical={canonical}
          maneSelect={maneSelect}
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

export default Entries;
