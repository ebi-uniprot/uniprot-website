import { Card } from 'franklin-sites';
import { lazy } from 'react';

import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';

const StructureView = lazy(
  () =>
    import(
      /* webpackChunkName: "structure-view" */ '../../../uniprotkb/components/protein-data-views/StructureView'
    )
);

type Props = {
  uniparcData: UniParcSubEntryUIModel;
};

/**
 * Whether the sub-entry has enough info to drive a structure lookup. The
 * sequence MD5 is the gate: `StructureView` queries 3D Beacons / AlphaFold /
 * PDB by checksum (the same path the entry-level Structure tab uses), so any
 * sub-entry with a sequence can render the section regardless of whether the
 * xref happens to be a UniProtKB accession. When it *is* a UniProtKB
 * accession, we also pass `primaryAccession` so the accession-keyed
 * affordances inside `StructureView` light up.
 */
export const hasStructure = (uniparcData: UniParcSubEntryUIModel): boolean =>
  Boolean(uniparcData.entry.sequence?.md5);

const StructureSection = ({ uniparcData }: Props) =>
  !hasStructure(uniparcData) ? null : (
    <Card
      header={
        <h2 data-article-id="structure_section">
          {entrySectionToLabel[SubEntrySection.Structure]}
        </h2>
      }
      id={SubEntrySection.Structure}
      data-entry-section
    >
      <StructureView
        // Only pass the accession when the xref is a real UniProtKB one;
        // otherwise drive the lookup entirely off the sequence MD5.
        primaryAccession={
          uniparcData.subEntry.isUniprotkbEntry
            ? uniparcData.subEntry.id
            : undefined
        }
        checksum={uniparcData.entry.sequence?.md5}
        viewerOnly
      />
    </Card>
  );

export default StructureSection;
