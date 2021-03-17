import { ExpandableList } from 'franklin-sites';

import {
  CitationsAPIModel,
  CitationXRefDB,
} from '../adapters/citationsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { JournalInfo } from '../components/LiteratureCitation';
import { Namespace } from '../../../shared/types/namespaces';
import AccessionView from '../../../shared/components/results/AccessionView';

export enum CitationsColumn {
  // Authoring group is not the author list
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

// TODO: decide which ones should be default
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

export const CitationsColumnConfiguration: ColumnConfiguration<
  CitationsColumn,
  Partial<CitationsAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
CitationsColumnConfiguration.set(CitationsColumn.authoringGroup, {
  label: 'Authoring group',
  render: ({ citation }) =>
    citation?.authoringGroup && (
      <ExpandableList descriptionString="groups" displayNumberOfHiddenItems>
        {citation.authoringGroup}
      </ExpandableList>
    ),
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
    return id && <AccessionView id={id} namespace={Namespace.citations} />;
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

// TODO: might not be needed as a column
// CitationsColumnConfiguration.set(CitationsColumn.statistics, {
//   label: 'Statistics',
//   render: ({ statistics }) => JSON.stringify(statistics),
// });

CitationsColumnConfiguration.set(CitationsColumn.title, {
  label: 'Title',
  render: ({ citation }) => citation?.title,
});

CitationsColumnConfiguration.set(CitationsColumn.volume, {
  label: 'Volume',
  render: ({ citation }) => citation?.volume,
});

export default CitationsColumnConfiguration;
