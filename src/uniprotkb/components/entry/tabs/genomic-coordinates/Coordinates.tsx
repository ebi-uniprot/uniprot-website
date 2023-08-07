import { useRef, useEffect } from 'react';
import { InfoList, LongNumber, SpinnerIcon } from 'franklin-sites';
import NightingaleTrack from '@nightingale-elements/nightingale-track';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import LazyComponent from '../../../../../shared/components/LazyComponent';
import DatatableWrapper from '../../../../../shared/components/views/DatatableWrapper';
import GenomicLoc, { getEnsemblLink } from './GenomicLoc';
import Overlapping from './Overlapping';

import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';
import useCustomElement from '../../../../../shared/hooks/useCustomElement';

import { processUrlTemplate } from '../../../protein-data-views/XRefView';

import { GenomicCoordinate } from './types';
import { DatabaseInfoPoint } from '../../../../types/databaseRefs';

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

  const ntRef = useRef<NightingaleTrack>();
  const nt = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "nightingale-track" */ '@nightingale-elements/nightingale-track'
      ),
    'nightingale-track'
  );

  useEffect(() => {
    if (!nt.defined || !ntRef.current) {
      return;
    }
    ntRef.current.data = gl.exon
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
      .filter((x: NTFeature | undefined): x is NTFeature => Boolean(x));
  }, [nt.defined, gl]);

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
      <DatatableWrapper>
        <table>
          <thead>
            <tr>
              <th>{xrefInfo ? 'Ensembl e' : 'E'}xon ID</th>
              <th>Protein coordinates</th>
              <th>Genomic coordinates</th>
            </tr>
          </thead>
          <tbody>
            {coordinates.genomicLocation.exon.map((exon) => {
              const location = (
                <>
                  {coordinates.genomicLocation.chromosome &&
                    `${coordinates.genomicLocation.chromosome}:`}
                  <LongNumber>
                    {gl.reverseStrand
                      ? exon.genomeLocation.end.position
                      : exon.genomeLocation.begin.position}
                  </LongNumber>
                  {' - '}
                  <LongNumber>
                    {gl.reverseStrand
                      ? exon.genomeLocation.begin.position
                      : exon.genomeLocation.end.position}
                  </LongNumber>
                </>
              );
              return (
                <tr key={exon.id}>
                  <td>
                    {exon.id && xrefInfo?.uriLink ? (
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
                    <LongNumber>
                      {exon.proteinLocation.begin.position}
                    </LongNumber>
                    -
                    <LongNumber>{exon.proteinLocation.end.position}</LongNumber>
                  </td>
                  <td>
                    {xrefInfo ? (
                      <ExternalLink
                        url={getEnsemblLink(
                          taxID,
                          gl.reverseStrand
                            ? exon.genomeLocation.end.position
                            : exon.genomeLocation.begin.position,
                          gl.reverseStrand
                            ? exon.genomeLocation.begin.position
                            : exon.genomeLocation.end.position,
                          coordinates.genomicLocation.chromosome
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
            })}
          </tbody>
        </table>
      </DatatableWrapper>
      {nt.defined && (
        <nt.name
          ref={ntRef}
          height={50}
          layout="non-overlapping"
          length={Math.abs(gl.start - gl.end)}
          display-start={gl.reverseStrand ? gl.end : gl.start}
          display-end={gl.reverseStrand ? gl.start : gl.end}
        />
      )}
    </section>
  );
};

export default Coordinates;
