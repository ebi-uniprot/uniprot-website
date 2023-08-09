import { useMemo, memo } from 'react';
import { LongNumber } from 'franklin-sites';
import ExternalLink from '../../../../../shared/components/ExternalLink';

import DatatableWrapper from '../../../../../shared/components/views/DatatableWrapper';
import { DatabaseInfoPoint } from '../../../../types/databaseRefs';
import { processUrlTemplate } from '../../../protein-data-views/XRefView';

import useNightingale from '../../../../../shared/hooks/useNightingale';

import { getEnsemblLink } from './GenomicLoc';

import { GenomicCoordinate } from './types';

type Processed = {
  id?: string;
  proteinCoordinatesStart: number;
  proteinCoordinatesEnd: number;
  genomicCoordinatesStart: number;
  genomicCoordinatesEnd: number;
};

type Filtered = Processed & { visible: boolean };

type RowProps = Filtered & {
  taxID: number;
  xrefInfo?: DatabaseInfoPoint | null;
  chromosome?: string;
};

const Row = memo(({ taxID, xrefInfo, chromosome, ...datum }: RowProps) => {
  const location = (
    <>
      {chromosome && `${chromosome}:`}
      <LongNumber>{datum.genomicCoordinatesStart}</LongNumber>
      {' - '}
      <LongNumber>{datum.genomicCoordinatesEnd}</LongNumber>
    </>
  );
  return (
    <tr>
      <td>{datum.visible ? '👀' : '🙈'}</td>
      <td>
        {datum.id && xrefInfo?.uriLink ? (
          <ExternalLink
            url={processUrlTemplate(xrefInfo.uriLink, {
              id: datum.id,
            })}
          >
            {datum.id}
          </ExternalLink>
        ) : (
          datum.id
        )}
      </td>
      <td>
        <LongNumber>{datum.proteinCoordinatesStart}</LongNumber> -{' '}
        <LongNumber>{datum.proteinCoordinatesEnd}</LongNumber>
      </td>
      <td>
        {xrefInfo ? (
          <ExternalLink
            url={getEnsemblLink(
              taxID,
              datum.genomicCoordinatesStart,
              datum.genomicCoordinatesEnd,
              chromosome
            )}
          >
            {location}
          </ExternalLink>
        ) : (
          location
        )}
      </td>
    </tr>
  );
});

type CoordinatesTableProps = {
  coordinates: GenomicCoordinate;
  taxID: number;
  xrefInfo?: DatabaseInfoPoint | null;
};

export const CoordinatesTable = ({
  coordinates,
  taxID,
  xrefInfo,
}: CoordinatesTableProps) => {
  const [state] = useNightingale();

  const processed: Processed[] = useMemo(
    () =>
      coordinates.genomicLocation.exon.map((exon) => ({
        id: exon.id,
        proteinCoordinatesStart: exon.proteinLocation.begin.position,
        proteinCoordinatesEnd: exon.proteinLocation.end.position,
        genomicCoordinatesStart: coordinates.genomicLocation.reverseStrand
          ? exon.genomeLocation.end.position
          : exon.genomeLocation.begin.position,
        genomicCoordinatesEnd: coordinates.genomicLocation.reverseStrand
          ? exon.genomeLocation.begin.position
          : exon.genomeLocation.end.position,
      })),
    [coordinates]
  );

  const filtered: Filtered[] = useMemo(
    () =>
      processed.map((datum) => ({
        ...datum,
        visible: Boolean(
          state?.['display-start'] &&
            state['display-start'] <= datum.genomicCoordinatesStart &&
            state?.['display-end'] &&
            state['display-end'] >= datum.genomicCoordinatesEnd
        ),
      })),
    [processed, state]
  );

  return (
    <DatatableWrapper>
      <table>
        <thead>
          <tr>
            <th aria-label="in view within the visulisation" />
            <th>{xrefInfo ? 'Ensembl e' : 'E'}xon ID</th>
            <th>Protein coordinates</th>
            <th>Genomic coordinates</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((datum, index) => (
            <Row
              key={datum.id || index}
              taxID={taxID}
              xrefInfo={xrefInfo}
              chromosome={coordinates.genomicLocation.chromosome}
              {...datum}
            />
          ))}
        </tbody>
      </table>
    </DatatableWrapper>
  );
};
