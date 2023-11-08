import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, InfoList, LongNumber, Message } from 'franklin-sites';
import { groupBy } from 'lodash-es';

import cn from 'classnames';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import DatatableWrapper from '../../../../../shared/components/views/DatatableWrapper';
import GenomicLoc, { getEnsemblLink } from './GenomicLoc';

import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';

import { processUrlTemplate } from '../../../protein-data-views/XRefView';
import { pluralise } from '../../../../../shared/utils/utils';
import listFormat from '../../../../../shared/utils/listFormat';
import { getEntryPathFor } from '../../../../../app/config/urls';
import { sortExons } from './utils';

import { Namespace } from '../../../../../shared/types/namespaces';
import { TabLocation } from '../../Entry';
import { FlatGenomicEntry } from './types';
import { DatabaseInfoPoint } from '../../../../types/databaseRefs';

import styles from './styles/entries.module.css';
import helper from '../../../../../shared/styles/helper.module.scss';

const getEntryPathForUniprotKB = getEntryPathFor(Namespace.uniprotkb);

type EntryProps = {
  entries: FlatGenomicEntry[];
  xrefInfo: DatabaseInfoPoint | null;
  ensID?: boolean;
  oneIsoformOnly: boolean;
};

const Entry = ({ entries, xrefInfo, ensID, oneIsoformOnly }: EntryProps) => {
  const representativeEntry = entries[0];

  const infoData = [
    {
      title: 'Genomic location',
      content: representativeEntry.gnCoordinate.genomicLocation.start &&
        representativeEntry.gnCoordinate.genomicLocation.end && (
          <GenomicLoc
            genomicLocation={representativeEntry.gnCoordinate.genomicLocation}
            taxID={entries[0].taxid}
            noLink={!ensID}
          />
        ),
    },
    {
      title: 'Number of exons',
      content: representativeEntry.gnCoordinate.genomicLocation.exon.length,
    },
    {
      title: `${ensID ? 'Ensembl t' : 'T'}ranslation ${pluralise(
        'ID',
        entries.length
      )}`,
      content: (
        <>
          {entries.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              {listFormat(index, entries)}
              {entry.gnCoordinate.ensemblTranslationId &&
                (xrefInfo?.uriLink ? (
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
            </Fragment>
          ))}
        </>
      ),
    },
    {
      title: `${ensID ? 'Ensembl t' : 'T'}ranscript ${pluralise(
        'ID',
        entries.length
      )}`,
      content: (
        <>
          {entries.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              {listFormat(index, entries)}
              {entry.gnCoordinate.ensemblTranscriptId &&
                (xrefInfo?.uriLink ? (
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
            </Fragment>
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

  const ensID =
    representativeEntry.gnCoordinate.ensemblGeneId?.startsWith('ENS');
  let xrefInfo: DatabaseInfoPoint = EnsemblBacteria;
  if (ensID) {
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
      title: `${ensID ? 'Ensembl g' : 'G'}ene ID`,
      content:
        representativeEntry.gnCoordinate.ensemblGeneId &&
        (xrefInfo?.uriLink ? (
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

  const groupedExons = groupBy(
    accessionEntriesPairs
      .map(([, entries]) =>
        entries.map((entry) =>
          entry.gnCoordinate.genomicLocation.exon.map((exon) => ({
            ...exon,
            // Add accession info to each exon info before flattening
            accession: entry.accession,
          }))
        )
      )
      .flat(2)
      .sort(
        sortExons(
          representativeEntry.gnCoordinate.genomicLocation.reverseStrand
        )
      ),
    (data) => data.id
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
          ensID={ensID}
          oneIsoformOnly={isoformIDs.length === 1}
        />
      ))}
      <DatatableWrapper alwaysExpanded>
        <table className={cn(styles.table, helper['no-wrap'])}>
          <thead>
            <tr>
              <th>{ensID && 'Ensembl'} exon ID</th>
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
              );
              return (
                <tr key={id}>
                  <td>
                    {ensID && xrefInfo.uriLink ? (
                      <ExternalLink
                        url={processUrlTemplate(xrefInfo.uriLink, { id })}
                      >
                        {id}
                      </ExternalLink>
                    ) : (
                      id
                    )}
                  </td>
                  <td>
                    {ensID ? (
                      <ExternalLink
                        url={getEnsemblLink(
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
                        )}
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
              );
            })}
          </tbody>
        </table>
      </DatatableWrapper>
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