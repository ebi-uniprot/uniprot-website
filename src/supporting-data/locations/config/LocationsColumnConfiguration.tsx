import { Link } from 'react-router-dom';
import { ExpandableList, ExternalLink } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';

import { getEntryPathFor } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

import { LocationsAPIModel } from '../adapters/locationsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
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
  render: ({ geneOntologies }) =>
    geneOntologies?.length && (
      <ExpandableList descriptionString="GO terms" displayNumberOfHiddenItems>
        {geneOntologies.map(({ name, goId }) => (
          <ExternalLink key={goId} url={externalUrls.QuickGO(goId)}>
            {name} ({goId})
          </ExternalLink>
        ))}
      </ExpandableList>
    ),
});

LocationsColumnConfiguration.set(LocationsColumn.id, {
  label: 'ID',
  render: ({ id }) =>
    id && <AccessionView id={id} namespace={Namespace.locations} />,
});

LocationsColumnConfiguration.set(LocationsColumn.isA, {
  label: 'Is a',
  render: ({ isA }) =>
    isA?.length && (
      <ExpandableList descriptionString="locations" displayNumberOfHiddenItems>
        {isA.map((location) => (
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
  render: ({ links }) =>
    links?.length && (
      <ExpandableList descriptionString="links" displayNumberOfHiddenItems>
        {links.map((link) => (
          <ExternalLink key={link} url={link} tidyUrl />
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
  render: ({ partOf }) =>
    partOf?.length && (
      <ExpandableList descriptionString="locations" displayNumberOfHiddenItems>
        {partOf.map((location) => (
          <Link key={location.id} to={getEntryPath(location.id)}>
            {location.name}
          </Link>
        ))}
      </ExpandableList>
    ),
});

LocationsColumnConfiguration.set(LocationsColumn.references, {
  label: 'References',
  // TODO: review and feedback to backend which format we want (needs to be consistent)
  render: ({ references }) =>
    references?.length && (
      <ExpandableList descriptionString="references" displayNumberOfHiddenItems>
        {references}
      </ExpandableList>
    ),
});

LocationsColumnConfiguration.set(LocationsColumn.synonyms, {
  label: 'Synonyms',
  render: ({ synonyms }) =>
    synonyms?.length && (
      <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
        {synonyms}
      </ExpandableList>
    ),
});

export default LocationsColumnConfiguration;
