import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import ExternalLink from '../../../shared/components/ExternalLink';

import { getEntryPathFor } from '../../../app/config/urls';
import { mapToLinks } from '../../../shared/components/MapTo';
import { processUrlTemplate } from '../../../shared/utils/xrefs';
import * as logging from '../../../shared/utils/logging';

import databaseToDatabaseInfo from './databaseInfoMaps';

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

// NOTE: since these will be used in an info list, we need to return null when
// NOTE: no content, otherwise it gets a truthy empty fragment instead
DiseasesColumnConfiguration.set(DiseasesColumn.alternativeNames, {
  label: 'Alternative names',
  render: ({ alternativeNames }) =>
    alternativeNames?.length ? (
      <ExpandableList
        descriptionString="alternative names"
        displayNumberOfHiddenItems
      >
        {alternativeNames}
      </ExpandableList>
    ) : null,
});

DiseasesColumnConfiguration.set(DiseasesColumn.crossReferences, {
  label: 'Cross references',
  render: ({ crossReferences }) => (
    <ExpandableList
      descriptionString="cross references"
      displayNumberOfHiddenItems
    >
      {crossReferences?.map(({ databaseType, id, properties }) => {
        let idNode;
        const databaseInfo = databaseToDatabaseInfo[databaseType];
        if (databaseInfo) {
          idNode = (
            // eslint-disable-next-line uniprot-website/use-config-location
            <ExternalLink
              url={processUrlTemplate(databaseInfo.uriLink, { id })}
            >
              {id}
            </ExternalLink>
          );
        } else {
          logging.warn(
            `Disease database information not found for ${databaseType}`
          );
          idNode = id;
        }
        return (
          <span key={`${databaseType}-${id}`} className={helper['no-wrap']}>
            {databaseType}: {idNode}
            {`${properties?.length ? ` (${properties.join(', ')})` : ''}`}
          </span>
        );
      })}
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
  render: ({ keywords }) =>
    keywords?.length ? (
      <ExpandableList descriptionString="keywords" displayNumberOfHiddenItems>
        {keywords?.map(({ name, id }) => (
          <Link key={id} to={getEntryPathForKeyword(id)}>
            {name}
          </Link>
        ))}
      </ExpandableList>
    ) : null,
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
