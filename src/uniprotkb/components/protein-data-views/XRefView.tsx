import { ExpandableList, InfoList, Message } from 'franklin-sites';
import { type InfoListItem } from 'franklin-sites/dist/types/components/info-list';
import { groupBy, isEqual, partition, sortBy, uniqWith } from 'lodash-es';
import { type ComponentProps, Fragment, type JSX, type ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { type Xref } from '../../../shared/types/apiModel';
import { Namespace } from '../../../shared/types/namespaces';
import { pluralise } from '../../../shared/utils/utils';
import {
  getDatabaseInfoAttribute,
  processUrlTemplate,
} from '../../../shared/utils/xrefs';
import { TabLocation } from '../../../uniparc/types/entry';
import {
  databaseCategoryToString,
  viewProteinLinkDatabases,
} from '../../config/database';
import {
  DatabaseCategory,
  type DatabaseInfoPoint,
} from '../../types/databaseRefs';
import { PropertyKey } from '../../types/modelTypes';
import { type DatabaseToDatabaseInfo } from '../../utils/database';
import {
  partitionStructureDatabases,
  type XrefsGoupedByDatabase,
  type XrefUIModel,
} from '../../utils/xrefUtils';
import { AFDBOutOfSync } from './AFDBOutOfSync';
import EMBLView from './EMBLView';
import { RichText } from './FreeTextView';
import PDBView from './PDBView';
import styles from './styles/x-ref-view.module.scss';

const formatSuffixWithCount = (prefix: string, number: string) => {
  const count = parseInt(number, 10);
  if (count <= 0) {
    return '';
  }
  return `${count} ${pluralise(prefix, count)}`;
};

export const getPropertyString = (key?: string, value?: string) => {
  if (!value || value === '-') {
    return '';
  }
  if (key === PropertyKey.MatchStatus) {
    return formatSuffixWithCount('hit', value);
  }
  if (
    key === PropertyKey.Interactions ||
    key === PropertyKey.NumberOfInteractors
  ) {
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
  const attribute = getDatabaseInfoAttribute(attributes, property);
  const id = xref.properties?.[property];

  return {
    url: id && processUrlTemplate(attribute?.uriLink, { [property]: id }),
    text: id,
  };
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
  PropertyKey.NucleotideSequenceId,
]);

// To be ignored when processing as strings because we should use them somehow somewhere else
const propertyKeyIgnore = new Set<PropertyKey>([
  PropertyKey.ResistanceMechanismIdentifier,
  PropertyKey.ResistanceMechanismName,
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
      if (propertyKeyIgnore.has(key as PropertyKey)) {
        continue;
      } else if (propertyKeySet.has(key as PropertyKey)) {
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

  let resistanceMechanismNode;
  if (database === 'CARD' && properties) {
    resistanceMechanismNode = (
      <div className={styles['resistance-mechanism-container']}>
        <span className={styles['resistance-angle']}>∟</span> Resistance
        mechanism:
        <div className={styles['resistance-details']}>
          <ExternalLink
            url={processUrlTemplate(uriLink, {
              id: properties[PropertyKey.ResistanceMechanismIdentifier],
            })}
          >
            {properties[PropertyKey.ResistanceMechanismIdentifier]}
          </ExternalLink>
          {properties[PropertyKey.ResistanceMechanismName]}
        </div>
      </div>
    );
  }

  let isoformNode;
  if (isoformId) {
    isoformNode = (
      <>
        [
        <Link
          to={{
            pathname: generatePath(LocationToPath[Location.UniProtKBEntry], {
              accession: primaryAccession,
            }),
            hash: isoformId,
          }}
        >
          {isoformId}
        </Link>
        ]
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

  let text = id;
  if (implicit) {
    if (databaseType === 'SWISS-MODEL-Workspace') {
      text = 'Submit a new modelling project…';
    } else if (
      (databaseType === 'ClinGen' || databaseType === 'GenCC') &&
      properties?.id
    ) {
      text = properties?.id;
    } else {
      text = 'Search…';
    }
  }

  // Remove links from the xref which are the same (ie same url and text).
  // An example of where duplicate links would be displayed is P0A879
  const linkAttributes = uniqWith(
    [
      // Main link attributes
      { url: processUrlTemplate(uriLink, params), text },
      // Property links
      ...propertyLinkAttributes,
    ],
    isEqual
  );

  return (
    <>
      {linkAttributes.map(({ url, text }, index) => (
        <ExternalLink url={url || null} key={url || index}>
          {text}
        </ExternalLink>
      ))}
      <RichText noLink>
        {propertyStrings
          // remove empty strings
          .filter(Boolean)
          // add space between strings
          .join(' ')}
      </RichText>
      {resistanceMechanismNode && <> {resistanceMechanismNode}</>}
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

export const XRefsGroupedByCategory = ({
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
          translate="no"
        >
          {databaseInfo.displayName}
        </Link>
      ),
      content: (
        <>
          <DatabaseList
            xrefsGoupedByDatabase={database}
            primaryAccession={primaryAccession}
            crc64={crc64}
            databaseToDatabaseInfo={databaseToDatabaseInfo}
          />
          {database.database === 'AlphaFoldDB' && <AFDBOutOfSync />}
        </>
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

type MessageLevel = ComponentProps<typeof Message>['level'];
type MessageParams = {
  level: MessageLevel;
  content: ReactNode;
  key: string;
};

type XRefViewProps = {
  xrefs: XrefUIModel[];
  primaryAccession: string;
  crc64?: string;
  uniParcID?: string;
  message?: MessageParams;
};

const XRefView = ({
  xrefs,
  primaryAccession,
  crc64,
  uniParcID,
  message,
}: XRefViewProps) => {
  const messages: MessageParams[] = message ? [message] : [];
  return (
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

        if (
          category === DatabaseCategory.DOMAIN &&
          uniParcID &&
          databases.some((db) => db.database === 'InterPro')
        ) {
          messages.push({
            level: 'info',
            key: 'domain-uniparc-interpro',
            content: (
              <>
                View all family and domain features for this entry&apos;s
                canonical sequence in the{' '}
                <Link
                  to={getEntryPath(
                    Namespace.uniparc,
                    uniParcID,
                    TabLocation.FeatureViewer
                  )}
                >
                  UniParc Feature Viewer
                </Link>
                .
              </>
            ),
          });
        }

        const messagesGroupedByLevel = groupBy(
          messages,
          (message) => message.level
        );

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <h3>{title}</h3>
            {Object.entries(messagesGroupedByLevel).map(([level, messages]) => (
              <Message key={level} level={level as MessageLevel}>
                <ul>
                  {messages.map((message) => (
                    <li key={message.key}>{message.content}</li>
                  ))}
                </ul>
              </Message>
            ))}
            {xrefsNode}
          </Fragment>
        );
      })}
    </>
  );
};

export default XRefView;
