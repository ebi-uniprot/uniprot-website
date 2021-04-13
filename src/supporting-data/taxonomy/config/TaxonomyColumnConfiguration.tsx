import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ExpandableList, ExternalLink } from 'franklin-sites';

import { getEntryPathFor } from '../../../app/config/urls';

import { Lineage, TaxonomyAPIModel } from '../adapters/taxonomyConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import AccessionView from '../../../shared/components/results/AccessionView';

export enum TaxonomyColumn {
  commonName = 'common_name',
  // This is a list of hosts, regardless of the singular in the name
  host = 'host',
  id = 'id',
  lineage = 'lineage',
  links = 'links',
  mnemonic = 'mnemonic',
  otherNames = 'other_names',
  // Maps to "parentId" field, no full parent object
  parent = 'parent',
  rank = 'rank',
  // This is triggering the same filters than "statistics", so probably no need
  // for a specific column renderer
  reviewed = 'reviewed',
  scientificName = 'scientific_name',
  statistics = 'statistics',
  // This is a list of strains, regardless of the singular in the name
  strain = 'strain',
  // This is a list of synonyms, regardless of the singular in the name
  synonym = 'synonym',
}

// TODO: decide which ones should be default
export const defaultColumns = [
  TaxonomyColumn.id,
  TaxonomyColumn.commonName,
  TaxonomyColumn.scientificName,
  TaxonomyColumn.lineage,
];

export const primaryKeyColumn = TaxonomyColumn.id;

const getEntryPath = getEntryPathFor(Namespace.taxonomy);

export const TaxonomyColumnConfiguration: ColumnConfiguration<
  TaxonomyColumn,
  Partial<TaxonomyAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
TaxonomyColumnConfiguration.set(TaxonomyColumn.commonName, {
  label: 'Common name',
  render: ({ commonName }) => commonName,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.host, {
  label: 'Hosts',
  render: ({ hosts }) =>
    hosts?.length && (
      <ExpandableList descriptionString="hosts" displayNumberOfHiddenItems>
        {hosts.map(({ taxonId, scientificName, commonName }) => (
          <Link key={taxonId} to={getEntryPath(taxonId)}>
            {commonName || scientificName || taxonId}
          </Link>
        ))}
      </ExpandableList>
    ),
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.id, {
  label: 'Taxon ID',
  render: ({ taxonId }) =>
    taxonId && <AccessionView id={taxonId} namespace={Namespace.taxonomy} />,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.lineage, {
  label: 'Lineage',
  // TODO: modify when we have a common approach to represent lineages
  render: ({ lineage }) =>
    (lineage as Lineage)
      ?.filter(({ hidden }) => !hidden)
      .reverse()
      .map(({ taxonId, scientificName, commonName }, index) => (
        <Fragment key={taxonId}>
          {index ? ' > ' : undefined}
          <Link to={getEntryPath(taxonId)}>
            {commonName || scientificName || taxonId}
          </Link>
        </Fragment>
      )),
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.links, {
  label: 'Links',
  render: ({ links }) =>
    links?.length && (
      <ExpandableList descriptionString="links" displayNumberOfHiddenItems>
        {links.map((link) => (
          <ExternalLink key={link} url={link} tidyUrl />
        ))}
      </ExpandableList>
    ),
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.mnemonic, {
  label: 'Mnemonic name',
  render: ({ mnemonic }) => mnemonic,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.otherNames, {
  label: 'Other names',
  render: ({ otherNames }) =>
    otherNames?.length && (
      <ExpandableList
        descriptionString="other names"
        displayNumberOfHiddenItems
      >
        {otherNames}
      </ExpandableList>
    ),
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.parent, {
  label: 'Parent',
  render: ({ parentId }) =>
    parentId ? <Link to={getEntryPath(parentId)}>{parentId}</Link> : undefined,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.rank, {
  label: 'Rank',
  render: ({ rank }) => rank,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.scientificName, {
  label: 'Scientific name',
  render: ({ scientificName }) => scientificName,
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.strain, {
  label: 'Strains',
  render: ({ strains }) =>
    strains?.length && (
      <ExpandableList descriptionString="strains" displayNumberOfHiddenItems>
        {strains.map((strain) => strain.name)}
      </ExpandableList>
    ),
});

TaxonomyColumnConfiguration.set(TaxonomyColumn.synonym, {
  label: 'Synonym',
  render: ({ synonyms }) =>
    synonyms?.length && (
      <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
        {synonyms}
      </ExpandableList>
    ),
});

export default TaxonomyColumnConfiguration;
