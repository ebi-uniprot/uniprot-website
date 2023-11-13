import { Card, ExpandableList } from 'franklin-sites';
import { groupBy } from 'lodash-es';

import ExternalLink from '../../../../shared/components/ExternalLink';
import XRefView from '../../protein-data-views/XRefView';

import { UniProtkbUIModel } from '../../../adapters/uniProtkbConverter';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../../types/entrySection';
import { XrefUIModel, XrefsGoupedByDatabase } from '../../../utils/xrefUtils';
import { WebResourceComment } from '../../../types/commentTypes';
import { DatabaseCategory } from '../../../types/databaseRefs';

type EntryExternalLinksProps = {
  transformedData: UniProtkbUIModel;
};

export type EntryExternalLinks = {
  xrefData: XrefUIModel[];
};

type WebResourceLinkProps = {
  comment: WebResourceComment;
};

const WebResourceLink = ({ comment }: WebResourceLinkProps) => {
  const { note, resourceName, resourceUrl } = comment;
  const noteNode = note && ` (${note})`;
  return (
    <ExternalLink url={resourceUrl}>
      {resourceName}
      {noteNode}
    </ExternalLink>
  );
};

const EntryExternalLinks = ({ transformedData }: EntryExternalLinksProps) => {
  const {
    [EntrySection.ExternalLinks]: data,
    primaryAccession,
    [EntrySection.Sequence]: { sequence },
  } = transformedData;
  // Needed for SMR implicit xref
  const crc64 = sequence && sequence.crc64;
  const webResourceComments = data.commentsData.get('WEB RESOURCE');

  // Merge all of the external links from the entry page sections
  const databaseCategoryToXrefsGoupedByDatabase = new Map<
    DatabaseCategory,
    XrefsGoupedByDatabase[]
  >();
  for (const entrySection of Object.values(EntrySection)) {
    const section = transformedData[entrySection];
    if ('xrefData' in section) {
      for (const { category, databases } of section.xrefData || []) {
        const currentDatabases =
          databaseCategoryToXrefsGoupedByDatabase.get(category);
        const newDatabases = currentDatabases
          ? [...currentDatabases, ...databases]
          : databases;
        databaseCategoryToXrefsGoupedByDatabase.set(category, newDatabases);
      }
    }
  }

  const xrefData = Array.from(
    databaseCategoryToXrefsGoupedByDatabase.entries()
  ).map(([category, xrefsGoupedByDatabase]) => ({
    category,
    databases: Object.values(
      groupBy(xrefsGoupedByDatabase, (xrefs) => xrefs.database)
      // Only need the first entry as it assumed that each database
      // list is the same across all of the sections
    ).map((v) => v[0]),
  }));

  return (
    <>
      <h2>{getEntrySectionNameAndId(EntrySection.ExternalLinks).name}</h2>
      <Card className="wider-tab-content">
        {webResourceComments?.length ? (
          <>
            <h3 data-article-id="web_resource">Web resources</h3>
            <ExpandableList descriptionString="alternative names">
              {webResourceComments.map((comment, index) => (
                <WebResourceLink
                  key={index} // eslint-disable-line react/no-array-index-key
                  comment={comment as WebResourceComment}
                />
              ))}
            </ExpandableList>
          </>
        ) : undefined}
        <XRefView
          xrefs={xrefData}
          primaryAccession={primaryAccession}
          crc64={crc64}
        />
      </Card>
    </>
  );
};

export default EntryExternalLinks;
