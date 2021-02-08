import { Fragment, FC } from 'react';
import { sortBy } from 'lodash-es';
import { InfoList, ExternalLink, ExpandableList } from 'franklin-sites';

import {
  databaseCategoryToString,
  databaseToDatabaseInfo,
  viewProteinLinkDatabases,
} from '../../config/database';
import {
  XrefUIModel,
  XrefsGoupedByDatabase,
  partitionStructureDatabases,
} from '../../utils/xrefUtils';
import { Xref } from '../../../shared/types/apiModel';
import { PropertyKey } from '../../types/modelTypes';
import {
  DatabaseInfoPoint,
  AttributesItem,
  DatabaseCategory,
} from '../../types/databaseRefs';
import PDBView from './PDBView';
import EMBLXrefProperties from '../../config/emblXrefPropertiesData.json';
import externalUrls from '../../../shared/config/externalUrls';

export const processUrlTemplate = (
  urlTemplate: string,
  params: { [key: string]: string }
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
  return ` ${count} ${prefix}${count > 1 ? 's' : ''}`;
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

export const getPropertyLink = (
  databaseInfo: DatabaseInfoPoint,
  property: PropertyKey,
  xref: Xref
) => {
  const { attributes } = databaseInfo;
  if (!attributes) {
    return null;
  }
  const attribute = getDatabaseInfoAttribute(attributes, property);
  const { properties } = xref;
  if (!properties) {
    return null;
  }
  const id = properties[property];
  if (!id || !attribute || !attribute.uriLink) {
    return null;
  }
  const url = processUrlTemplate(attribute.uriLink, { [property]: id });
  return (
    <ExternalLink key={url} url={url}>
      {id}
    </ExternalLink>
  );
};

type XRefProps = {
  database: string;
  xref: Xref;
  primaryAccession?: string;
  crc64?: string;
};

const EMBLXref: FC<{
  databaseInfo: DatabaseInfoPoint;
  params: { [key: string]: string };
  id: string | undefined;
  xref: Xref;
  isoformNode?: JSX.Element;
}> = ({ databaseInfo, params, id, xref, isoformNode }) => {
  // M28638 (EMBL|GenBank|DDBJ)
  const genBankInfo = databaseToDatabaseInfo.GenBank;
  const ddbjInfo = databaseToDatabaseInfo.DDBJ;
  const { properties, additionalIds } = xref;
  if (!genBankInfo || !ddbjInfo) {
    // eslint-disable-next-line no-console
    console.warn(
      'GenBank or DDBJ database information not found in drlineconiguration'
    );
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
      {properties &&
        properties.ProteinId &&
        properties.ProteinId !== '-' &&
        getPropertyLink(databaseInfo, PropertyKey.ProteinId, xref)}
      {properties &&
        properties.Status &&
        EMBLXrefProperties[
          properties.Status as keyof typeof EMBLXrefProperties
        ]}
      {isoformNode}
    </>
  );
};

export const XRef: FC<XRefProps> = ({
  database,
  xref,
  primaryAccession,
  crc64,
}): JSX.Element | null => {
  const databaseInfo = databaseToDatabaseInfo[database];
  const { properties, isoformId, id, database: databaseType } = xref;
  const { uriLink, implicit } = databaseInfo;
  if (!database || !primaryAccession) {
    return null;
  }
  let propertiesNode;
  if (properties && !implicit) {
    propertiesNode = Object.keys(properties).map((key) =>
      [PropertyKey.ProteinId, PropertyKey.GeneId].includes(key as PropertyKey)
        ? getPropertyLink(databaseInfo, key as PropertyKey, xref)
        : getPropertyString(key, properties[key])
    );
  }

  let isoformNode;
  if (isoformId) {
    isoformNode = (
      <>
        [<a href={`#${isoformId}`}>{isoformId}</a>]
      </>
    );
  }

  const params: { [key: string]: string } = {
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
        ? 'Submit a new modelling project...'
        : 'Search...';
  } else {
    text = id;
  }

  return (
    <>
      <ExternalLink url={processUrlTemplate(uriLink, params)}>
        {text}
      </ExternalLink>{' '}
      {propertiesNode} {isoformNode}
    </>
  );
};

export const DatabaseList: FC<{
  xrefsGoupedByDatabase: XrefsGoupedByDatabase;
  primaryAccession: string;
  crc64?: string;
}> = ({
  xrefsGoupedByDatabase: { database, xrefs },
  primaryAccession,
  crc64,
}) => {
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

const XRefsGroupedByCategory: FC<XRefsGroupedByCategoryProps> = ({
  databases,
  primaryAccession,
  crc64,
}) => {
  const infoData = sortBy(databases, ({ database }) => [
    databaseToDatabaseInfo?.[database].implicit,
    database,
  ]).map((database): {
    title: string;
    content: JSX.Element;
  } => {
    const databaseInfo = databaseToDatabaseInfo[database.database];
    return {
      title: databaseInfo.displayName,
      content: (
        <DatabaseList
          xrefsGoupedByDatabase={database}
          primaryAccession={primaryAccession}
          crc64={crc64}
        />
      ),
    };
  });
  return <InfoList infoData={infoData} columns />;
};

type StructureXRefsGroupedByCategoryProps = {
  databases: XrefsGoupedByDatabase[];
  primaryAccession: string;
  crc64?: string;
};

const StructureXRefsGroupedByCategory: FC<StructureXRefsGroupedByCategoryProps> = ({
  databases,
  primaryAccession,
  crc64,
}) => {
  const { PDBDatabase, otherStructureDatabases } = partitionStructureDatabases(
    databases
  );
  let PDBViewNode;
  if (PDBDatabase && PDBDatabase.xrefs.length) {
    PDBViewNode = <PDBView xrefs={PDBDatabase.xrefs} noStructure />;
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

const XRefView: FC<XRefViewProps> = ({ xrefs, primaryAccession, crc64 }) => {
  if (!xrefs) {
    return null;
  }
  const nodes = xrefs.map(
    ({ databases, category }, index): JSX.Element => {
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
    }
  );
  return <>{nodes}</>;
};

export default XRefView;
