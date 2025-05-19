import { Fragment, ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../../../app/config/urls';
import { Namespace } from '../../../../../shared/types/namespaces';
import listFormat from '../../../../../shared/utils/listFormat';
import { stringifyQuery } from '../../../../../shared/utils/url';
import { TabLocation as UniParcTabLocation } from '../../../../../uniparc/types/entry';
import {
  DeletedReason,
  InactiveEntryReason,
} from '../../../../adapters/uniProtkbConverter';
import { TabLocation as UniProtKBTabLocation } from '../../../../types/entry';

type RemovedEntryHeadingProps = {
  accession: string;
  uniparc?: string;
  merged?: boolean;
};

const RemovedEntryHeading = ({
  accession,
  uniparc,
  merged,
}: RemovedEntryHeadingProps) => {
  const uniParcLink =
    // In case of merging, we'll get the data of the new entry, so the
    // UniParc of the new entry, so don't pass that to not get wrong link
    uniparc && !merged
      ? {
          pathname: generatePath(LocationToPath[Location.UniParcEntry], {
            accession: uniparc,
            subPage: UniParcTabLocation.Entry,
          }),
        }
      : {
          pathname: LocationToPath[Location.UniParcResults],
          search: stringifyQuery({ query: accession, direct: true }),
        };
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
};

const RemovedEntryMessage = ({
  reason,
  accession,
  uniparc,
  release,
  merged,
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
      />
      {children ||
        (reason?.deletedReason && (
          <div>
            Reason:{' '}
            <strong data-article-id={helpArticleLink}>
              {reason.deletedReason}
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
}: DemergedEntryMessageProps) => (
  <RemovedEntryMessage {...props}>
    {demergedTo.length ? (
      <div>
        This entry has now been <strong>demerged</strong>. Its accession has
        been set as secondary accession in{' '}
        {demergedTo.map((newEntry, index) => (
          <Fragment key={newEntry}>
            {listFormat(index, demergedTo)}
            <Link
              to={getEntryPath(
                Namespace.uniprotkb,
                newEntry,
                UniProtKBTabLocation.Entry
              )}
            >
              {newEntry}
            </Link>
          </Fragment>
        ))}
        . [
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: stringifyQuery({ query: `sec_acc:${props.accession}` }),
          }}
        >
          List of currently active entries
        </Link>
        ]
      </div>
    ) : null}
  </RemovedEntryMessage>
);

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
