import React, { FC } from 'react';
import { Message } from 'franklin-sites';
import { Link } from 'react-router-dom';
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
      <Link to={`/uniparc/?query=${accession}`}>UniParc</Link>. For previous
      versions of this entry, please look at its{' '}
      <Link to={`/uniprot/${accession}?version=*`}>history</Link>.
    </p>
  </Message>
);

const DemergedEntryMessage: FC<{
  accession: string;
  demergedTo: string[];
}> = ({ accession, demergedTo }) => (
  <Message level="info">
    <h4>This entry is obsolete</h4>
    <p data-testid="demerged-entry-message">
      It can now be found as secondary accession in{' '}
      {demergedTo.reduce((a: (string | JSX.Element)[], c, i) => {
        if (i > 0) {
          if (i === demergedTo.length - 1) {
            a.push(' and ');
          } else {
            a.push(', ');
          }
        }

        a.push(
          <Link to={`/uniprotkb/${c}`} key={c}>
            {c}
          </Link>
        );

        return a;
      }, [])}
      . [ <Link to={`/uniprot/?query=replaces:${accession}`}>List</Link> ]
    </p>
    <p>
      The protein sequence for this entry is available in{' '}
      <Link to={`/uniparc/?query=${accession}`}>UniParc</Link>. For previous
      versions of this entry, please look at its{' '}
      <Link to={`/uniprot/${accession}?version=*`}>history</Link>.
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
