import { Link } from 'react-router-dom';
import { ExpandableList, LongNumber } from 'franklin-sites';

import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import { getEntryPathFor } from '../../../app/config/urls';

import { KeywordsAPIModel } from '../adapters/keywordsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';
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
  sites = 'sites',
  statistics = 'statistics',
  // This is a list of synomyms, regardless of the singular in the name
  synonym = 'synonym',
}

// TODO: review
export const defaultColumns = [
  KeywordsColumn.id,
  KeywordsColumn.name,
  KeywordsColumn.category,
  KeywordsColumn.geneOntology,
];

export const primaryKeyColumn = KeywordsColumn.id;

const getEntryPath = getEntryPathFor(Namespace.diseases);

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

KeywordsColumnConfiguration.set(KeywordsColumn.description, {
  label: 'Definition',
  render: ({ definition }) => definition,
});

KeywordsColumnConfiguration.set(KeywordsColumn.geneOntology, {
  label: 'Gene Ontologies',
  render: ({ geneOntologies }) => (
    <ExpandableList descriptionString="GO terms" displayNumberOfHiddenItems>
      {geneOntologies?.map(({ name, goId }) => `${name} (${goId})`)}
    </ExpandableList>
  ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.id, {
  label: 'ID',
  render: ({ keyword }) =>
    keyword?.id && <Link to={getEntryPath(keyword.id)}>{keyword.id}</Link>,
});

KeywordsColumnConfiguration.set(KeywordsColumn.name, {
  label: 'Name',
  render: ({ keyword }) => keyword?.name,
});

KeywordsColumnConfiguration.set(KeywordsColumn.parent, {
  label: 'Parent',
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

KeywordsColumnConfiguration.set(KeywordsColumn.sites, {
  label: 'Sites',
  render: ({ sites }) => (
    <ExpandableList descriptionString="sites" displayNumberOfHiddenItems>
      {sites}
    </ExpandableList>
  ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.statistics, {
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

KeywordsColumnConfiguration.set(KeywordsColumn.synonym, {
  label: 'Synonym',
  render: ({ synonyms }) => (
    <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
      {synonyms}
    </ExpandableList>
  ),
});

export default KeywordsColumnConfiguration;
