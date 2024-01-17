import { Link } from 'react-router-dom';
import { ExpandableList, ExternalLink } from 'franklin-sites';

import { JournalInfo } from '../components/LiteratureCitation';

import parseDate from '../../../shared/utils/parseDate';
import cleanText, {
  cleanTextDefaultOptions,
  getTransformTags,
} from '../../../shared/utils/cleanText';
import { getEntryPathFor } from '../../../app/config/urls';
import { mapToLinks } from '../../../shared/components/MapTo';
import externalUrls from '../../../shared/config/externalUrls';

import {
  CitationsAPIModel,
  CitationXRefDB,
} from '../adapters/citationsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

import helper from '../../../shared/styles/helper.module.scss';

export enum CitationsColumn {
  authors = 'authors',
  authoringGroup = 'authoring_group',
  doi = 'doi',
  firstPage = 'first_page',
  id = 'id',
  journal = 'journal',
  lastPage = 'last_page',
  litAbstract = 'lit_abstract',
  publicationDate = 'publication_date',
  // This map to a combination of all the fields to make a citation reference
  reference = 'reference',
  statistics = 'statistics',
  title = 'title',
  volume = 'volume',
}

export const defaultColumns = [
  CitationsColumn.id,
  CitationsColumn.title,
  CitationsColumn.authors,
  CitationsColumn.publicationDate,
  CitationsColumn.journal,
  CitationsColumn.firstPage,
  CitationsColumn.lastPage,
  CitationsColumn.statistics,
];

export const primaryKeyColumns = [CitationsColumn.id];

const getEntryPath = getEntryPathFor(Namespace.citations);

const CitationsColumnConfiguration: ColumnConfiguration<
  CitationsColumn,
  Partial<CitationsAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
CitationsColumnConfiguration.set(CitationsColumn.authoringGroup, {
  label: 'Authoring group',
  render: ({ citation }) => (
    <ExpandableList descriptionString="groups" displayNumberOfHiddenItems>
      {citation?.authoringGroup}
    </ExpandableList>
  ),
});

CitationsColumnConfiguration.set(CitationsColumn.authors, {
  label: 'Authors',
  render: ({ citation }) => (
    <ExpandableList descriptionString="authors" displayNumberOfHiddenItems>
      {citation?.authors}
    </ExpandableList>
  ),
});

CitationsColumnConfiguration.set(CitationsColumn.doi, {
  label: 'DOI',
  render: ({ citation }) => {
    const doiId = citation?.citationCrossReferences?.find(
      (xref) => xref.database === CitationXRefDB.DOI
    )?.id;
    return (
      doiId && (
        <ExternalLink url={externalUrls.DOI(doiId)} key={doiId}>
          {doiId}
        </ExternalLink>
      )
    );
  },
});

CitationsColumnConfiguration.set(CitationsColumn.firstPage, {
  label: 'First page',
  render: ({ citation }) => citation?.firstPage,
});

CitationsColumnConfiguration.set(CitationsColumn.id, {
  label: 'ID',
  render: ({ citation }) =>
    citation?.id && (
      <Link to={getEntryPath(citation.id)} className={helper['no-wrap']}>
        {citation.id}
      </Link>
    ),
});

CitationsColumnConfiguration.set(CitationsColumn.journal, {
  label: 'Journal',
  render: ({ citation }) => citation?.journal,
});

CitationsColumnConfiguration.set(CitationsColumn.lastPage, {
  label: 'Last page',
  render: ({ citation }) => citation?.lastPage,
});

CitationsColumnConfiguration.set(CitationsColumn.litAbstract, {
  label: 'Abstract',
  render: ({ citation }) =>
    citation?.literatureAbstract && (
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: cleanText(citation.literatureAbstract, {
            ...cleanTextDefaultOptions,
            transformTags: {
              ...getTransformTags('strong'),
            },
          }),
        }}
      />
    ),
});

CitationsColumnConfiguration.set(CitationsColumn.publicationDate, {
  label: 'Publication date',
  render: ({ citation }) =>
    citation?.publicationDate && (
      <time dateTime={parseDate(citation.publicationDate)?.toISOString()}>
        {citation.publicationDate}
      </time>
    ),
});

CitationsColumnConfiguration.set(CitationsColumn.reference, {
  label: 'Full reference',
  render: ({ citation }) => citation && <JournalInfo journalInfo={citation} />,
});

CitationsColumnConfiguration.set(CitationsColumn.title, {
  label: 'Title',
  render: ({ citation }) => citation?.title,
});

CitationsColumnConfiguration.set(CitationsColumn.volume, {
  label: 'Volume',
  render: ({ citation }) => citation?.volume,
});

CitationsColumnConfiguration.set(CitationsColumn.statistics, {
  label: 'Statistics',
  render: ({ citation, statistics }) => (
    <ExpandableList>
      {mapToLinks(Namespace.citations, citation?.id, statistics)?.map(
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

export default CitationsColumnConfiguration;
