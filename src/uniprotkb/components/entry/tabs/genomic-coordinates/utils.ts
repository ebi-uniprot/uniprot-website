import { groupBy } from 'lodash-es';

import {
  type ExonMap,
  type FlatGenomicEntry,
  type GenomicEntry,
  type GroupedExon,
} from './types';

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

export const deduplicateAndNormalizeGenomicEntries = (
  genomicEntries: GenomicEntry[],
  canonical?: string
): GenomicEntry[] => {
  if (!genomicEntries || !genomicEntries.length) {
    return [];
  }

  // Find all base accessions that have a suffixed isoform entry present (e.g. 'P05067-1' -> 'P05067')
  const accessionsWithIsoformPresent = new Set<string>();
  for (const entry of genomicEntries) {
    if (entry.accession.includes('-')) {
      const [base] = entry.accession.split('-');
      accessionsWithIsoformPresent.add(base);
    }
  }

  // 1. Deduplicate: drop un-suffixed canonical entries if a suffixed isoform entry is present
  const deduplicated = genomicEntries.filter((entry) => {
    if (
      !entry.accession.includes('-') &&
      accessionsWithIsoformPresent.has(entry.accession)
    ) {
      return false;
    }
    return true;
  });

  // 2. Normalize: if an entry is un-suffixed and matches canonical's base accession, map it to canonical
  if (canonical) {
    const [canonicalBase] = canonical.split('-');
    return deduplicated.map((entry) => {
      if (entry.accession === canonicalBase) {
        return {
          ...entry,
          accession: canonical,
        };
      }
      return entry;
    });
  }

  return deduplicated;
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
                  exon.proteinLocation.end.position
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
