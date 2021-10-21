import { Fragment } from 'react';
import { Message } from 'franklin-sites';
import { Link } from 'react-router-dom';

import listFormat from '../../utils/listFormat';

import {
  Location,
  LocationToPath,
  getEntryPath,
} from '../../../app/config/urls';
import { Namespace } from '../../types/namespaces';

import { TabLocation } from '../../../uniprotkb/components/entry/Entry';

import './styles/error-pages.scss';

type DeletedEntryMessageProps = {
  accession: string;
  release?: string;
  inHistory?: boolean;
};

export const DeletedEntryMessage = ({
  accession,
  release,
  inHistory,
}: DeletedEntryMessageProps) => (
  <Message level="info">
    <h4>This entry is obsolete{release && ` since release ${release}`}</h4>
    <p data-testid="deleted-entry-message">
      The protein sequence for this entry is available in{' '}
      <Link
        to={{
          pathname: LocationToPath[Location.UniParcResults],
          search: `query=${accession}`,
        }}
      >
        UniParc
      </Link>
      .
      {inHistory || (
        <>
          {' '}
          For previous versions of this entry, please look at its{' '}
          <Link
            to={getEntryPath(
              Namespace.uniprotkb,
              accession,
              TabLocation.History
            )}
          >
            history
          </Link>
          .
        </>
      )}
    </p>
  </Message>
);

type MergedEntryMessageProps = {
  accession: string;
  mergedInto: string;
  release?: string;
};

export const MergedEntryMessage = ({
  accession,
  mergedInto,
  release,
}: MergedEntryMessageProps) => (
  <Message level="info">
    <h4>This entry is obsolete{release && ` since release ${release}`}</h4>
    <p data-testid="demerged-entry-message">
      It has now been merged into{' '}
      <Link
        to={getEntryPath(Namespace.uniprotkb, mergedInto, TabLocation.Entry)}
      >
        {mergedInto}
      </Link>
      .
    </p>
    <p>
      The protein sequence for this entry is available in{' '}
      <Link
        to={{
          pathname: LocationToPath[Location.UniParcResults],
          search: `query=${accession}`,
        }}
      >
        UniParc
      </Link>
      .
    </p>
  </Message>
);

type DemergedEntryMessageProps = {
  accession: string;
  demergedTo?: string[];
  release?: string;
  inHistory?: boolean;
};

export const DemergedEntryMessage = ({
  accession,
  demergedTo,
  release,
  inHistory,
}: DemergedEntryMessageProps) => (
  <Message level="info">
    <h4>This entry is obsolete{release && ` since release ${release}`}</h4>
    {demergedTo?.length && (
      <p data-testid="demerged-entry-message">
        Its accession has been set as secondary accession in{' '}
        {demergedTo.map((newEntry, index) => (
          <Fragment key={newEntry}>
            {listFormat(index, demergedTo)}
            <Link
              to={getEntryPath(
                Namespace.uniprotkb,
                newEntry,
                TabLocation.Entry
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
            search: `query=sec_acc:${accession}`,
          }}
        >
          List of currently active entries
        </Link>
        ]
      </p>
    )}
    <p>
      The protein sequence for this entry is available in{' '}
      <Link
        to={{
          pathname: LocationToPath[Location.UniParcResults],
          search: `query=${accession}`,
        }}
      >
        UniParc
      </Link>
      .
      {inHistory || (
        <>
          {' '}
          For previous versions of this entry, please look at its{' '}
          <Link
            to={getEntryPath(
              Namespace.uniprotkb,
              accession,
              TabLocation.History
            )}
          >
            history
          </Link>
          .
        </>
      )}
    </p>
  </Message>
);
