import { Fragment } from 'react';
import { ExpandableList, SpinnerIcon } from 'franklin-sites';
import { Link } from 'react-router-dom';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import GenomicLoc, { getEnsemblLink } from './GenomicLoc';

import useDataApi from '../../../../../shared/hooks/useDataApi';

import { getEntryPath } from '../../../../../app/config/urls';
import { proteinsApi } from '../../../../../shared/config/apiUrls';

import { Namespace } from '../../../../../shared/types/namespaces';
import { TabLocation } from '../../Entry';
import { GenomicEntry } from './types';

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

  /** Fetch all entries for which part of the genome location overlaps (even
   * partially) to the current one */
  const { loading, data, error, status } = useDataApi<Array<GenomicEntry>>(
    `${proteinsApi.coordinates()}?${sp}`
  );

  if (loading) {
    return <SpinnerIcon width="1em" height="1em" />;
  }

  if (error && status !== 404) {
    return <em>An error happened</em>;
  }

  // Removes the original protein from the list of proteins at these coordinates
  const otherEntries = data?.filter(
    (entry) => entry.accession !== currentEntry
  );

  if (!otherEntries?.length) {
    return <>none</>;
  }

  // Gather minmax coordinates of overlapping entries
  let min = start;
  let max = end;
  const entryList: JSX.Element[] = [];

  // Render an entry link for each overlapping entry
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
    // Render an Ensembl link for each overlapping entry's overlapping location
    for (const { genomicLocation } of entry.gnCoordinate || []) {
      if (genomicLocation.chromosome !== chromosome) {
        // This location not even within the original chromosome, skip it
        continue; // eslint-disable-line no-continue
      }
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
      const startBeforeRange = otherStart <= start;
      const endAfterRange = otherEnd >= end;
      if (
        // No part within the range
        !(startWithinRange || endWithinRange) &&
        // This range does not include the current entry range
        !(startBeforeRange && endAfterRange)
      ) {
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
      {/* If the overlapping entries expand further than the current one, render
      a link to the genome browser to explore the full range */}
      {(min !== start || max !== end) && (
        <ExternalLink url={getEnsemblLink(taxID, chromosome, min, max)}>
          Explore genomic region in Ensembl
        </ExternalLink>
      )}
    </>
  );
};

export default Overlapping;
