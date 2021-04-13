import { Link } from 'react-router-dom';
import { ExpandableList, ExternalLink } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';

import { getEntryPathFor } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

import { KeywordsAPIModel } from '../adapters/keywordsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

export enum KeywordsColumn {
  category = 'category',
  children = 'children',
  // Called "description", but maps to a field called "definition"...
  description = 'description',
  // Called "gene_ontologies" in the locations schema...
  geneOntology = 'gene_ontology',
  id = 'id',
  name = 'name',
  parent = 'parent',
  // Those are links, not biological sites
  sites = 'sites',
  statistics = 'statistics',
  // This is a list of synonyms, regardless of the singular in the name
  synonym = 'synonym',
}

export const defaultColumns = [
  KeywordsColumn.id,
  KeywordsColumn.name,
  KeywordsColumn.category,
  KeywordsColumn.geneOntology,
];

export const primaryKeyColumn = KeywordsColumn.id;

const getEntryPath = getEntryPathFor(Namespace.keywords);

export const KeywordsColumnConfiguration: ColumnConfiguration<
  KeywordsColumn,
  Partial<KeywordsAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
KeywordsColumnConfiguration.set(KeywordsColumn.category, {
  label: 'Category',
  render: ({ category }) => category,
});

KeywordsColumnConfiguration.set(KeywordsColumn.children, {
  label: 'Children',
  render: ({ children }) =>
    children?.length && (
      <ExpandableList descriptionString="children" displayNumberOfHiddenItems>
        {children.map((child) => (
          <Link key={child.keyword.id} to={getEntryPath(child.keyword.id)}>
            {child.keyword.name}
          </Link>
        ))}
      </ExpandableList>
    ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.description, {
  label: 'Definition',
  render: ({ definition }) => definition,
});

KeywordsColumnConfiguration.set(KeywordsColumn.geneOntology, {
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

KeywordsColumnConfiguration.set(KeywordsColumn.id, {
  label: 'ID',
  render: ({ keyword }) =>
    keyword && <AccessionView namespace={Namespace.keywords} id={keyword.id} />,
});

KeywordsColumnConfiguration.set(KeywordsColumn.name, {
  label: 'Name',
  render: ({ keyword }) => keyword?.name,
});

KeywordsColumnConfiguration.set(KeywordsColumn.parent, {
  label: 'Parent',
  render: ({ parents }) =>
    parents?.length && (
      <ExpandableList descriptionString="parents" displayNumberOfHiddenItems>
        {parents.map((parent) => (
          <Link key={parent.keyword.id} to={getEntryPath(parent.keyword.id)}>
            {parent.keyword.name}
          </Link>
        ))}
      </ExpandableList>
    ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.sites, {
  label: 'Sites',
  render: ({ sites }) =>
    sites?.length && (
      <ExpandableList descriptionString="sites" displayNumberOfHiddenItems>
        {sites.map((site) => (
          <ExternalLink key={site} url={site} tidyUrl />
        ))}
      </ExpandableList>
    ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.synonym, {
  label: 'Synonyms',
  render: ({ synonyms }) =>
    synonyms?.length && (
      <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
        {synonyms}
      </ExpandableList>
    ),
});

export default KeywordsColumnConfiguration;
