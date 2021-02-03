import { FC, Fragment } from 'react';
import { Message } from 'franklin-sites';
import { Link, generatePath } from 'react-router-dom';

import listFormat from '../../utils/listFormat';

import { Location, LocationToPath } from '../../../app/config/urls';

import {
  InactiveEntryReason,
  InactiveReasonType,
} from '../../../uniprotkb/adapters/uniProtkbConverter';

import ArtWork from './svgs/obsolete-entry.svg';

import './styles/error-pages.scss';

const DeletedEntryMessage: FC<{ accession: string }> = ({ accession }) => (
  <Message level="info">
    <h4>This entry is obsolete</h4>
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
      . For previous versions of this entry, please look at its{' '}
      <Link
        to={{
          pathname: generatePath(LocationToPath[Location.UniProtKBEntry], {
            accession,
          }),
          search: 'version=*',
        }}
      >
        history
      </Link>
      .
    </p>
  </Message>
);

const DemergedEntryMessage: FC<{
  accession: string;
  demergedTo?: string[];
}> = ({ accession, demergedTo }) => (
  <Message level="info">
    <h4>This entry is obsolete</h4>
    {demergedTo?.length && (
      <p data-testid="demerged-entry-message">
        It can now be found as secondary accession in{' '}
        {demergedTo.map((newEntry, index) => (
          <Fragment key={newEntry}>
            {listFormat(index, demergedTo)}
            <Link
              to={generatePath(LocationToPath[Location.UniProtKBEntry], {
                accession: newEntry,
              })}
            >
              {newEntry}
            </Link>
          </Fragment>
        ))}
        . [
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: `query=replaces:${accession}`,
          }}
        >
          List
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
      . For previous versions of this entry, please look at its{' '}
      <Link
        to={{
          pathname: generatePath(LocationToPath[Location.UniProtKBEntry], {
            accession,
          }),
          // TODO: actually implement this in the website
          search: `version=*`,
        }}
      >
        history
      </Link>
      .
    </p>
  </Message>
);

type ObsoleteEntryPageProps = {
  accession: string;
  details: InactiveEntryReason;
};

const ObsoleteEntryPage: FC<ObsoleteEntryPageProps> = ({
  accession,
  details,
}) => (
  <div className="error-page-container">
    <ArtWork className="error-page-container__art-work" />
    {details.inactiveReasonType === InactiveReasonType.DELETED ? (
      <DeletedEntryMessage accession={accession} />
    ) : (
      <DemergedEntryMessage
        accession={accession}
        demergedTo={details.mergeDemergeTo}
      />
    )}
  </div>
);

export default ObsoleteEntryPage;
