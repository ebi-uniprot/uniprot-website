import { InfoList, LongNumber, SpinnerIcon } from 'franklin-sites';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import LazyComponent from '../../../../../shared/components/LazyComponent';
import DatatableWithToggle from '../../../../../shared/components/views/DatatableWithToggle';
import GenomicLoc, { getEnsemblLink } from './GenomicLoc';
import Overlapping from './Overlapping';

import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';

import { processUrlTemplate } from '../../../protein-data-views/XRefView';

import { GenomicCoordinate } from './types';

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
                  <LongNumber>{exon.proteinLocation.begin.position}</LongNumber>
                  -<LongNumber>{exon.proteinLocation.end.position}</LongNumber>
                </td>
                <td>
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
                  </ExternalLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DatatableWithToggle>
    </section>
  );
};

export default Coordinates;
