import { Fragment } from 'react';
import { isEqual, partition, sortBy, uniqWith } from 'lodash-es';
import { InfoList, ExternalLink, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';
import { InfoListItem } from 'franklin-sites/dist/types/components/info-list';

import { pluralise } from '../../../shared/utils/utils';
import * as logging from '../../../shared/utils/logging';

import PDBView from './PDBView';
import EMBLView from './EMBLView';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import {
  databaseCategoryToString,
  viewProteinLinkDatabases,
} from '../../config/database';
import {
  XrefUIModel,
  XrefsGoupedByDatabase,
  partitionStructureDatabases,
} from '../../utils/xrefUtils';
import externalUrls from '../../../shared/config/externalUrls';

import { LocationToPath, Location } from '../../../app/config/urls';
import { Xref } from '../../../shared/types/apiModel';
import { PropertyKey } from '../../types/modelTypes';
import {
  DatabaseInfoPoint,
  AttributesItem,
  DatabaseCategory,
} from '../../types/databaseRefs';
import { DatabaseToDatabaseInfo } from '../../utils/database';

import EMBLXrefProperties from '../../config/emblXrefPropertiesData.json';

export const processUrlTemplate = (
  urlTemplate: string,
  params: Record<string, string>
) => {
  let url = urlTemplate;
  Object.entries(params).forEach(([param, value]) => {
    url = url.replace(new RegExp(`%${param}`, 'g'), value);
  });
  return url;
};

export const getDatabaseInfoAttribute = (
  attributes: AttributesItem[],
  name: string
) => attributes.find(({ name: n }) => n === name);

const formatSuffixWithCount = (prefix: string, number: string) => {
  const count = parseInt(number, 10);
  if (count <= 0) {
    return '';
  }
  return ` ${count} ${pluralise(prefix, count)}`;
};

export const getPropertyString = (key?: string, value?: string) => {
  if (!value || value === '-') {
    return '';
  }
  if (key === PropertyKey.MatchStatus) {
    return formatSuffixWithCount('hit', value);
  }
  if (key === PropertyKey.Interactions) {
    return formatSuffixWithCount('interactor', value);
  }
  return value;
};

export const getPropertyLinkAttributes = (
  databaseInfo: DatabaseInfoPoint,
  property: PropertyKey,
  xref: Xref
) => {
  const { attributes } = databaseInfo;
  if (!attributes) {
    return null;
  }
  const attribute = getDatabaseInfoAttribute(attributes, property);
  const id = xref.properties?.[property];
  if (!id || !attribute || !attribute.uriLink) {
    return null;
  }
  const url = processUrlTemplate(attribute.uriLink, { [property]: id });
  return {
    url,
    text: id,
  };
};

type EMBLXrefProps = {
  databaseInfo: DatabaseInfoPoint;
  genBankInfo: DatabaseInfoPoint;
  ddbjInfo: DatabaseInfoPoint;
  params: { [key: string]: string };
  id: string | undefined;
  xref: Xref;
  isoformNode?: JSX.Element;
};

const EMBLXref = ({
  databaseInfo,
  genBankInfo,
  ddbjInfo,
  params,
  id,
  xref,
  isoformNode,
}: EMBLXrefProps) => {
  // M28638 (EMBL|GenBank|DDBJ)
  const { properties, additionalIds } = xref;
  if (!databaseInfo?.uriLink || !genBankInfo?.uriLink || !ddbjInfo?.uriLink) {
    logging.error(
      'EMBL, GenBank or DDBJ database information not found in database configuration file'
    );
    return null;
  }
  let proteinIdPropertyLink;
  if (properties && properties.ProteinId && properties.ProteinId !== '-') {
    const linkAttributes = getPropertyLinkAttributes(
      databaseInfo,
      PropertyKey.ProteinId,
      xref
    );
    if (linkAttributes) {
      const { url, text } = linkAttributes;
      proteinIdPropertyLink = (
        <ExternalLink key={url} url={url}>
          {text}
        </ExternalLink>
      );
    }
  }
  return (
    <>
      (
      <ExternalLink url={processUrlTemplate(databaseInfo.uriLink, params)}>
        EMBL
      </ExternalLink>
      {' | '}
      <ExternalLink url={processUrlTemplate(genBankInfo.uriLink, params)}>
        GenBank
      </ExternalLink>
      {' | '}
      <ExternalLink url={processUrlTemplate(ddbjInfo.uriLink, params)}>
        DDBJ
      </ExternalLink>
      {') '}
      {id && <ExternalLink url={externalUrls.ENA(id)}>{id}</ExternalLink>}
      {additionalIds &&
        additionalIds.map((additionalId) => (
          <ExternalLink url={externalUrls.ENA(additionalId)} key={additionalId}>
            {additionalId}
          </ExternalLink>
        ))}
      {properties &&
        properties.MoleculeType &&
        `${
          EMBLXrefProperties[
            properties.MoleculeType as keyof typeof EMBLXrefProperties
          ]
        }: `}
      {proteinIdPropertyLink}
      {properties &&
        properties.Status &&
        EMBLXrefProperties[
          properties.Status as keyof typeof EMBLXrefProperties
        ]}
      {isoformNode}
    </>
  );
};

type XRefProps = {
  database: string;
  xref: Xref;
  primaryAccession?: string;
  crc64?: string;
  databaseToDatabaseInfo: DatabaseToDatabaseInfo;
};

const propertyKeySet = new Set<PropertyKey>([
  PropertyKey.ProteinId,
  PropertyKey.GeneId,
  PropertyKey.RefSeqNucleotideId,
  PropertyKey.RefSeqProteinId,
]);

export const XRef = ({
  database,
  xref,
  primaryAccession,
  crc64,
  databaseToDatabaseInfo,
}: XRefProps) => {
  const databaseInfo = databaseToDatabaseInfo[database];
  const { properties, isoformId, id, database: databaseType } = xref;
  const { uriLink, implicit } = databaseInfo;
  if (!database || !primaryAccession) {
    return null;
  }
  const propertyLinkAttributes = [];
  const propertyStrings = [];
  if (properties && !implicit) {
    for (const [key, value] of Object.entries(properties)) {
      if (propertyKeySet.has(key as PropertyKey)) {
        const attrs = getPropertyLinkAttributes(
          databaseInfo,
          key as PropertyKey,
          xref
        );
        if (attrs) {
          propertyLinkAttributes.push(attrs);
        }
      } else {
        propertyStrings.push(getPropertyString(key, value));
      }
    }
  }

  let isoformNode;
  if (isoformId) {
    isoformNode = (
      <>
        [<a href={`#${isoformId}`}>{isoformId}</a>]
      </>
    );
  }

  const params: Record<string, string> = {
    primaryAccession,
    ...properties,
  };

  if (id) {
    params.id = id;
  }
  if (crc64) {
    params.crc64 = crc64;
  }

  if (database === 'EMBL') {
    return (
      <EMBLXref
        databaseInfo={databaseInfo}
        genBankInfo={databaseToDatabaseInfo.GenBank}
        ddbjInfo={databaseToDatabaseInfo.DDBJ}
        params={params}
        id={id}
        xref={xref}
        isoformNode={isoformNode}
      />
    );
  }
  let text;
  if (implicit) {
    text =
      databaseType === 'SWISS-MODEL-Workspace'
        ? 'Submit a new modelling project…'
        : 'Search…';
  } else {
    text = id;
  }

  // Remove links from the xref which are the same (ie same url and text).
  // An example of where duplicate links would be displayed is P0A879
  const linkAttributes = uniqWith(
    [
      // Main link attributes
      { url: uriLink ? processUrlTemplate(uriLink, params) : undefined, text },
      // Property links
      ...propertyLinkAttributes,
    ],
    isEqual
  );

  return (
    <>
      {linkAttributes.map(({ url, text }) =>
        url ? (
          <ExternalLink url={url} key={url}>
            {text}
          </ExternalLink>
        ) : (
          text
        )
      )}
      {propertyStrings}
      {isoformNode && <> {isoformNode}</>}
    </>
  );
};

type DatabaseListProps = {
  xrefsGoupedByDatabase: XrefsGoupedByDatabase;
  primaryAccession: string;
  crc64?: string;
  databaseToDatabaseInfo: DatabaseToDatabaseInfo;
};

export const DatabaseList = ({
  xrefsGoupedByDatabase: { database, xrefs },
  primaryAccession,
  crc64,
  databaseToDatabaseInfo,
}: DatabaseListProps) => {
  // This step is needed as some databases (eg InterPro) have an additional link:
  // "View protein in InterPro" at the top of the xref links.
  const viewLink = viewProteinLinkDatabases.get(database);
  return (
    <ExpandableList descriptionString={`${database} links`}>
      {viewLink && (
        <ExternalLink
          key="view-link"
          url={viewLink(primaryAccession)}
        >{`View protein in ${database}`}</ExternalLink>
      )}
      {xrefs.map((xref, index) => (
        <XRef
          databaseToDatabaseInfo={databaseToDatabaseInfo}
          key={index} // eslint-disable-line react/no-array-index-key
          database={database}
          xref={xref}
          primaryAccession={primaryAccession}
          crc64={crc64}
        />
      ))}
    </ExpandableList>
  );
};

type XRefsGroupedByCategoryProps = {
  databases: XrefsGoupedByDatabase[];
  primaryAccession: string;
  crc64?: string;
};

const XRefsGroupedByCategory = ({
  databases,
  primaryAccession,
  crc64,
}: XRefsGroupedByCategoryProps) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  if (!databaseInfoMaps) {
    return null;
  }
  const { databaseToDatabaseInfo } = databaseInfoMaps;

  const [emblDatabase, restDatabases] = partition(
    databases,
    ({ database }) => database === 'EMBL'
  );

  const infoData: InfoListItem[] = sortBy(restDatabases, ({ database }) => [
    databaseToDatabaseInfo?.[database].implicit,
    database,
  ]).map((database) => {
    const databaseInfo = databaseToDatabaseInfo[database.database];
    return {
      title: (
        <Link
          to={{
            pathname: LocationToPath[Location.DatabaseResults],
            search: `query=(name:${databaseInfo.displayName})&direct`,
          }}
        >
          {databaseInfo.displayName}
        </Link>
      ),
      content: (
        <DatabaseList
          xrefsGoupedByDatabase={database}
          primaryAccession={primaryAccession}
          crc64={crc64}
          databaseToDatabaseInfo={databaseToDatabaseInfo}
        />
      ),
    };
  });
  return (
    <>
      <InfoList infoData={infoData} columns />
      {!!emblDatabase?.[0]?.xrefs.length && (
        <EMBLView xrefs={emblDatabase[0].xrefs} />
      )}
    </>
  );
};

type StructureXRefsGroupedByCategoryProps = {
  databases: XrefsGoupedByDatabase[];
  primaryAccession: string;
  crc64?: string;
};

const StructureXRefsGroupedByCategory = ({
  databases,
  primaryAccession,
  crc64,
}: StructureXRefsGroupedByCategoryProps) => {
  const { PDBDatabase, otherStructureDatabases } =
    partitionStructureDatabases(databases);
  let PDBViewNode;
  if (PDBDatabase && PDBDatabase.xrefs.length) {
    PDBViewNode = <PDBView xrefs={PDBDatabase.xrefs} />;
  }
  return (
    <>
      {PDBViewNode}
      {otherStructureDatabases && otherStructureDatabases.length && (
        <XRefsGroupedByCategory
          databases={otherStructureDatabases}
          primaryAccession={primaryAccession}
          crc64={crc64}
        />
      )}
    </>
  );
};

type XRefViewProps = {
  xrefs: XrefUIModel[];
  primaryAccession: string;
  crc64?: string;
};

const XRefView = ({ xrefs, primaryAccession, crc64 }: XRefViewProps) => (
  <>
    {xrefs?.map(({ databases, category }, index): JSX.Element => {
      const xrefsNode =
        category === DatabaseCategory.STRUCTURE ? (
          <StructureXRefsGroupedByCategory
            databases={databases}
            primaryAccession={primaryAccession}
            crc64={crc64}
          />
        ) : (
          <XRefsGroupedByCategory
            databases={databases}
            primaryAccession={primaryAccession}
            crc64={crc64}
          />
        );
      let title;
      if (category && databaseCategoryToString[category]) {
        title = databaseCategoryToString[category];
      }
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          <h3>{title}</h3>
          {xrefsNode}
        </Fragment>
      );
    })}
  </>
);

export default XRefView;
