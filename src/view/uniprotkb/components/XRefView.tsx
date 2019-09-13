import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList, ExternalLink, ExpandableList } from 'franklin-sites';
import {
  databaseCategoryToString,
  databaseToDatabaseInfo,
} from '../../../data/database';
import {
  XrefUIModel,
  Xref,
  XrefsGoupedByDatabase,
} from '../../../model/utils/XrefUtils';
import { Property, PropertyKey } from '../../../model/types/modelTypes';

type XRefProps = {
  xrefs: XrefUIModel[];
  primaryAccession: string;
};

type XRefItemProps = {
  xRefEntry: Xref;
  primaryAccession: string;
};

type XRefCategoryInfoListProps = {
  databases: XrefsGoupedByDatabase[];
  primaryAccession: string;
};

type XrefItem = {
  databaseCategory: string;
  xref: Xref;
};

type XRefExternalLinkProps = {
  url: string;
  accession?: string | null | undefined;
  id?: string | null | undefined;
  children: string | string[];
};

export const XRefExternalLink: React.FC<XRefExternalLinkProps> = ({
  url,
  accession,
  id,
  children,
}): JSX.Element => {
  let link = url;
  if (accession) {
    link = link.replace(/%acc/g, accession);
  }
  if (id) {
    link = link.replace(/%value/g, id);
  }
  return <ExternalLink url={link}>{children}</ExternalLink>;
};

export const getPropertyString = (property: Property) => {
  const { key, value } = property;
  if (!value || value === '-') {
    return '';
  }
  if (key === PropertyKey.MatchStatus) {
    const hits = parseInt(value, 10);
    if (hits <= 0) {
      return '';
    }
    return `- ${value} hit${hits > 1 ? 's' : ''}`;
  }
  return `${value}`;
};

const XRefItem: React.FC<XRefItemProps> = ({ xRefEntry, primaryAccession }) => {
  const {
    databaseType: database,
    properties: entryProperties,
    isoformId,
    id,
  } = xRefEntry;
  if (
    !id ||
    !database ||
    !primaryAccession ||
    !(database in databaseToDatabaseInfo)
  ) {
    return null;
  }
  const info = databaseToDatabaseInfo[database];
  let properties = '';
  if (entryProperties) {
    properties = entryProperties
      .map((property: Property) => getPropertyString(property))
      .join(' ');
  }
  let isoformLink;
  if (isoformId) {
    isoformLink = (
      <a href={`#${isoformId}`}>
[
        {isoformId}
]
      </a>
);
  }
  return (
    <Fragment>
      <XRefExternalLink url={info.uriLink} accession={primaryAccession} id={id}>
        {id}
      </XRefExternalLink>
      {' '}
      {properties} 
      {' '}
      {isoformLink}
    </Fragment>
  );
};

const XRefCategoryInfoList: React.FC<XRefCategoryInfoListProps> = ({
  databases,
  primaryAccession,
}): JSX.Element => {
  const infoData = databases.sort().map(
    (database): { title: string; content: JSX.Element } => ({
      title: database.database,
      content: (
        <ExpandableList descriptionString={`${database.database} links`}>
          {database.xrefs.map(
            (xref): { id: string; content: JSX.Element } => ({
              id: v1(),
              content: (
                <XRefItem
                  xRefEntry={xref}
                  primaryAccession={primaryAccession}
                />
              ),
            })
          )}
        </ExpandableList>
      ),
    })
  );
  return <InfoList infoData={infoData} columns />;
};

const XRefView: React.FC<XRefProps> = ({
  xrefs,
  primaryAccession,
}): JSX.Element | null => {
  if (!xrefs) {
    return null;
  }
  const nodes = xrefs.map(
    (xrefCategory): JSX.Element => {
      const infoListNode = (
        <XRefCategoryInfoList
          databases={xrefCategory.databases}
          primaryAccession={primaryAccession}
        />
      );
      let title;
      const { category } = xrefCategory;
      if (category && databaseCategoryToString[category]) {
        title = databaseCategoryToString[category];
      }
      return (
        <Fragment key={v1()}>
          <h4>{title}</h4>
          {infoListNode}
        </Fragment>
      );
    }
  );
  return <Fragment>{nodes}</Fragment>;
};

export default XRefView;
