import { ReactElement } from 'react';
import { Link, type Path } from 'react-router';

import { getEntryPath } from '../../app/config/urls';
import {
  EntryType,
  getEntryTypeFromString,
} from '../../shared/components/entry/EntryTypeIcon';
import { Namespace } from '../../shared/types/namespaces';
import { pluralise } from '../../shared/utils/utils';
import { TabLocation } from '../types/entry';
import EntrySection from '../types/entrySection';
import { getEntrySectionNameAndId } from '../utils/entrySection';
import { UniProtkbAPIModel } from './uniProtkbConverter';

enum highlightSection {
  domains = 'domain',
  PTM = 'PTM',
  variants = 'reviewed variant',
  activeSites = 'active site',
  isoforms = 'isoform',
  structures = '3D structure',
  disease = 'disease',
  interactions = 'interaction',
  subcell = 'subcellular location',
  publications = 'publication',
}

const highlightToEntrySection: Record<
  highlightSection,
  {
    link:
      | Partial<Path>
      | ((accession: string, taxId?: number) => Partial<Path>);
    prefixResolver?: (entryType: string) => string;
  }
> = {
  [highlightSection.domains]: {
    link: { hash: getEntrySectionNameAndId(EntrySection.Function).id },
  },
  [highlightSection.PTM]: {
    link: { hash: getEntrySectionNameAndId(EntrySection.ProteinProcessing).id },
  },
  [highlightSection.variants]: {
    link: (_, taxId) => ({
      hash: getEntrySectionNameAndId(EntrySection.DiseaseVariants, taxId).id,
    }),
  },
  [highlightSection.activeSites]: {
    link: { hash: getEntrySectionNameAndId(EntrySection.Function).id },
  },
  [highlightSection.isoforms]: {
    link: { hash: getEntrySectionNameAndId(EntrySection.Sequence).id },
  },
  [highlightSection.structures]: {
    link: { hash: getEntrySectionNameAndId(EntrySection.Structure).id },
  },
  [highlightSection.disease]: {
    link: (_, taxId) => ({
      hash: getEntrySectionNameAndId(EntrySection.DiseaseVariants, taxId).id,
    }),
  },
  [highlightSection.interactions]: {
    link: { hash: getEntrySectionNameAndId(EntrySection.Interaction).id },
  },
  [highlightSection.subcell]: {
    link: {
      hash: getEntrySectionNameAndId(EntrySection.SubCellularLocation).id,
    },
  },
  [highlightSection.publications]: {
    link: (accession: string) => ({
      pathname: getEntryPath(
        Namespace.uniprotkb,
        accession,
        TabLocation.Publications
      ),
    }),
    prefixResolver: (entryType) =>
      getEntryTypeFromString(entryType) === EntryType.REVIEWED
        ? 'reviewed '
        : '',
  },
};

const getProteinHighlights = ({
  primaryAccession,
  uniProtKBCrossReferences,
  references,
  extraAttributes,
  entryType,
  organism,
}: UniProtkbAPIModel): ReactElement[] => {
  const highlightTuples: Array<
    [section: highlightSection, count: number | undefined]
  > = [
    // FEATURES
    // domains
    [highlightSection.domains, extraAttributes?.countByFeatureType?.Domain],
    // PTMs
    [
      highlightSection.PTM,
      extraAttributes?.countByFeatureType?.['Modified residue'],
    ],
    // variants
    [
      highlightSection.variants,
      extraAttributes?.countByFeatureType?.['Natural variant'],
    ],
    // active sites
    [
      highlightSection.activeSites,
      extraAttributes?.countByFeatureType?.['Active site'],
    ],
    // COMMENTS
    // isoforms
    [
      highlightSection.isoforms,
      extraAttributes?.countByCommentType?.['ALTERNATIVE PRODUCTS'],
    ],
    // interactions
    [
      highlightSection.interactions,
      extraAttributes?.countByCommentType?.INTERACTION,
    ],
    // diseases
    [highlightSection.disease, extraAttributes?.countByCommentType?.DISEASE],
    // XREFS
    // 3D structures
    [
      highlightSection.structures,
      uniProtKBCrossReferences?.filter((xref) => xref.database === 'PDB')
        .length,
    ],
    /**
     * Must include "reviewed" for
     * Swissprot and not for Trembl.
     */
    // publications
    [highlightSection.publications, references?.length],
  ];

  const entryPathname = getEntryPath(
    Namespace.uniprotkb,
    primaryAccession,
    TabLocation.Entry
  );

  return highlightTuples
    .filter(([, count]) => count)
    .map(([entryHighlightSection, count]) => {
      const { link, prefixResolver } =
        highlightToEntrySection[entryHighlightSection];
      const locationObject =
        typeof link === 'function'
          ? link(primaryAccession, organism?.taxonId)
          : link;
      const to = {
        pathname: entryPathname,
        ...locationObject,
      };
      const name = `${count} ${prefixResolver?.(entryType) ?? ''}${pluralise(
        entryHighlightSection,
        count || 0
      )}`;
      return (
        <Link to={to} key={name}>
          {name}
        </Link>
      );
    });
};

export default getProteinHighlights;
