import { Loader } from 'franklin-sites';
import { ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../../../app/config/urls';
import apiUrls from '../../../../../shared/config/apiUrls/apiUrls';
import {
  EntryType,
  getEntryTypeFromString,
} from '../../../../../shared/config/entryTypeIcon';
import useDataApi from '../../../../../shared/hooks/useDataApi';
import { Namespace } from '../../../../../shared/types/namespaces';
import { SearchResults } from '../../../../../shared/types/results';
import { stringifyQuery } from '../../../../../shared/utils/url';
import { pickArticle } from '../../../../../shared/utils/utils';
import { TabLocation as UniParcTabLocation } from '../../../../../uniparc/types/entry';
import {
  DeletedReason,
  InactiveEntryReason,
  UniProtkbAPIModel,
} from '../../../../adapters/uniProtkbConverter';
import { TabLocation as UniProtKBTabLocation } from '../../../../types/entry';
import ActiveEntriesTable from './ActiveEntriesTable';
import styles from './styles/removed-entry-message.module.scss';

type RemovedEntryHeadingProps = {
  accession: string;
  uniparc?: string;
  merged?: boolean;
  sourceDatabase?: string;
};

const RemovedEntryHeading = ({
  accession,
  uniparc,
  merged,
  sourceDatabase,
}: RemovedEntryHeadingProps) => {
  let uniParcLink;
  if (
    uniparc &&
    getEntryTypeFromString(sourceDatabase) === EntryType.REVIEWED
  ) {
    uniParcLink = {
      pathname: generatePath(LocationToPath[Location.UniParcEntry], {
        accession: uniparc,
      }),
    };
  } else if (uniparc && !merged) {
    // In case of merging, we'll get the data of the new entry, so the
    // UniParc of the new entry, so don't pass that to not get wrong link
    uniParcLink = {
      pathname: generatePath(LocationToPath[Location.UniParcSubEntry], {
        accession: uniparc,
        subPage: UniParcTabLocation.Entry,
        subEntryId: accession,
      }),
    };
  } else {
    uniParcLink = {
      pathname: LocationToPath[Location.UniParcResults],
      search: stringifyQuery({ query: `dbid:${accession}`, direct: true }),
    };
  }

  return (
    <h4 data-article-id="deleted_accessions">
      This entry{!merged && ' is no longer annotated in UniProtKB and'} can be
      found in <Link to={uniParcLink}>UniParc</Link>.
    </h4>
  );
};

const reasonToFragment: Record<DeletedReason, string> = {
  'Deleted from sequence source (EMBL)': 'deleted_source_embl',
  'Deleted from sequence source (TAIR)': 'deleted_source_tair',
  'Deleted from sequence source (SGD)': 'deleted_source_sgd',
  'Deleted from sequence source (ENSEMBL)': 'deleted_source_ensembl',
  'Deleted from sequence source (PDB)': 'deleted_source_pdb',
  'Deleted from sequence source (RefSeq)': 'deleted_source_refseq',
  'Deleted from Swiss-Prot': 'deleted_swiss-prot',
  'Redundant sequence': 'redundant_sequence',
  'Redundant proteome': 'redundant_proteome',
  'Excluded proteome': 'excluded_proteome',
  'Over-represented sequence': 'over-represented_sequence',
};

type RemovedEntryMessageProps = RemovedEntryHeadingProps & {
  reason?: InactiveEntryReason;
  release?: string;
  children?: ReactNode;
  merged?: boolean;
  sourceDatabase?: string;
};

const RemovedEntryMessage = ({
  reason,
  accession,
  uniparc,
  release,
  merged,
  sourceDatabase,
  children,
}: RemovedEntryMessageProps) => {
  let helpArticleLink = 'deleted_accessions';
  if (reason?.deletedReason) {
    helpArticleLink += `#${reasonToFragment[reason.deletedReason]}`;
  }
  return (
    <>
      <RemovedEntryHeading
        accession={accession}
        uniparc={uniparc}
        merged={merged}
        sourceDatabase={sourceDatabase}
      />
      {children ||
        (reason?.deletedReason && (
          <div>
            Reason:{' '}
            <strong data-article-id={helpArticleLink}>
              {reason.deletedReason.includes('proteome') &&
              !reason.deletedReason.includes('reference')
                ? `Belongs to ${pickArticle(reason.deletedReason)} ${reason.deletedReason.toLocaleLowerCase()}`
                : reason.deletedReason}
            </strong>
          </div>
        ))}
      {release && (
        <div>
          Since release: <strong>{release}</strong>
        </div>
      )}
    </>
  );
};

type DemergedEntryMessageProps = RemovedEntryMessageProps & {
  demergedTo: string[];
};

export const DemergedEntryMessage = ({
  demergedTo,
  ...props
}: DemergedEntryMessageProps) => {
  const { loading, data, progress } = useDataApi<
    SearchResults<UniProtkbAPIModel>
  >(demergedTo.length ? apiUrls.search.accessions(demergedTo) : undefined);

  if (loading) {
    return <Loader progress={progress} />;
  }

  return (
    <RemovedEntryMessage {...props}>
      {demergedTo.length ? (
        <div>
          This entry has now been <strong>demerged</strong>. Its accession has
          been set as secondary accession in the following entries.
        </div>
      ) : null}
      {data?.results.length ? (
        <div className={styles['active-entries-table']}>
          <ActiveEntriesTable entries={data.results} demergedTo={demergedTo} />
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: stringifyQuery({ query: `sec_acc:${props.accession}` }),
            }}
          >
            View these entries in UniProtKB search results
          </Link>
        </div>
      ) : null}
    </RemovedEntryMessage>
  );
};

type MergedEntryMessageProps = RemovedEntryMessageProps & {
  mergedInto: string;
};

export const MergedEntryMessage = ({
  mergedInto,
  ...props
}: MergedEntryMessageProps) => (
  <RemovedEntryMessage {...props} merged>
    <div>
      This entry has now been <strong>merged</strong> into{' '}
      <Link
        to={getEntryPath(
          Namespace.uniprotkb,
          mergedInto,
          UniProtKBTabLocation.Entry
        )}
      >
        {mergedInto}
      </Link>
      .
    </div>
  </RemovedEntryMessage>
);

export default RemovedEntryMessage;
