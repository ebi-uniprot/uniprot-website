import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Chip, LongNumber } from 'franklin-sites';
import cn from 'classnames';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import Table from '../../../../../shared/components/table/Table';
import { getEnsemblLink } from './GenomicLoc';
import AddToBasketButton from '../../../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../../../shared/components/action-buttons/Align';
import BlastButton from '../../../../../shared/components/action-buttons/Blast';

import { processUrlTemplate } from '../../../../../shared/utils/xrefs';
import { getEntryPathFor } from '../../../../../app/config/urls';
import { groupByGenomicCoordinates } from './utils';

import { Namespace } from '../../../../../shared/types/namespaces';
import { TabLocation } from '../../../../types/entry';
import { FlatGenomicEntry, GenomicCoordinate, GroupedExon } from './types';
import { DatabaseInfoPoint } from '../../../../types/databaseRefs';

import styles from './styles/coordinates-table.module.scss';
import helper from '../../../../../shared/styles/helper.module.scss';

const getEntryPathForUniprotKB = getEntryPathFor(Namespace.uniprotkb);

type ExonRowProps = {
  exon: GroupedExon;
  xrefInfo?: DatabaseInfoPoint;
  isEnsemblID: boolean;
  canonical?: string;
  maneSelect?: string;
};

const ExonRow = ({
  exon,
  xrefInfo,
  isEnsemblID,
  canonical,
  maneSelect,
}: ExonRowProps) => (
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
      {exon.proteinLocation.position ? (
        <LongNumber>{exon.proteinLocation.position.position}</LongNumber>
      ) : (
        <>
          <LongNumber>{exon.proteinLocation.begin.position}</LongNumber>-
          <LongNumber>{exon.proteinLocation.end.position}</LongNumber>
        </>
      )}
    </td>
    <td>
      <div className="button-group">
        <BlastButton selectedEntries={[exon.accessionWithCoordinates]} />
        <AddToBasketButton selectedEntries={exon.accessionWithCoordinates} />
      </div>
    </td>
  </>
);

type CoordinateRowProps = {
  gnCoordinates: GenomicCoordinate;
  taxID: number;
  exons: GroupedExon[];
  isEnsemblID: boolean;
  mappedIsoforms: string[];
};

const CoordinateRow = ({
  gnCoordinates,
  taxID,
  exons,
  isEnsemblID,
  mappedIsoforms,
}: CoordinateRowProps) => {
  const location = (
    <>
      {gnCoordinates.genomicLocation.chromosome &&
        `${gnCoordinates.genomicLocation.chromosome}:`}
      {exons[0].genomeLocation.position ? (
        <LongNumber>{exons[0].genomeLocation.position.position}</LongNumber>
      ) : (
        <>
          <LongNumber>
            {gnCoordinates.genomicLocation.reverseStrand
              ? exons[0].genomeLocation.end.position
              : exons[0].genomeLocation.begin.position}
          </LongNumber>
          {' - '}
          <LongNumber>
            {gnCoordinates.genomicLocation.reverseStrand
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
                    taxID,
                    exons[0].genomeLocation.position.position
                  )
                : getEnsemblLink(
                    taxID,
                    gnCoordinates.genomicLocation.reverseStrand
                      ? exons[0].genomeLocation.end.position
                      : exons[0].genomeLocation.begin.position,
                    gnCoordinates.genomicLocation.reverseStrand
                      ? exons[0].genomeLocation.begin.position
                      : exons[0].genomeLocation.end.position,
                    gnCoordinates.genomicLocation.chromosome
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

type CoordinateExtraContentProps = {
  exons: GroupedExon[];
  xrefInfo?: DatabaseInfoPoint;
  isEnsemblID: boolean;
  colSpan: number;
};

const CoordinateExtraContent = ({
  exons,
  xrefInfo,
  isEnsemblID,
  colSpan,
}: CoordinateExtraContentProps) => {
  const uniqueSequences = new Set(exons.map((exon) => exon.proteinSequence));

  return (
    <td colSpan={colSpan}>
      <Card className={styles['inner-card']}>
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
                <ExonRow
                  exon={exon}
                  xrefInfo={xrefInfo}
                  isEnsemblID={isEnsemblID}
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

type CoordinateTableProps = {
  flatGenomicEntries: FlatGenomicEntry[];
  xrefInfo?: DatabaseInfoPoint;
  mappedIsoforms: string[];
  isEnsemblID: boolean;
  canonical?: string;
};

const CoordinateTable = ({
  flatGenomicEntries,
  xrefInfo,
  mappedIsoforms,
  isEnsemblID,
  canonical,
}: CoordinateTableProps) => {
  const groupedExonEntries = Object.entries(
    groupByGenomicCoordinates(flatGenomicEntries)
  );

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
            <CoordinateRow
              gnCoordinates={flatGenomicEntries[0].gnCoordinate}
              taxID={flatGenomicEntries[0].taxid}
              exons={exons}
              isEnsemblID={isEnsemblID}
              mappedIsoforms={mappedIsoforms}
            />
          ),
          extraContent: (
            <CoordinateExtraContent
              exons={exons}
              xrefInfo={xrefInfo}
              isEnsemblID={isEnsemblID}
              colSpan={1 + 4 * mappedIsoforms.length}
            />
          ),
        })}
      </Table.Body>
    </Table>
  );
};

export default CoordinateTable;
