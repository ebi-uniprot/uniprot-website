import { LocationDescriptorObject } from 'history';
import { generatePath } from 'react-router-dom';

import { getEntryPath, Location, LocationToPath } from '../../app/config/urls';

import { Namespace } from '../../shared/types/namespaces';
import { TabLocation } from '../components/entry/Entry';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import {
  EntryType,
  getEntryTypeFromString,
} from '../../shared/components/entry/EntryTypeIcon';
import EntrySection, { getEntrySectionNameAndId } from '../types/entrySection';
import FeatureType from '../types/featureType';
import { CommentType } from '../types/commentTypes';

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
      | LocationDescriptorObject
      | ((accession: string, taxId?: number) => LocationDescriptorObject);
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
      hash: getEntrySectionNameAndId(EntrySection.DiseaseAndDrugs, taxId).id,
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
      hash: getEntrySectionNameAndId(EntrySection.DiseaseAndDrugs, taxId).id,
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
    link: (accession) => ({
      pathname: generatePath(LocationToPath[Location.UniProtKBEntry], {
        accession,
        subPage: TabLocation.Publications,
      }),
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
}: UniProtkbAPIModel): Array<{
  name: string;
  link: LocationDescriptorObject;
}> => {
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

  const entryPathname = getEntryPath(Namespace.uniprotkb, primaryAccession);

  return highlightTuples
    .filter(([, count]) => count)
    .map(([entryHighlightSection, count]) => {
      const { link, prefixResolver } = highlightToEntrySection[
        entryHighlightSection
      ];
      const locationObject =
        typeof link === 'function'
          ? link(primaryAccession, organism?.taxonId)
          : link;
      return {
        link: {
          pathname: entryPathname,
          ...locationObject,
        },
        name: `${count} ${
          prefixResolver?.(entryType) ?? ''
        }${entryHighlightSection}${count && count > 1 ? 's' : ''}`,
      };
    });
};

export default getProteinHighlights;
