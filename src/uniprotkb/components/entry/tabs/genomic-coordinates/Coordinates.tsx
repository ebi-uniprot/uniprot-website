import { ExpandableList, InfoList, SpinnerIcon } from 'franklin-sites';
import { Link } from 'react-router-dom';
import { getEntryPath } from '../../../../../app/config/urls';

import DatatableWithToggle from '../../../../../shared/components/views/DatatableWithToggle';

import useDataApi from '../../../../../shared/hooks/useDataApi';

import { Namespace } from '../../../../../shared/types/namespaces';
import { TabLocation } from '../../Entry';

import { GenomicCoordinate, GenomicEntry } from './types';

type CollocatedProps = {
  taxID?: number;
  chromosome?: string;
  start: number;
  end: number;
  currentEntry: string;
};

const Collocated = ({
  taxID,
  chromosome,
  start,
  end,
  currentEntry,
}: CollocatedProps) => {
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

  if (!data?.length) {
    return <>none</>;
  }

  return (
    <ExpandableList descriptionString="entries" displayNumberOfHiddenItems>
      {data
        .filter((entry) => entry.accession !== currentEntry)
        .map((entry) => (
          <Link
            to={getEntryPath(
              Namespace.uniprotkb,
              entry.accession,
              TabLocation.Entry
            )}
          >
            {entry.accession} ({entry.name})
          </Link>
        ))}
    </ExpandableList>
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
  const infoData = [
    { title: 'Ensembl Gene', content: coordinates.ensemblGeneId },
    {
      title: 'Ensembl Transcript',
      content: coordinates.ensemblTranscriptId,
    },
    {
      title: 'Ensembl Translation',
      content: coordinates.ensemblTranslationId,
    },
    {
      title: 'Genomic location',
      content: `${gl.chromosome}:${gl.start}-${gl.end}`,
    },
    {
      title: 'Strand',
      content: gl.reverseStrand ? 'forward' : 'reverse',
    },
    {
      title: 'Number of exons',
      content: gl.exon.length,
    },
    {
      title: 'Collocated proteins',
      content: taxID && gl.start && gl.end && (
        <Collocated
          taxID={taxID}
          chromosome={gl.chromosome}
          start={gl.start}
          end={gl.end}
          currentEntry={currentEntry}
        />
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
                <td>{exon.id}</td>
                <td>
                  {exon.proteinLocation?.begin?.position}-
                  {exon.proteinLocation?.end?.position}
                </td>
                <td>
                  {coordinates.genomicLocation.chromosome}:
                  {exon.genomeLocation?.begin?.position}-
                  {exon.genomeLocation?.end?.position}
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
