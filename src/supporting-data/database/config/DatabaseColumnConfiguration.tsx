import { CodeBlock, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import { mapToLinks } from '../../../shared/components/MapTo';
import AccessionView from '../../../shared/components/results/AccessionView';
import externalUrls from '../../../shared/config/externalUrls';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../../uniprotkb/utils/resultsUtils';
import { DatabaseAPIModel } from '../adapters/databaseConverter';

export enum DatabaseColumn {
  abbrev = 'abbrev',
  category = 'category',
  // URL template for a specific entry within this database
  dbUrl = 'dbUrl',
  doiId = 'doi_id',
  id = 'id',
  linkType = 'link_type',
  name = 'name',
  pubmedId = 'pubmed_id',
  // URL of the home page of the database
  servers = 'servers',
  statistics = 'statistics',
}

export const defaultColumns = [
  DatabaseColumn.id,
  DatabaseColumn.name,
  DatabaseColumn.abbrev,
  DatabaseColumn.category,
];

export const primaryKeyColumns = [DatabaseColumn.id];

const DatabaseColumnConfiguration: ColumnConfiguration<
  DatabaseColumn,
  Partial<DatabaseAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
DatabaseColumnConfiguration.set(DatabaseColumn.abbrev, {
  label: 'Abbreviation',
  render: ({ abbrev }) => abbrev,
});

DatabaseColumnConfiguration.set(DatabaseColumn.category, {
  label: 'Category',
  render: ({ category }) =>
    category && (
      <Link
        to={({ search }) => {
          const [params] = getParamsFromURL(search);
          return getLocationObjForParams({
            pathname: LocationToPath[Location.DatabaseResults],
            ...params,
            selectedFacets: [
              ...params.selectedFacets.filter(
                ({ name }) => name !== 'category_exact'
              ),
              { name: 'category_exact', value: category },
            ],
          });
        }}
      >
        {category}
      </Link>
    ),
});

DatabaseColumnConfiguration.set(DatabaseColumn.dbUrl, {
  label: 'DB URL template',
  render: ({ dbUrl }) => dbUrl && <CodeBlock lightMode>{dbUrl}</CodeBlock>,
});

DatabaseColumnConfiguration.set(DatabaseColumn.doiId, {
  label: 'DOI ID',
  render: ({ doiId }) =>
    doiId && <ExternalLink url={externalUrls.DOI(doiId)}>{doiId}</ExternalLink>,
});

DatabaseColumnConfiguration.set(DatabaseColumn.id, {
  label: 'ID',
  render: ({ id }) =>
    id && <AccessionView id={id} namespace={Namespace.database} />,
});

DatabaseColumnConfiguration.set(DatabaseColumn.linkType, {
  label: 'Link type',
  render: ({ linkType }) => linkType,
});

DatabaseColumnConfiguration.set(DatabaseColumn.name, {
  label: 'Name',
  render: ({ name }) => name,
});

DatabaseColumnConfiguration.set(DatabaseColumn.pubmedId, {
  label: 'PubMed ID',
  render: ({ pubMedId }) =>
    pubMedId && (
      <ExternalLink url={externalUrls.PubMed(pubMedId)}>
        {pubMedId}
      </ExternalLink>
    ),
});

DatabaseColumnConfiguration.set(DatabaseColumn.servers, {
  label: 'Servers',
  render: ({ servers }) =>
    servers?.map((server) => (
      <div key={server}>
        <ExternalLink url={server} tidyUrl />
      </div>
    )),
});

DatabaseColumnConfiguration.set(DatabaseColumn.statistics, {
  label: 'Statistics',
  render: ({ id, statistics }) => (
    <ExpandableList>
      {mapToLinks(Namespace.database, id, statistics)}
    </ExpandableList>
  ),
});

export default DatabaseColumnConfiguration;
