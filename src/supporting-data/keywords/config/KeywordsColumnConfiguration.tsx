import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import ExternalLink from '../../../shared/components/ExternalLink';

import { getEntryPathFor } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';
import { mapToLinks } from '../../../shared/components/MapTo';

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
  synonyms = 'synonyms',
}

export const defaultColumns = [
  KeywordsColumn.id,
  KeywordsColumn.name,
  KeywordsColumn.category,
  KeywordsColumn.geneOntologies,
];

export const primaryKeyColumns = [KeywordsColumn.id];

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

// NOTE: since these will be used in an info list, we need to return null when
// NOTE: no content, otherwise it gets a truthy empty fragment instead
KeywordsColumnConfiguration.set(KeywordsColumn.children, {
  // Warning, inconsistent naming in data! TODO: backend change
  label: 'Ancestors',
  render: ({ children }) =>
    children?.length ? (
      <ExpandableList descriptionString="ancestors" displayNumberOfHiddenItems>
        {children?.map((child) => (
          <Link key={child.keyword.id} to={getEntryPath(child.keyword.id)}>
            {child.keyword.name}
          </Link>
        ))}
      </ExpandableList>
    ) : null,
});

KeywordsColumnConfiguration.set(KeywordsColumn.definition, {
  label: 'Definition',
  render: ({ definition }) => definition,
});

KeywordsColumnConfiguration.set(KeywordsColumn.geneOntologies, {
  label: 'Gene Ontology (GO)',
  render: ({ geneOntologies }) =>
    geneOntologies?.length ? (
      <ExpandableList descriptionString="GO terms" displayNumberOfHiddenItems>
        {geneOntologies?.map(({ name, goId }) => (
          <ExternalLink key={goId} url={externalUrls.QuickGO(goId)}>
            {name} ({goId})
          </ExternalLink>
        ))}
      </ExpandableList>
    ) : null,
});

KeywordsColumnConfiguration.set(KeywordsColumn.id, {
  label: 'ID',
  render: ({ keyword }) =>
    keyword && <Link to={getEntryPath(keyword.id)}>{keyword.id}</Link>,
});

KeywordsColumnConfiguration.set(KeywordsColumn.name, {
  label: 'Name',
  render: ({ keyword }) => keyword?.name,
});

KeywordsColumnConfiguration.set(KeywordsColumn.parents, {
  // Warning, inconsistent naming in data! TODO: backend change
  label: 'Descendants',
  render: ({ parents }) =>
    parents?.length ? (
      <ExpandableList
        descriptionString="descendants"
        displayNumberOfHiddenItems
      >
        {parents?.map((parent) => (
          <Link key={parent.keyword.id} to={getEntryPath(parent.keyword.id)}>
            {parent.keyword.name}
          </Link>
        ))}
      </ExpandableList>
    ) : null,
});

KeywordsColumnConfiguration.set(KeywordsColumn.links, {
  label: 'Links',
  render: ({ links }) =>
    links?.length ? (
      <ExpandableList descriptionString="links" displayNumberOfHiddenItems>
        {links?.map((link) => (
          <ExternalLink key={link} url={link} tidyUrl />
        ))}
      </ExpandableList>
    ) : null,
});

KeywordsColumnConfiguration.set(KeywordsColumn.synonyms, {
  label: 'Synonyms',
  render: ({ synonyms }) =>
    synonyms?.length ? (
      <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
        {synonyms}
      </ExpandableList>
    ) : null,
});

KeywordsColumnConfiguration.set(KeywordsColumn.statistics, {
  label: 'Statistics',
  render: ({ keyword, statistics }) => (
    <ExpandableList>
      {mapToLinks(Namespace.keywords, keyword?.id, statistics)?.map(
        ({ key, link, name }) => (
          // eslint-disable-next-line uniprot-website/use-config-location
          <Link key={key} to={link}>
            {name}
          </Link>
        )
      )}
    </ExpandableList>
  ),
});

export default KeywordsColumnConfiguration;
