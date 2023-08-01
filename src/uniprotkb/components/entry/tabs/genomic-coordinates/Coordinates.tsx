import { useRef, useEffect } from 'react';
import { InfoList, LongNumber, SpinnerIcon } from 'franklin-sites';
import NightingaleTrack from '@nightingale-elements/nightingale-track';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import LazyComponent from '../../../../../shared/components/LazyComponent';
import DatatableWithToggle from '../../../../../shared/components/views/DatatableWithToggle';
import GenomicLoc, { getEnsemblLink } from './GenomicLoc';
import Overlapping from './Overlapping';

import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';
import useCustomElement from '../../../../../shared/hooks/useCustomElement';

import { processUrlTemplate } from '../../../protein-data-views/XRefView';

import { GenomicCoordinate } from './types';

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

  const ensemblInfo = useDatabaseInfoMaps()?.databaseToDatabaseInfo.Ensembl;

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

  if (!ensemblInfo?.uriLink) {
    return null;
  }

  const infoData = [
    {
      title: 'Ensembl Gene',
      content: coordinates.ensemblGeneId && (
        <ExternalLink
          url={processUrlTemplate(ensemblInfo.uriLink, {
            id: coordinates.ensemblGeneId,
          })}
        >
          {coordinates.ensemblGeneId}
        </ExternalLink>
      ),
    },
    {
      title: 'Ensembl Transcript',
      content: coordinates.ensemblTranscriptId && (
        <ExternalLink
          url={processUrlTemplate(ensemblInfo.uriLink, {
            id: coordinates.ensemblTranscriptId,
          })}
        >
          {coordinates.ensemblTranscriptId}
        </ExternalLink>
      ),
    },
    {
      title: 'Ensembl Translation',
      content: coordinates.ensemblTranslationId && (
        <ExternalLink
          url={processUrlTemplate(ensemblInfo.uriLink, {
            id: coordinates.ensemblTranslationId,
          })}
        >
          {coordinates.ensemblTranslationId}
        </ExternalLink>
      ),
    },
    {
      title: 'Genomic location',
      content: gl.start && gl.end && (
        <GenomicLoc genomicLocation={gl} taxID={taxID} />
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
          />
        </LazyComponent>
      ),
    },
  ];

  return (
    <section>
      <h3>Genomic location {index + 1}</h3>
      <InfoList infoData={infoData} columns />
      <DatatableWithToggle>
        <table>
          <thead>
            <tr>
              <th>Exon ID</th>
              <th>Protein coordinates</th>
              <th>Genomic coordinates</th>
            </tr>
          </thead>
          <tbody>
            {coordinates.genomicLocation.exon.map((exon) => (
              <tr key={exon.id}>
                <td>
                  {exon.id && ensemblInfo.uriLink && (
                    <ExternalLink
                      url={processUrlTemplate(ensemblInfo.uriLink, {
                        id: exon.id,
                      })}
                    >
                      {exon.id}
                    </ExternalLink>
                  )}
                </td>
                <td>
                  <LongNumber>
                    {exon.proteinLocation?.begin?.position ?? ''}
                  </LongNumber>
                  -
                  <LongNumber>
                    {exon.proteinLocation?.end?.position ?? ''}
                  </LongNumber>
                </td>
                <td>
                  <ExternalLink
                    url={getEnsemblLink(
                      taxID,
                      coordinates.genomicLocation.chromosome,
                      gl.reverseStrand
                        ? exon.genomeLocation?.end?.position
                        : exon.genomeLocation?.begin?.position,
                      gl.reverseStrand
                        ? exon.genomeLocation?.begin?.position
                        : exon.genomeLocation?.end?.position
                    )}
                  >
                    {coordinates.genomicLocation.chromosome}:
                    <LongNumber>
                      {(gl.reverseStrand
                        ? exon.genomeLocation?.end?.position
                        : exon.genomeLocation?.begin?.position) ?? ''}
                    </LongNumber>
                    {' - '}
                    <LongNumber>
                      {(gl.reverseStrand
                        ? exon.genomeLocation?.begin?.position
                        : exon.genomeLocation?.end?.position) ?? ''}
                    </LongNumber>
                  </ExternalLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DatatableWithToggle>
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
