import { Fragment, ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';

import listFormat from '../../../utils/listFormat';
import { stringifyQuery } from '../../../utils/url';

import {
  Location,
  LocationToPath,
  getEntryPath,
} from '../../../../app/config/urls';
import { Namespace } from '../../../types/namespaces';
import { TabLocation as UniProtKBTabLocation } from '../../../../uniprotkb/types/entry';
import { TabLocation as UniParcTabLocation } from '../../../../uniparc/components/entry/Entry';
import { InactiveEntryReason } from '../../../../uniprotkb/adapters/uniProtkbConverter';

type RemovedEntryMessageProps = {
  accession: string;
  uniparc?: string;
};

const RemovedEntryMessage = ({
  accession,
  uniparc,
}: RemovedEntryMessageProps) => {
  const uniParcLink = uniparc
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
    <h4>
      This entry is no longer annotated in UniProtKB and can be found in{' '}
      <Link to={uniParcLink}>UniParc</Link>.
    </h4>
  );
};

type RemovedEntryPageProps = RemovedEntryMessageProps & {
  reason?: InactiveEntryReason;
  release?: string;
  children?: ReactNode;
};

const RemovedEntryPage = ({
  reason,
  accession,
  uniparc,
  release,
  children,
}: RemovedEntryPageProps) => {
  let helpArticleLink = 'deleted_accessions';
  if (reason?.deletedReason) {
    helpArticleLink += `#${reason.deletedReason
      .toLowerCase()
      .replace(/ \(.+\)$/, '')
      .replaceAll(' ', '_')}`;
  }

  return (
    <>
      <RemovedEntryMessage accession={accession} uniparc={uniparc} />
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

type DemergedEntryMessageProps = RemovedEntryPageProps & {
  demergedTo: string[];
};

export const DemergedEntryMessage = ({
  demergedTo,
  ...props
}: DemergedEntryMessageProps) => (
  <RemovedEntryPage {...props}>
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
  </RemovedEntryPage>
);

type MergedEntryMessageProps = RemovedEntryPageProps & {
  mergedInto: string;
};

export const MergedEntryMessage = ({
  mergedInto,
  ...props
}: MergedEntryMessageProps) => (
  <RemovedEntryPage {...props}>
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
  </RemovedEntryPage>
);

export default RemovedEntryPage;
