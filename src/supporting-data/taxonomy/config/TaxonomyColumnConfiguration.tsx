import { ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPathFor } from '../../../app/config/urls';
import { TaxonomyLineage } from '../../../shared/components/entry/TaxonomyView';
import ExternalLink from '../../../shared/components/ExternalLink';
import { mapToLinks } from '../../../shared/components/MapTo';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../adapters/taxonomyConverter';

export enum TaxonomyColumn {
  commonName = 'common_name',
  hosts = 'hosts',
  id = 'id',
  lineage = 'lineage',
  links = 'links',
  mnemonic = 'mnemonic',
  otherNames = 'other_names',
  parent = 'parent',
  rank = 'rank',
  // This is triggering the same filters than "statistics", so probably no need
  // for a specific column renderer
  // TODO: ask backend to remove this one, duplicate with statistics https://www.ebi.ac.uk/panda/jira/browse/TRM-30869
  reviewed = 'reviewed',
  scientificName = 'scientific_name',
  statistics = 'statistics',
  strains = 'strains',
  synonyms = 'synonyms',
}

export const defaultColumns = [
  TaxonomyColumn.id,
  TaxonomyColumn.commonName,
  TaxonomyColumn.scientificName,
  TaxonomyColumn.lineage,
  TaxonomyColumn.links,
];

export const primaryKeyColumns = [TaxonomyColumn.id];

const getEntryPath = getEntryPathFor(Namespace.taxonomy);

const TaxonomyColumnConfiguration: ColumnConfiguration<
  TaxonomyColumn,
  Partial<TaxonomyAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
TaxonomyColumnConfiguration.set(TaxonomyColumn.commonName, {
  label: 'Common name',
  render: ({ commonName }) => commonName,
});

// NOTE: since these will be used in an info list, we need to return null when
// NOTE: no content, otherwise it gets a truthy empty fragment instead
TaxonomyColumnConfiguration.set(TaxonomyColumn.hosts, {
  label: 'Hosts',
  render: ({ hosts }) =>
    hosts?.length ? (
      <ExpandableList descriptionString="hosts" displayNumberOfHiddenItems>
        {hosts?.map(({ taxonId, scientificName, commonName }) => (
          <Link key={taxonId} to={getEntryPath(taxonId)}>
            {commonName || scientificName || taxonId}
          </Link>
        ))}
      </ExpandableList>
    ) : null,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.id, {
  label: 'Taxon ID',
  render: ({ taxonId }) =>
    taxonId && <Link to={getEntryPath(taxonId)}>{taxonId}</Link>,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.lineage, {
  label: 'Lineage',
  render: ({ lineage }) => <TaxonomyLineage lineage={lineage} />,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.links, {
  label: 'Links',
  render: ({ taxonId, links }) => {
    const allLinks = [
      // Exception, always add the NCBI one as it's not in the data
      `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&amp;id=${taxonId}`,
      ...(links || []),
    ];
    return (
      <ExpandableList descriptionString="links" displayNumberOfHiddenItems>
        {allLinks.map((link) => (
          <ExternalLink key={link} url={link} tidyUrl>
            {new URL(link).hostname}
          </ExternalLink>
        ))}
      </ExpandableList>
    );
  },
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.mnemonic, {
  label: 'Mnemonic name',
  render: ({ mnemonic }) => mnemonic,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.otherNames, {
  label: 'Other names',
  render: ({ otherNames }) =>
    otherNames?.length ? (
      <ExpandableList descriptionString="names" displayNumberOfHiddenItems>
        {otherNames}
      </ExpandableList>
    ) : null,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.parent, {
  label: 'Parent',
  render: ({ parent }) =>
    parent?.taxonId ? (
      <Link to={getEntryPath(parent.taxonId)}>
        {parent.commonName || parent.scientificName || parent.taxonId}
      </Link>
    ) : undefined,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.rank, {
  label: 'Rank',
  render: ({ rank }) => rank,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.scientificName, {
  label: 'Scientific name',
  render: ({ scientificName }) => scientificName,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.strains, {
  label: 'Strains',
  render: ({ strains }) =>
    strains?.length ? (
      <ExpandableList descriptionString="strains" displayNumberOfHiddenItems>
        {strains?.map((strain) => (
          <>
            {strain.name}
            {strain.synonyms?.length && ` (${strain.synonyms.join(', ')})`}
          </>
        ))}
      </ExpandableList>
    ) : null,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.synonyms, {
  label: 'Synonyms',
  render: ({ synonyms }) =>
    synonyms?.length ? (
      <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
        {synonyms}
      </ExpandableList>
    ) : null,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.statistics, {
  label: 'Statistics',
  render: ({ taxonId, statistics }) => (
    <ExpandableList>
      {mapToLinks(Namespace.taxonomy, `${taxonId}`, statistics)}
    </ExpandableList>
  ),
});

// TODO: ask backend to remove this one, duplicate with statistics https://www.ebi.ac.uk/panda/jira/browse/TRM-30869
TaxonomyColumnConfiguration.set(TaxonomyColumn.reviewed, {
  label: 'Reviewed (deprecated column)',
  render: ({ taxonId, statistics }) =>
    mapToLinks(
      Namespace.taxonomy,
      `${taxonId}`,
      statistics,
      ({ key }) => key === 'reviewedProteinCount'
    ),
});

export default TaxonomyColumnConfiguration;
