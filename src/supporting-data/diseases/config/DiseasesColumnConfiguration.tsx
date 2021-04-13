import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import { getEntryPathFor } from '../../../app/config/urls';

import { DiseasesAPIModel } from '../adapters/diseasesConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import AccessionView from '../../../shared/components/results/AccessionView';

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

export const defaultColumns = [
  DiseasesColumn.id,
  DiseasesColumn.name,
  DiseasesColumn.keywords,
];

export const primaryKeyColumn = DiseasesColumn.id;

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
  render: ({ alternativeNames }) =>
    alternativeNames?.length && (
      <ExpandableList
        descriptionString="alternative names"
        displayNumberOfHiddenItems
      >
        {alternativeNames}
      </ExpandableList>
    ),
});

// NOTE: should probably be links
DiseasesColumnConfiguration.set(DiseasesColumn.crossReferences, {
  label: 'Cross references',
  // TODO: https://www.ebi.ac.uk/panda/jira/browse/TRM-25838
  render: ({ crossReferences }) =>
    crossReferences?.length && (
      <ExpandableList
        descriptionString="cross references"
        displayNumberOfHiddenItems
      >
        {crossReferences.map(
          ({ databaseType, id, properties }) =>
            `${databaseType}: ${id}${
              properties?.length ? ` (${properties.join(', ')})` : ''
            }`
        )}
      </ExpandableList>
    ),
});

DiseasesColumnConfiguration.set(DiseasesColumn.definition, {
  label: 'Definition',
  render: ({ definition }) => definition,
});

DiseasesColumnConfiguration.set(DiseasesColumn.id, {
  label: 'ID',
  render: ({ id }) =>
    id && <AccessionView id={id} namespace={Namespace.diseases} />,
});

DiseasesColumnConfiguration.set(DiseasesColumn.keywords, {
  label: 'Keywords',
  render: ({ keywords }) =>
    keywords?.length && (
      <ExpandableList descriptionString="keywords" displayNumberOfHiddenItems>
        {keywords.map(({ name, id }) => (
          <Link key={id} to={getEntryPathForKeyword(id)}>
            {name}
          </Link>
        ))}
      </ExpandableList>
    ),
});

DiseasesColumnConfiguration.set(DiseasesColumn.name, {
  label: 'Name',
  render: ({ name }) => name,
});

export default DiseasesColumnConfiguration;
