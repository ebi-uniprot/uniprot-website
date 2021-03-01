import { Link } from 'react-router-dom';

import { getEntryPathFor } from '../../../app/config/urls';

import {
  CitationsAPIModel,
  CitationXRefDB,
} from '../adapters/citationsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { JournalInfo } from '../../../shared/components/literature-citations/LiteratureCitation';
import { Namespace } from '../../../shared/types/namespaces';

export enum CitationsColumn {
  // TODO: Report to backend that this field query is not working
  authoringGroup = 'authoring_group',
  doi = 'doi',
  firstPage = 'first_page',
  id = 'id', // Pubmed ID
  journal = 'journal',
  lastPage = 'last_page',
  litAbstract = 'lit_abstract',
  publicationDate = 'publication', // ⚠️ field doesn't contain the string "date"
  // This map to a combination of all the fields to make a citation reference
  reference = 'reference',
  statistics = 'statistics',
  title = 'title',
  volume = 'volume',
}

// TODO: review
export const defaultColumns = [
  CitationsColumn.id,
  CitationsColumn.title,
  CitationsColumn.authoringGroup,
  CitationsColumn.publicationDate,
  CitationsColumn.journal,
  CitationsColumn.firstPage,
  CitationsColumn.lastPage,
];

export const primaryKeyColumn = CitationsColumn.id;

const getEntryPath = getEntryPathFor(Namespace.citations);

export const CitationsColumnConfiguration: ColumnConfiguration<
  CitationsColumn,
  Partial<CitationsAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
CitationsColumnConfiguration.set(CitationsColumn.authoringGroup, {
  label: 'Authors',
  render: ({ citation }) => citation?.authors?.join(', '),
});

CitationsColumnConfiguration.set(CitationsColumn.doi, {
  label: 'DOI',
  render: ({ citation }) =>
    citation?.citationCrossReferences?.find(
      (xref) => xref.database === CitationXRefDB.DOI
    )?.id,
});

CitationsColumnConfiguration.set(CitationsColumn.firstPage, {
  label: 'First page',
  render: ({ citation }) => citation?.firstPage,
});

CitationsColumnConfiguration.set(CitationsColumn.id, {
  label: 'PubMed ID',
  render: ({ citation }) => {
    const id = citation?.citationCrossReferences?.find(
      (xref) => xref.database === CitationXRefDB.PubMed
    )?.id;
    return id && <Link to={getEntryPath(id)}>{id}</Link>;
  },
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
  render: ({ citation }) => citation?.literatureAbstract,
});

CitationsColumnConfiguration.set(CitationsColumn.publicationDate, {
  label: 'Publication year',
  render: ({ citation }) =>
    citation?.publicationDate && (
      <time dateTime={new Date(citation.publicationDate).toISOString()}>
        {citation.publicationDate}
      </time>
    ),
});

CitationsColumnConfiguration.set(CitationsColumn.reference, {
  label: 'Full reference',
  render: ({ citation }) => citation && <JournalInfo journalInfo={citation} />,
});

CitationsColumnConfiguration.set(CitationsColumn.statistics, {
  label: 'Statistics',
  // TODO
  render: ({ statistics }) => JSON.stringify(statistics),
});

CitationsColumnConfiguration.set(CitationsColumn.title, {
  label: 'Title',
  render: ({ citation }) => citation?.title,
});

CitationsColumnConfiguration.set(CitationsColumn.volume, {
  label: 'Volume',
  render: ({ citation }) => citation?.volume,
});

export default CitationsColumnConfiguration;
