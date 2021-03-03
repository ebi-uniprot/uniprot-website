import { Link } from 'react-router-dom';
import { ExpandableList, ExternalLink, LongNumber } from 'franklin-sites';

import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import { getEntryPathFor } from '../../../app/config/urls';

import { LocationsAPIModel } from '../adapters/locationsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { Namespace } from '../../../shared/types/namespaces';

export enum LocationsColumn {
  category = 'category',
  content = 'content',
  definition = 'definition',
  // Called "gene_ontology" in the locations schema...
  geneOntologies = 'gene_ontologies',
  id = 'id',
  isA = 'is_a',
  keyword = 'keyword',
  links = 'links',
  name = 'name',
  note = 'note',
  partOf = 'part_of',
  references = 'references',
  statistics = 'statistics',
  synonyms = 'synonyms',
}

// TODO: decide which ones should be default
export const defaultColumns = [
  LocationsColumn.id,
  LocationsColumn.name,
  LocationsColumn.category,
  LocationsColumn.geneOntologies,
  LocationsColumn.isA,
];

export const primaryKeyColumn = LocationsColumn.id;

const getEntryPath = getEntryPathFor(Namespace.locations);
const getEntryPathForKeywords = getEntryPathFor(Namespace.keywords);

export const LocationsColumnConfiguration: ColumnConfiguration<
  LocationsColumn,
  Partial<LocationsAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
LocationsColumnConfiguration.set(LocationsColumn.category, {
  label: 'Category',
  render: ({ category }) => category,
});

LocationsColumnConfiguration.set(LocationsColumn.content, {
  label: 'Content',
  render: ({ content }) => content,
});

LocationsColumnConfiguration.set(LocationsColumn.definition, {
  label: 'Definition',
  render: ({ definition }) => definition,
});

LocationsColumnConfiguration.set(LocationsColumn.geneOntologies, {
  label: 'Gene Ontologies',
  render: ({ geneOntologies }) => (
    <ExpandableList descriptionString="GO terms" displayNumberOfHiddenItems>
      {geneOntologies?.map(({ name, goId }) => `${name} (${goId})`)}
    </ExpandableList>
  ),
});

LocationsColumnConfiguration.set(LocationsColumn.id, {
  label: 'ID',
  render: ({ id }) => id && <Link to={getEntryPath(id)}>{id}</Link>,
});

LocationsColumnConfiguration.set(LocationsColumn.isA, {
  label: 'Is a',
  render: ({ isA }) => (
    <ExpandableList descriptionString="locations" displayNumberOfHiddenItems>
      {isA?.map((location) => (
        <Link key={location.id} to={getEntryPath(location.id)}>
          {location.name}
        </Link>
      ))}
    </ExpandableList>
  ),
});

LocationsColumnConfiguration.set(LocationsColumn.keyword, {
  label: 'Keyword',
  render: ({ keyword }) =>
    keyword && (
      <Link to={getEntryPathForKeywords(keyword.id)}>{keyword.name}</Link>
    ),
});

LocationsColumnConfiguration.set(LocationsColumn.links, {
  label: 'Links',
  render: ({ links }) => (
    <ExpandableList descriptionString="links" displayNumberOfHiddenItems>
      {links?.map((link) => (
        <ExternalLink key={link} url={link}>
          {link}
        </ExternalLink>
      ))}
    </ExpandableList>
  ),
});

LocationsColumnConfiguration.set(LocationsColumn.name, {
  label: 'Name',
  render: ({ name }) => name,
});

LocationsColumnConfiguration.set(LocationsColumn.note, {
  label: 'Note',
  render: ({ note }) => note,
});

LocationsColumnConfiguration.set(LocationsColumn.partOf, {
  label: 'Part of',
  render: ({ partOf }) => (
    <ExpandableList descriptionString="locations" displayNumberOfHiddenItems>
      {partOf?.map((location) => (
        <Link key={location.id} to={getEntryPath(location.id)}>
          {location.name}
        </Link>
      ))}
    </ExpandableList>
  ),
});

LocationsColumnConfiguration.set(LocationsColumn.references, {
  label: 'References',
  render: ({ references }) => (
    <ExpandableList descriptionString="references" displayNumberOfHiddenItems>
      {references}
    </ExpandableList>
  ),
});

LocationsColumnConfiguration.set(LocationsColumn.statistics, {
  label: 'Mapping to',
  render: ({ statistics }) => (
    <>
      {statistics?.reviewedProteinCount ? (
        <div>
          <EntryTypeIcon entryType={EntryType.REVIEWED} />
          <LongNumber>{statistics.reviewedProteinCount}</LongNumber> reviewed
          entr{statistics.reviewedProteinCount === 1 ? 'y' : 'ies'}
        </div>
      ) : undefined}
      {statistics?.unreviewedProteinCount ? (
        <div>
          <EntryTypeIcon entryType={EntryType.UNREVIEWED} />
          <LongNumber>{statistics.unreviewedProteinCount}</LongNumber>{' '}
          unreviewed entr{statistics.unreviewedProteinCount === 1 ? 'y' : 'ies'}
        </div>
      ) : undefined}
    </>
  ),
});

LocationsColumnConfiguration.set(LocationsColumn.synonyms, {
  label: 'Synonyms',
  render: ({ synonyms }) => (
    <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
      {synonyms}
    </ExpandableList>
  ),
});

export default LocationsColumnConfiguration;
