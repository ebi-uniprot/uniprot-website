import { groupBy } from 'lodash-es';

import { ExonMap, FlatGenomicEntry, GenomicEntry, GroupedExon } from './types';

const sortIsoforms = (
  isoform1: { accession: string },
  isoform2: { accession: string }
) => {
  const [entry1, isoformNumber1] = isoform1.accession.split('-');
  const [entry2, isoformNumber2] = isoform2.accession.split('-');

  if (entry1 !== entry2) {
    // Alphabetical order if accessions are different
    return entry1 < entry2 ? -1 : 1;
  }
  // Numerical order of isoforms if same accession
  return +isoformNumber1 - +isoformNumber2;
};

export const sortExons =
  (reverse?: boolean) => (exon1: ExonMap, exon2: ExonMap) => {
    const start1 = exon1.genomeLocation.position
      ? exon1.genomeLocation.position.position
      : exon1.genomeLocation.begin.position;
    const start2 = exon2.genomeLocation.position
      ? exon2.genomeLocation.position.position
      : exon2.genomeLocation.begin.position;

    if (start1 !== start2) {
      return reverse ? start2 - start1 : start1 - start2;
    }

    const end1 = exon1.genomeLocation.position
      ? exon1.genomeLocation.position.position
      : exon1.genomeLocation.begin.position;
    const end2 = exon2.genomeLocation.position
      ? exon2.genomeLocation.position.position
      : exon2.genomeLocation.begin.position;

    return reverse ? end2 - end1 : end1 - end2;
  };

// Genomic entries flattened by coordinates, grouped first by gene, then by accession
export type GroupedData = Record<
  string,
  Record<string, Array<FlatGenomicEntry>>
>;

export const groupByGene = (genomicEntries: GenomicEntry[]): GroupedData => {
  const flattenedAndSorted = Array.from(genomicEntries)
    .sort(sortIsoforms)
    .flatMap(
      (datum) =>
        datum.gnCoordinate &&
        datum.gnCoordinate.map((gnCoordinateItem) => ({
          ...datum,
          gnCoordinate: gnCoordinateItem,
        }))
    )
    .filter(
      (
        datumOrUndefined: FlatGenomicEntry | undefined
      ): datumOrUndefined is FlatGenomicEntry => Boolean(datumOrUndefined)
    );

  const groupedByGene = groupBy(
    flattenedAndSorted,
    (genomicEntry) => genomicEntry?.gnCoordinate.ensemblGeneId
  );

  const groupedByGeneAndIsoform = Object.fromEntries(
    Object.entries(groupedByGene).map(([gene, genomicEntries]) => [
      gene,
      groupBy(genomicEntries, (genomicEntry) => genomicEntry.accession),
    ])
  );

  return groupedByGeneAndIsoform;
};

export const groupByGenomicCoordinates = (
  flatGenomicEntries: FlatGenomicEntry[]
) =>
  groupBy<GroupedExon>(
    flatGenomicEntries
      .map((entry) =>
        entry.gnCoordinate.genomicLocation.exon.map((exon) => {
          const groupedExon: GroupedExon = {
            ...exon,
            // Add accession info to each exon info before flattening
            accession: entry.accession,
            // Add transcript info to each exon info before flattening
            transcriptID: entry.gnCoordinate.ensemblTranscriptId,
            // Add translation info to each exon info before flattening
            translationID: entry.gnCoordinate.ensemblTranslationId,
            proteinSequence: exon.proteinLocation.position
              ? entry.sequence.charAt(
                  exon.proteinLocation.position.position - 1
                )
              : entry.sequence.slice(
                  exon.proteinLocation.begin.position - 1,
                  exon.proteinLocation.end.position - 1
                ),
            accessionWithCoordinates: `${entry.accession}[${
              exon.proteinLocation.position
                ? exon.proteinLocation.position.position
                : `${exon.proteinLocation.begin.position}-${exon.proteinLocation.end.position}`
            }]`,
          };
          return groupedExon;
        })
      )
      .flat(2)
      .sort(
        sortExons(
          flatGenomicEntries[0].gnCoordinate.genomicLocation.reverseStrand
        )
      ),
    (data) =>
      data.genomeLocation.position?.position ||
      `${data.genomeLocation.begin?.position}-${data.genomeLocation.end?.position}`
  );
