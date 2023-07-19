import { Fragment } from 'react';
import {
  ExpandableList,
  InfoList,
  LongNumber,
  SpinnerIcon,
} from 'franklin-sites';
import { Link } from 'react-router-dom';
import { getEntryPath } from '../../../../../app/config/urls';
import ExternalLink from '../../../../../shared/components/ExternalLink';

import DatatableWithToggle from '../../../../../shared/components/views/DatatableWithToggle';

import useDataApi from '../../../../../shared/hooks/useDataApi';
import useDatabaseInfoMaps from '../../../../../shared/hooks/useDatabaseInfoMaps';

import { Namespace } from '../../../../../shared/types/namespaces';
import { TabLocation } from '../../Entry';

import { GenomicLocation, GenomicCoordinate, GenomicEntry } from './types';
import { processUrlTemplate } from '../../../protein-data-views/XRefView';
import LazyComponent from '../../../../../shared/components/LazyComponent';

const getEnsemblLink = (
  taxID: number,
  chromosome?: string,
  start?: number,
  end?: number
) =>
  `https://www.ensembl.org/${taxID}/Location/View?r=${chromosome}:${start}-${end}`;

type GenomicLocProps = {
  genomicLocation: GenomicLocation;
  taxID: number;
};

const GenomicLoc = ({ genomicLocation, taxID }: GenomicLocProps) => (
  <ExternalLink
    url={getEnsemblLink(
      taxID,
      genomicLocation.chromosome,
      genomicLocation.reverseStrand
        ? genomicLocation.end
        : genomicLocation.start,
      genomicLocation.reverseStrand
        ? genomicLocation.start
        : genomicLocation.end
    )}
  >
    {genomicLocation.chromosome}:
    <LongNumber>
      {(genomicLocation.reverseStrand
        ? genomicLocation.end
        : genomicLocation.start) ?? ''}
    </LongNumber>
    -
    <LongNumber>
      {(genomicLocation.reverseStrand
        ? genomicLocation.start
        : genomicLocation.end) ?? ''}
    </LongNumber>
  </ExternalLink>
);

type OverlappingProps = {
  taxID: number;
  chromosome?: string;
  start: number;
  end: number;
  currentEntry: string;
};

const Overlapping = ({
  taxID,
  chromosome,
  start,
  end,
  currentEntry,
}: OverlappingProps) => {
  const sp = new URLSearchParams({
    taxid: `${taxID}`,
    location: `${start}-${end}`,
  });
  if (chromosome) {
    sp.set('chromosome', chromosome);
  }

  const { loading, data } = useDataApi<Array<GenomicEntry>>(
    `https://www.ebi.ac.uk/proteins/api/coordinates?${sp}`
  );

  if (loading) {
    return <SpinnerIcon width="1em" height="1em" />;
  }

  // Removes the original protein from the list of proteins at these coordinates
  const otherEntries = data?.filter(
    (entry) => entry.accession !== currentEntry
  );

  if (!otherEntries?.length) {
    return <>none</>;
  }

  let min = start;
  let max = end;
  const entryList: JSX.Element[] = [];

  for (const entry of otherEntries) {
    const entryAndLocations = [
      <Link
        to={getEntryPath(
          Namespace.uniprotkb,
          entry.accession,
          TabLocation.Entry
        )}
        key={entry.accession}
      >
        {entry.accession}
      </Link>,
      ' (',
    ];
    for (const { genomicLocation } of entry.gnCoordinate || []) {
      const otherStart = genomicLocation.reverseStrand
        ? genomicLocation.end
        : genomicLocation.start;
      const otherEnd = genomicLocation.reverseStrand
        ? genomicLocation.start
        : genomicLocation.end;
      if (otherStart === undefined || otherEnd === undefined) {
        continue; // eslint-disable-line no-continue
      }
      const startWithinRange = otherStart >= start && otherStart <= end;
      const endWithinRange = otherEnd >= start && otherEnd <= end;
      if (!startWithinRange && !endWithinRange) {
        // This location not within the original location range, skip it
        continue; // eslint-disable-line no-continue
      }
      if (entryAndLocations.length > 2) {
        entryAndLocations.push(', ');
      }
      entryAndLocations.push(
        <GenomicLoc key="gl" genomicLocation={genomicLocation} taxID={taxID} />
      );
      if (otherStart < min) {
        min = otherStart;
      }
      if (otherEnd > end) {
        max = otherEnd;
      }
    }
    entryAndLocations.push(')');
    entryList.push(
      <Fragment key={entry.accession}>{entryAndLocations}</Fragment>
    );
  }

  return (
    <>
      <ExpandableList descriptionString="entries" displayNumberOfHiddenItems>
        {entryList}
      </ExpandableList>
      {(min !== start || max !== end) && (
        <ExternalLink url={getEnsemblLink(taxID, chromosome, min, max)}>
          Explore genomic region in Ensembl
        </ExternalLink>
      )}
    </>
  );
};

type CoordinatesProps = {
  coordinates: GenomicCoordinate;
  index: number;
  taxID?: number;
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

  if (!taxID || !ensemblInfo?.uriLink) {
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
                    -
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
    </section>
  );
};

export default Coordinates;
