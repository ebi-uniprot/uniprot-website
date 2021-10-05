import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import { getEntryPathFor } from '../../../app/config/urls';
import { mapToLinks } from '../../../shared/components/MapTo';

import { DiseasesAPIModel } from '../adapters/diseasesConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

import helper from '../../../shared/styles/helper.module.scss';

export enum DiseasesColumn {
  acronym = 'acronym',
  alternativeNames = 'alternative_names',
  crossReferences = 'cross_references',
  definition = 'definition',
  id = 'id',
  keywords = 'keywords',
  name = 'name',
  // TODO: remove this once the backend is fixed https://www.ebi.ac.uk/panda/jira/browse/TRM-26601
  reviewedProteinCount = 'reviewed_protein_count',
  // TODO: remove this once the backend is fixed https://www.ebi.ac.uk/panda/jira/browse/TRM-26601
  unreviewedProteinCount = 'unreviewed_protein_count',
  // NOTE: once the backend is fixed, this will be available https://www.ebi.ac.uk/panda/jira/browse/TRM-26601
  statistics = 'statistics',
}

export const defaultColumns = [
  DiseasesColumn.id,
  DiseasesColumn.name,
  DiseasesColumn.keywords,
];

export const primaryKeyColumns = [DiseasesColumn.id];

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
      {alternativeNames}
    </ExpandableList>
  ),
});

// NOTE: should probably be links
DiseasesColumnConfiguration.set(DiseasesColumn.crossReferences, {
  label: 'Cross references',
  // TODO: https://www.ebi.ac.uk/panda/jira/browse/TRM-25838
  render: ({ crossReferences }) => (
    <ExpandableList
      descriptionString="cross references"
      displayNumberOfHiddenItems
    >
      {crossReferences?.map(
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
    id && (
      <Link className={helper['no-wrap']} to={getEntryPath(id)}>
        {id}
      </Link>
    ),
});

DiseasesColumnConfiguration.set(DiseasesColumn.keywords, {
  label: 'Keywords',
  render: ({ keywords }) => (
    <ExpandableList descriptionString="keywords" displayNumberOfHiddenItems>
      {keywords?.map(({ name, id }) => (
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

DiseasesColumnConfiguration.set(DiseasesColumn.statistics, {
  label: 'Statistics',
  render: ({ id, statistics }) => (
    <ExpandableList>
      {mapToLinks(Namespace.diseases, id, statistics)?.map(
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

export default DiseasesColumnConfiguration;
