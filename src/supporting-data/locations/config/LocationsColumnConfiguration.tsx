import { ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPathFor } from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import { mapToLinks } from '../../../shared/components/MapTo';
import AccessionView from '../../../shared/components/results/AccessionView';
import GeneOntologies from '../../../shared/components/results/GeneOntologies';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import { LocationsAPIModel } from '../adapters/locationsConverter';

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

export const primaryKeyColumns = [LocationsColumn.id];

const getEntryPath = getEntryPathFor(Namespace.locations);
const getEntryPathForKeywords = getEntryPathFor(Namespace.keywords);

const LocationsColumnConfiguration: ColumnConfiguration<
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

// NOTE: since these will be used in an info list, we need to return null when
// NOTE: no content, otherwise it gets a truthy empty fragment instead
LocationsColumnConfiguration.set(LocationsColumn.geneOntologies, {
  label: 'Gene Ontology (GO)',
  render: ({ geneOntologies }) => (
    <GeneOntologies geneOntologies={geneOntologies} />
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
    isA?.length ? (
      <ExpandableList descriptionString="locations" displayNumberOfHiddenItems>
        {isA?.map((location) => (
          <Link key={location.id} to={getEntryPath(location.id)}>
            {location.name}
          </Link>
        ))}
      </ExpandableList>
    ) : null,
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
    links?.length ? (
      <ExpandableList descriptionString="links" displayNumberOfHiddenItems>
        {links?.map((link) => <ExternalLink key={link} url={link} tidyUrl />)}
      </ExpandableList>
    ) : null,
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
    partOf?.length ? (
      <ExpandableList descriptionString="locations" displayNumberOfHiddenItems>
        {partOf?.map((location) => (
          <Link key={location.id} to={getEntryPath(location.id)}>
            {location.name}
          </Link>
        ))}
      </ExpandableList>
    ) : null,
});

LocationsColumnConfiguration.set(LocationsColumn.references, {
  label: 'References',
  // TODO: review and feedback to backend which format we want (needs to be consistent)
  render: ({ references }) =>
    references?.length ? (
      <ExpandableList descriptionString="references" displayNumberOfHiddenItems>
        {references}
      </ExpandableList>
    ) : null,
});

LocationsColumnConfiguration.set(LocationsColumn.synonyms, {
  label: 'Synonyms',
  render: ({ synonyms }) =>
    synonyms?.length ? (
      <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
        {synonyms}
      </ExpandableList>
    ) : null,
});

LocationsColumnConfiguration.set(LocationsColumn.statistics, {
  label: 'Statistics',
  render: ({ id, statistics }) => (
    <ExpandableList>
      {mapToLinks(Namespace.locations, id, statistics)}
    </ExpandableList>
  ),
});

export default LocationsColumnConfiguration;
