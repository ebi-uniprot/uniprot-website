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
import { GenomicEntry, GenomicLocation } from './types';

type EntryInfo = {
  accession: string;
  locations: Array<GenomicLocation>;
};

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
  const entryList: Array<EntryInfo> = [];

  // Get each overlapping entry
  for (const entry of otherEntries) {
    const entryInfo: EntryInfo = {
      accession: entry.accession,
      locations: [],
    };
    // Get each overlapping entry's overlapping location
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
      entryInfo.locations.push(genomicLocation);
      if (otherStart < min) {
        min = otherStart;
      }
      if (otherEnd > end) {
        max = otherEnd;
      }
    }
    entryList.push(entryInfo);
  }

  return (
    <>
      <ExpandableList descriptionString="entries" displayNumberOfHiddenItems>
        {/* Render an entry link for each overlapping entry */}
        {entryList.map((entryInfo) => (
          <Fragment key={entryInfo.accession}>
            <Link
              to={getEntryPath(
                Namespace.uniprotkb,
                entryInfo.accession,
                TabLocation.Entry
              )}
              key={entryInfo.accession}
            >
              {entryInfo.accession}
            </Link>
            {' ('}
            {/* Render an Ensembl link for each overlapping entry's overlapping location */}
            {entryInfo.locations.map((location, index) => (
              // Won't update the list, index is fine
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                {index !== 0 && '; '}
                <GenomicLoc
                  genomicLocation={location}
                  taxID={taxID}
                  noLink={!location.exon[0].id?.startsWith('ENS')}
                />
              </Fragment>
            ))}
            )
          </Fragment>
        ))}
      </ExpandableList>
      {/* If the overlapping entries expand further than the current one, render
      a link to the genome browser to explore the full range */}
      {(min !== start || max !== end) && (
        <ExternalLink url={getEnsemblLink(taxID, min, max, chromosome)}>
          Explore genomic region in Ensembl
        </ExternalLink>
      )}
    </>
  );
};

export default Overlapping;
