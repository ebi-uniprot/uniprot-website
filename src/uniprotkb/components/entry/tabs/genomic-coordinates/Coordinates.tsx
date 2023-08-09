import { useMemo } from 'react';
import { InfoList, SpinnerIcon } from 'franklin-sites';
import NightingaleTrack from '@nightingale-elements/nightingale-track';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import LazyComponent from '../../../../../shared/components/LazyComponent';
import GenomicLoc from './GenomicLoc';
import Overlapping from './Overlapping';

import { NightingaleProvider } from '../../../../../shared/contexts/Nightingale';
import { Navigation } from '../../../../../shared/components/nightingale/navigation';
import { Track } from '../../../../../shared/components/nightingale/track';

import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';

import { processUrlTemplate } from '../../../protein-data-views/XRefView';

import { GenomicCoordinate } from './types';
import { DatabaseInfoPoint } from '../../../../types/databaseRefs';
import { CoordinatesTable } from './CoordinatesTable';

type NTFeature = NightingaleTrack['data'][number];

type CoordinatesProps = {
  coordinates: GenomicCoordinate;
  index: number;
  taxID: number;
  currentEntry: string;
};

const Coordinates = ({
  coordinates,
  index,
  taxID,
  currentEntry,
}: CoordinatesProps) => {
  const { genomicLocation: gl } = coordinates;

  const { Ensembl } = useDatabaseInfoMaps()?.databaseToDatabaseInfo || {};

  const ngData = useMemo(
    () =>
      gl.exon
        .flatMap<NTFeature | undefined>((exon, index, arr) => [
          index === 0
            ? undefined
            : {
                accession: `${exon.id}-${arr[index - 1].id}`,
                start: arr[index - 1].genomeLocation?.end?.position,
                end: exon.genomeLocation?.begin?.position,
                color: '#ffbb33',
                shape: 'line',
              },
          {
            accession: exon.id || '',
            start: exon.genomeLocation?.begin?.position,
            end: exon.genomeLocation?.end?.position,
            color: '#342ea2',
            shape: 'rectangle',
          },
        ])
        .filter((x: NTFeature | undefined): x is NTFeature => Boolean(x)),
    [gl]
  );

  // Mostly from Ensembl
  let xrefInfo: DatabaseInfoPoint | null = null;
  if (coordinates.ensemblGeneId?.startsWith('ENS')) {
    xrefInfo = Ensembl;
  }

  const infoData = [
    {
      title: `${xrefInfo ? 'Ensembl g' : 'G'}ene ID`,
      content:
        coordinates.ensemblGeneId &&
        (xrefInfo?.uriLink ? (
          <ExternalLink
            url={processUrlTemplate(xrefInfo.uriLink, {
              id: coordinates.ensemblGeneId,
            })}
          >
            {coordinates.ensemblGeneId}
          </ExternalLink>
        ) : (
          coordinates.ensemblGeneId
        )),
    },
    {
      title: `${xrefInfo ? 'Ensembl t' : 'T'}ranscript ID`,
      content:
        coordinates.ensemblTranscriptId &&
        (xrefInfo?.uriLink ? (
          <ExternalLink
            url={processUrlTemplate(xrefInfo.uriLink, {
              id: coordinates.ensemblTranscriptId,
            })}
          >
            {coordinates.ensemblTranscriptId}
          </ExternalLink>
        ) : (
          coordinates.ensemblTranscriptId
        )),
    },
    {
      title: `${xrefInfo ? 'Ensembl t' : 'T'}ranslation ID`,
      content:
        coordinates.ensemblTranslationId &&
        (xrefInfo?.uriLink ? (
          <ExternalLink
            url={processUrlTemplate(xrefInfo.uriLink, {
              id: coordinates.ensemblTranslationId,
            })}
          >
            {coordinates.ensemblTranslationId}
          </ExternalLink>
        ) : (
          coordinates.ensemblTranslationId
        )),
    },
    {
      title: 'Genomic location',
      content: gl.start && gl.end && (
        <GenomicLoc genomicLocation={gl} taxID={taxID} noLink={!xrefInfo} />
      ),
    },
    {
      title: 'Strand',
      content: gl.reverseStrand ? 'Reverse' : 'Forward',
    },
    {
      title: 'Number of exons',
      content: gl.exon.length,
    },
    {
      title: 'Overlapping proteins',
      content: gl.start && gl.end && (
        <LazyComponent
          fallback={<SpinnerIcon width="1em" height="1em" />}
          rootMargin="0px"
        >
          <Overlapping
            taxID={taxID}
            chromosome={gl.chromosome}
            start={gl.reverseStrand ? gl.end : gl.start}
            end={gl.reverseStrand ? gl.start : gl.end}
            currentEntry={currentEntry}
            noLink={!xrefInfo}
          />
        </LazyComponent>
      ),
    },
  ];

  return (
    <section>
      <h3>Genomic location {index + 1}</h3>
      <InfoList infoData={infoData} columns />
      <NightingaleProvider>
        <Navigation
          height={50}
          length={Math.max(gl.start, gl.end)}
          display-start={gl.reverseStrand ? gl.end : gl.start}
          display-end={gl.reverseStrand ? gl.start : gl.end}
        />
        <Track
          height={50}
          layout={'non-overlapping' as const}
          length={Math.abs(gl.start - gl.end)}
          display-start={gl.reverseStrand ? gl.end : gl.start}
          display-end={gl.reverseStrand ? gl.start : gl.end}
          data={ngData}
        />
        <CoordinatesTable
          coordinates={coordinates}
          taxID={taxID}
          xrefInfo={xrefInfo}
        />
      </NightingaleProvider>
    </section>
  );
};

export default Coordinates;
