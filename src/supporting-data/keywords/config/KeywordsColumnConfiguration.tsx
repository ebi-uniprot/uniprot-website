import { Link } from 'react-router-dom';
import { ExpandableList, ExternalLink } from 'franklin-sites';

import { getEntryPathFor } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

import { KeywordsAPIModel } from '../adapters/keywordsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

export enum KeywordsColumn {
  category = 'category',
  children = 'children',
  definition = 'definition',
  // Called "gene_ontologies" in the locations schema...
  geneOntologies = 'gene_ontologies',
  id = 'id',
  name = 'name',
  parents = 'parents',
  // Those are links, not biological sites
  links = 'links',
  statistics = 'statistics',
  // This is a list of synonyms, regardless of the singular in the name
  synonym = 'synonym',
}

export const defaultColumns = [
  KeywordsColumn.id,
  KeywordsColumn.name,
  KeywordsColumn.category,
  KeywordsColumn.geneOntologies,
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
  render: ({ category }) =>
    category && <Link to={getEntryPath(category.id)}>{category.name}</Link>,
});

KeywordsColumnConfiguration.set(KeywordsColumn.children, {
  label: 'Children',
  render: ({ children }) => (
    <ExpandableList descriptionString="children" displayNumberOfHiddenItems>
      {children?.map((child) => (
        <Link key={child.keyword.id} to={getEntryPath(child.keyword.id)}>
          {child.keyword.name}
        </Link>
      ))}
    </ExpandableList>
  ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.definition, {
  label: 'Definition',
  render: ({ definition }) => definition,
});

KeywordsColumnConfiguration.set(KeywordsColumn.geneOntologies, {
  label: 'Gene Ontologies',
  render: ({ geneOntologies }) => (
    <ExpandableList descriptionString="GO terms" displayNumberOfHiddenItems>
      {geneOntologies?.map(({ name, goId }) => (
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
    keyword && <Link to={getEntryPath(keyword.id)}>{keyword.name}</Link>,
});

KeywordsColumnConfiguration.set(KeywordsColumn.name, {
  label: 'Name',
  render: ({ keyword }) => keyword?.name,
});

KeywordsColumnConfiguration.set(KeywordsColumn.parents, {
  label: 'Parents',
  render: ({ parents }) => (
    <ExpandableList descriptionString="parents" displayNumberOfHiddenItems>
      {parents?.map((parent) => (
        <Link key={parent.keyword.id} to={getEntryPath(parent.keyword.id)}>
          {parent.keyword.name}
        </Link>
      ))}
    </ExpandableList>
  ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.links, {
  label: 'Links',
  render: ({ links }) => (
    <ExpandableList descriptionString="links" displayNumberOfHiddenItems>
      {links?.map((link) => (
        <ExternalLink key={link} url={link} tidyUrl />
      ))}
    </ExpandableList>
  ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.synonym, {
  label: 'Synonyms',
  render: ({ synonyms }) => (
    <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
      {synonyms}
    </ExpandableList>
  ),
});

export default KeywordsColumnConfiguration;
