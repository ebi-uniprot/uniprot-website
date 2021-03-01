import { Link } from 'react-router-dom';
import { ExpandableList, LongNumber } from 'franklin-sites';

import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import { getEntryPathFor } from '../../../app/config/urls';

import { DiseasesAPIModel } from '../adapters/diseasesConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { Namespace } from '../../../shared/types/namespaces';

export enum DiseasesColumn {
  acronym = 'acronym',
  alternativeNames = 'alternative_names',
  crossReferences = 'cross_references',
  definition = 'definition',
  id = 'id',
  keywords = 'keywords',
  name = 'name',
  reviewedProteinCount = 'reviewed_protein_count',
  unreviewedProteinCount = 'unreviewed_protein_count',
}

// TODO: review
export const defaultColumns = [
  DiseasesColumn.id,
  DiseasesColumn.name,
  DiseasesColumn.keywords,
  DiseasesColumn.reviewedProteinCount,
];

export const primaryKeyColumn = DiseasesColumn.id;

const getEntryPath = getEntryPathFor(Namespace.diseases);
const getEntryPathForKeyword = getEntryPathFor(Namespace.keywords);

export const DiseasesColumnConfiguration: ColumnConfiguration<
  DiseasesColumn,
  Partial<DiseasesAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
DiseasesColumnConfiguration.set(DiseasesColumn.acronym, {
  label: 'Acronym',
  render: ({ acronym }) => acronym,
});

DiseasesColumnConfiguration.set(DiseasesColumn.alternativeNames, {
  label: 'Alternative names',
  render: ({ alternativeNames }) => (
    <ExpandableList
      descriptionString="alternative names"
      displayNumberOfHiddenItems
    >
      {alternativeNames?.map((name) => name)}
    </ExpandableList>
  ),
});

DiseasesColumnConfiguration.set(DiseasesColumn.crossReferences, {
  label: 'Cross references',
  render: ({ crossReferences }) =>
    JSON.stringify(crossReferences, undefined, 2),
});

DiseasesColumnConfiguration.set(DiseasesColumn.definition, {
  label: 'Definition',
  render: ({ definition }) => definition,
});

DiseasesColumnConfiguration.set(DiseasesColumn.id, {
  label: 'ID',
  render: ({ id }) => id && <Link to={getEntryPath(id)}>{id}</Link>,
});

DiseasesColumnConfiguration.set(DiseasesColumn.keywords, {
  label: 'Keywords',
  render: ({ keywords }) => (
    <ExpandableList descriptionString="keywords" displayNumberOfHiddenItems>
      {keywords?.map(({ name, id }) => (
        <Link to={getEntryPathForKeyword(id)}>{name}</Link>
      ))}
    </ExpandableList>
  ),
});

DiseasesColumnConfiguration.set(DiseasesColumn.name, {
  label: 'Name',
  render: ({ name }) => name,
});

DiseasesColumnConfiguration.set(DiseasesColumn.reviewedProteinCount, {
  label: (
    <>
      <EntryTypeIcon entryType={EntryType.REVIEWED} />
      Mapped reviewed entries
    </>
  ),
  render: ({ reviewedProteinCount }) =>
    reviewedProteinCount !== undefined && (
      <LongNumber>{reviewedProteinCount}</LongNumber>
    ),
});

DiseasesColumnConfiguration.set(DiseasesColumn.unreviewedProteinCount, {
  label: (
    <>
      <EntryTypeIcon entryType={EntryType.UNREVIEWED} />
      Mapped unreviewed entries
    </>
  ),
  render: ({ unreviewedProteinCount }) =>
    unreviewedProteinCount !== undefined && (
      <LongNumber>{unreviewedProteinCount}</LongNumber>
    ),
});

export default DiseasesColumnConfiguration;
