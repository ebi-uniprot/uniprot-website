import { InfoList, LongNumber, SpinnerIcon } from 'franklin-sites';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import LazyComponent from '../../../../../shared/components/LazyComponent';
import DatatableWrapper from '../../../../../shared/components/views/DatatableWrapper';
import GenomicLoc, { getEnsemblLink } from './GenomicLoc';
import Overlapping from './Overlapping';

import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';

import { processUrlTemplate } from '../../../protein-data-views/XRefView';

import { GenomicCoordinate } from './types';
import { DatabaseInfoPoint } from '../../../../types/databaseRefs';

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

  // Mostly from Ensembl
  let xrefInfo: DatabaseInfoPoint | null = null;
  if (coordinates.ensemblGeneId?.startsWith('ENS')) {
    xrefInfo = Ensembl;
  }

  const infoData = [
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
    </section>
  );
};

export default Coordinates;
