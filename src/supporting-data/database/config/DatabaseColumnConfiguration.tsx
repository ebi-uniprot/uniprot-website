import { Link } from 'react-router-dom';
import { ExternalLink, CodeBlock } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';

import externalUrls from '../../../shared/config/externalUrls';
import { LocationToPath, Location } from '../../../app/config/urls';
import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../../uniprotkb/utils/resultsUtils';

import { DatabaseAPIModel } from '../adapters/databaseConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

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
  reviewedProteinCount = 'reviewed_protein_count',
  // URL of the home page of the database
  server = 'server',
  unreviewedProteinCount = 'unreviewed_protein_count',
}

export const defaultColumns = [
  DatabaseColumn.id,
  DatabaseColumn.name,
  DatabaseColumn.abbrev,
  DatabaseColumn.category,
];

export const primaryKeyColumn = DatabaseColumn.id;

export const DatabaseColumnConfiguration: ColumnConfiguration<
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
          const parsed = getParamsFromURL(search);
          return getLocationObjForParams({
            pathname: LocationToPath[Location.DatabaseResults],
            ...parsed,
            selectedFacets: [
              ...parsed.selectedFacets.filter(
                ({ name }) => name !== 'category_facet'
              ),
              { name: 'category_facet', value: category },
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

DatabaseColumnConfiguration.set(DatabaseColumn.server, {
  label: 'Server',
  render: ({ server }) => server && <ExternalLink url={server} tidyUrl />,
});

export default DatabaseColumnConfiguration;
