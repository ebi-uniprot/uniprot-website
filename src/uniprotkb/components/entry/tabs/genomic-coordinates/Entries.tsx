import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, InfoList, LongNumber, Message } from 'franklin-sites';
import { groupBy } from 'lodash-es';
import cn from 'classnames';

import ExternalLink from '../../../../../shared/components/ExternalLink';
// import DatatableWrapper from '../../../../../shared/components/views/DatatableWrapper';
import Table from './Table';
import GenomicLoc, { getEnsemblLink } from './GenomicLoc';
import AddToBasketButton from '../../../../../shared/components/action-buttons/AddToBasket';

import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';

import { processUrlTemplate } from '../../../../../shared/utils/xrefs';
import { pluralise } from '../../../../../shared/utils/utils';
import listFormat from '../../../../../shared/utils/listFormat';
import {
  getEntryPathFor,
  getURLToJobWithData,
} from '../../../../../app/config/urls';
import { sortExons } from './utils';

import { Namespace } from '../../../../../shared/types/namespaces';
import { TabLocation } from '../../../../types/entry';
import { FlatGenomicEntry, GroupedExon } from './types';
import { DatabaseInfoPoint } from '../../../../types/databaseRefs';
import { JobTypes } from '../../../../../tools/types/toolsJobTypes';

import styles from './styles/entries.module.scss';
import helper from '../../../../../shared/styles/helper.module.scss';

const getEntryPathForUniprotKB = getEntryPathFor(Namespace.uniprotkb);

type EntryProps = {
  entries: FlatGenomicEntry[];
  xrefInfo: DatabaseInfoPoint;
  isEnsemblID?: boolean;
  oneIsoformOnly: boolean;
};

const Entry = ({
  entries,
  xrefInfo,
  isEnsemblID,
  oneIsoformOnly,
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
          {entries.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              {entry.gnCoordinate.ensemblTranscriptId &&
                (xrefInfo.uriLink ? (
                  <ExternalLink
                    url={processUrlTemplate(xrefInfo.uriLink, {
                      id: entry.gnCoordinate.ensemblTranscriptId,
                    })}
                  >
                    {entry.gnCoordinate.ensemblTranscriptId}
                  </ExternalLink>
                ) : (
                  entry.gnCoordinate.ensemblTranscriptId
                ))}
              {entry.gnCoordinate.ensemblTranslationId &&
                (xrefInfo.uriLink ? (
                  <ExternalLink
                    url={processUrlTemplate(xrefInfo.uriLink, {
                      id: entry.gnCoordinate.ensemblTranslationId,
                    })}
                  >
                    {entry.gnCoordinate.ensemblTranslationId}
                  </ExternalLink>
                ) : (
                  entry.gnCoordinate.ensemblTranslationId
                ))}
            </div>
          ))}
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
      </h4>
      <InfoList infoData={infoData} columns />
    </section>
  );
};

type InnerRowProps = {
  exon: GroupedExon;
  xrefInfo: DatabaseInfoPoint;
  isEnsemblID: boolean;
};

const InnerRow = ({ exon, xrefInfo, isEnsemblID }: InnerRowProps) => (
  <>
    <td>
      {exon.transcriptID &&
        (xrefInfo.uriLink ? (
          <ExternalLink
            url={processUrlTemplate(xrefInfo.uriLink, {
              id: exon.transcriptID,
            })}
          >
            {exon.transcriptID}
          </ExternalLink>
        ) : (
          exon.transcriptID
        ))}
    </td>
    <td>
      {exon.translationID &&
        (xrefInfo.uriLink ? (
          <ExternalLink
            url={processUrlTemplate(xrefInfo.uriLink, {
              id: exon.translationID,
            })}
          >
            {exon.translationID}
          </ExternalLink>
        ) : (
          exon.translationID
        ))}
    </td>
    <td>
      {isEnsemblID && exon.id && xrefInfo.uriLink ? (
        <ExternalLink
          url={processUrlTemplate(xrefInfo.uriLink, {
            id: exon.id,
          })}
        >
          {exon.id}
        </ExternalLink>
      ) : (
        exon.id
      )}
    </td>
    <td>
      <Link to={getEntryPathForUniprotKB(exon.accession, TabLocation.Entry)}>
        {exon.accession}
      </Link>
    </td>
    <td>
      {exon.proteinLocation.position
        ? exon.proteinLocation.position.position
        : `${exon.proteinLocation.begin.position}-${exon.proteinLocation.end.position}`}
    </td>
    <td>
      <div className="button-group">
        <Button
          element="a"
          variant="tertiary"
          title="BLAST the sequence corresponding to this feature"
          href={getURLToJobWithData(JobTypes.BLAST, exon.accession, {
            start: exon.proteinLocation.position
              ? exon.proteinLocation.position.position
              : exon.proteinLocation.begin.position,
            end: exon.proteinLocation.position
              ? exon.proteinLocation.position.position
              : exon.proteinLocation.end.position,
          })}
          translate="no"
        >
          BLAST
        </Button>
        <AddToBasketButton
          selectedEntries={`${exon.accession}[${
            exon.proteinLocation.position
              ? exon.proteinLocation.position.position
              : `${exon.proteinLocation.begin.position}-${exon.proteinLocation.end.position}`
          }]`}
        />
      </div>
    </td>
  </>
);

type EntriesProps = {
  entries: Record<string, Array<FlatGenomicEntry>>;
  index: number;
  isoformIDs: string[];
};

const Entries = ({ entries, index, isoformIDs }: EntriesProps) => {
  const accessionEntriesPairs = Object.entries(entries);
  // First pair, entry info, first flattened entry info
  const representativeEntry = accessionEntriesPairs[0][1][0];

  const { Ensembl, EnsemblBacteria } =
    useDatabaseInfoMaps()?.databaseToDatabaseInfo || {};

  const isEnsemblID = Boolean(
    representativeEntry.gnCoordinate.ensemblGeneId?.startsWith('ENS')
  );
  let xrefInfo: DatabaseInfoPoint = EnsemblBacteria;
  if (isEnsemblID) {
    xrefInfo = Ensembl;
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
      content:
        representativeEntry.gnCoordinate.ensemblGeneId &&
        (xrefInfo.uriLink ? (
          <ExternalLink
            url={processUrlTemplate(xrefInfo.uriLink, {
              id: representativeEntry.gnCoordinate.ensemblGeneId,
            })}
          >
            {representativeEntry.gnCoordinate.ensemblGeneId}
          </ExternalLink>
        ) : (
          representativeEntry.gnCoordinate.ensemblGeneId
        )),
    },
  ];

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
        />
      ))}
      {/* <DatatableWrapper alwaysExpanded> */}
      <Table className={cn(styles['coordinates-table'], helper['no-wrap'])}>
        <Table.Head>
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
            </th>
          ))}
        </Table.Head>
        <Table.Body data={Object.entries(groupedExons)}>
          {([genomicCoordinates, exons]) => {
            const location = (
              <>
                {representativeEntry.gnCoordinate.genomicLocation.chromosome &&
                  `${representativeEntry.gnCoordinate.genomicLocation.chromosome}:`}
                {exons[0].genomeLocation.position ? (
                  <LongNumber>
                    {exons[0].genomeLocation.position.position}
                  </LongNumber>
                ) : (
                  <>
                    <LongNumber>
                      {representativeEntry.gnCoordinate.genomicLocation
                        .reverseStrand
                        ? exons[0].genomeLocation.end.position
                        : exons[0].genomeLocation.begin.position}
                    </LongNumber>
                    {' - '}
                    <LongNumber>
                      {representativeEntry.gnCoordinate.genomicLocation
                        .reverseStrand
                        ? exons[0].genomeLocation.begin.position
                        : exons[0].genomeLocation.end.position}
                    </LongNumber>
                  </>
                )}
              </>
            );

            return {
              key: genomicCoordinates,
              row: (
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
                                representativeEntry.gnCoordinate.genomicLocation
                                  .chromosome
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
                    const exon = exons.find(
                      (exon) => exon.accession === isoformID
                    );
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
                          <LongNumber>
                            {exon.proteinLocation.begin.position}
                          </LongNumber>
                        </td>
                        <td className={styles.coordinates}>-</td>
                        <td className={styles.coordinates}>
                          <LongNumber>
                            {exon.proteinLocation.end.position}
                          </LongNumber>
                        </td>
                        <td className={styles.coordinates} />
                      </Fragment>
                    );
                  })}
                </>
              ),
              extraContent: (
                <td colSpan={1 + 4 * mappedIsoforms.length}>
                  <Card>
                    <p>{new Set(exons.map((exon) => exon.proteinSequence))}</p>
                    <Table>
                      <Table.Head>
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
                            />
                          ),
                          extraContent: (
                            <td colSpan={6}>{exon.proteinSequence}</td>
                          ),
                        })}
                      </Table.Body>
                    </Table>
                  </Card>
                </td>
              ),
            };
          }}
        </Table.Body>
      </Table>
      <div className={styles['table-container']}>
        <table
          className={cn(
            styles.table,
            styles['coordinates-table'],
            helper['no-wrap']
          )}
        >
          <thead>
            <tr>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th />
              <th>Genomic coordinates</th>
              {mappedIsoforms.map((isoformID) => (
                <th
                  key={isoformID}
                  title={`Protein coordinates for ${isoformID} mapping to specific exons. Click to view isoform`}
                  colSpan={4}
                >
                  <Link
                    to={getEntryPathForUniprotKB(isoformID, TabLocation.Entry)}
                  >
                    {isoformID}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedExons).map(([id, exons]) => {
              const location = (
                <>
                  {representativeEntry.gnCoordinate.genomicLocation
                    .chromosome &&
                    `${representativeEntry.gnCoordinate.genomicLocation.chromosome}:`}
                  {exons[0].genomeLocation.position ? (
                    <LongNumber>
                      {exons[0].genomeLocation.position.position}
                    </LongNumber>
                  ) : (
                    <>
                      <LongNumber>
                        {representativeEntry.gnCoordinate.genomicLocation
                          .reverseStrand
                          ? exons[0].genomeLocation.end.position
                          : exons[0].genomeLocation.begin.position}
                      </LongNumber>
                      {' - '}
                      <LongNumber>
                        {representativeEntry.gnCoordinate.genomicLocation
                          .reverseStrand
                          ? exons[0].genomeLocation.begin.position
                          : exons[0].genomeLocation.end.position}
                      </LongNumber>
                    </>
                  )}
                </>
              );
              return (
                <Fragment key={id}>
                  <tr>
                    <td>
                      <label>
                        <input type="checkbox" />
                      </label>
                    </td>
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
                                  representativeEntry.gnCoordinate
                                    .genomicLocation.reverseStrand
                                    ? exons[0].genomeLocation.end.position
                                    : exons[0].genomeLocation.begin.position,
                                  representativeEntry.gnCoordinate
                                    .genomicLocation.reverseStrand
                                    ? exons[0].genomeLocation.begin.position
                                    : exons[0].genomeLocation.end.position,
                                  representativeEntry.gnCoordinate
                                    .genomicLocation.chromosome
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
                      const exon = exons.find(
                        (exon) => exon.accession === isoformID
                      );
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
                            <LongNumber>
                              {exon.proteinLocation.begin.position}
                            </LongNumber>
                          </td>
                          <td className={styles.coordinates}>-</td>
                          <td className={styles.coordinates}>
                            <LongNumber>
                              {exon.proteinLocation.end.position}
                            </LongNumber>
                          </td>
                          <td className={styles.coordinates} />
                        </Fragment>
                      );
                    })}
                  </tr>
                  <tr className={styles.extra}>
                    <td />
                    <td colSpan={1 + 4 * mappedIsoforms.length}>
                      {isEnsemblID && xrefInfo.uriLink ? (
                        <ExternalLink
                          url={processUrlTemplate(xrefInfo.uriLink, { id })}
                        >
                          {id}
                        </ExternalLink>
                      ) : (
                        id
                      )}
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* </DatatableWrapper> */}
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
