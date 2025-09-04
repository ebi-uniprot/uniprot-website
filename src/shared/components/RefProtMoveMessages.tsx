import { ExternalLink, Message } from 'franklin-sites';
import { FC } from 'react';

import ContactLink from '../../contact/components/ContactLink';
import useDataApi from '../hooks/useDataApi';
import { Namespace } from '../types/namespaces';
import { stringifyUrl } from '../utils/url';

const blogEntryUrl =
  'https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html';

const checkMoveUrl =
  'https://wwwdev.ebi.ac.uk/uniprot/api/refprotmove-check/check-move';

const UniProtKBGenericPreamble = () => (
  <>
    The UniProtKB Unreviewed/TrEMBL database will reduce in size in release
    2026_01 (planned for the first quarter of 2026).
  </>
);

const UniProtKBRemovePreamble = () => (
  <>
    This entry (accession) is under consideration for removal in release 2026_01
    (planned for the first quarter of 2026).
  </>
);

const UniProtKBGenericMain = () => (
  <>
    <br />
    <br />
    From 2026_01 onwards, UniProtKB Unreviewed/TrEMBL will only include
    reference proteomes and selected entries with experimental or biologically
    important data. Entries removed from UniProtKB will remain accessible in
    UniParc. Please see{' '}
    <ExternalLink url={blogEntryUrl}>this short article</ExternalLink> for more
    information, or <ContactLink>contact us</ContactLink> with any questions.
  </>
);

const UniProtKBGenericMessage = () => (
  <>
    <UniProtKBGenericPreamble />
    <UniProtKBGenericMain />
  </>
);

const ProteomesMessage = () => (
  <>
    ⚠️We are updating the reference proteomes selection procedure. As a result,
    the UniProtKB Unreviewed/TrEMBL database will become smaller in release
    2026_01 (planned for the first quarter of 2026) and will only include
    reference proteomes and selected entries with experimental or biologically
    important data.
    <br />
    <br />
    Entries removed from UniProtKB will remain accessible in UniParc. Please see{' '}
    <ExternalLink url={blogEntryUrl}>this short article</ExternalLink> for more
    information, or <ContactLink>contact us</ContactLink> with any questions.
  </>
);

export const RefProtMoveResultsMessage: FC<{
  namespace: Namespace;
}> = ({ namespace }) => {
  if (namespace !== Namespace.uniprotkb && namespace !== Namespace.proteomes) {
    return null;
  }

  return (
    <Message
      level="warning"
      className="uniprot-grid-cell--span-12"
      style={{ marginBottom: '-0.75rem', marginTop: '0.5rem' }}
    >
      {(namespace === Namespace.uniprotkb && <UniProtKBGenericMessage />) ||
        (namespace === Namespace.proteomes && <ProteomesMessage />)}
    </Message>
  );
};

type CheckMoveResponse = {
  move?: string[];
  stay?: string[];
  unknown?: string[];
};

export const RefProtMoveUniProtKBEntryMessage: FC<{
  upids?: string[];
}> = ({ upids }) => {
  const { data, loading } = useDataApi<CheckMoveResponse>(
    stringifyUrl(checkMoveUrl, { upids })
  );
  const isEntryUnderReview = !!data?.move?.length;
  return (
    <Message
      level="warning"
      className="uniprot-grid-cell--span-12"
      style={{ marginBottom: '1rem', marginTop: '1rem' }}
    >
      {!loading &&
        (isEntryUnderReview ? (
          <UniProtKBRemovePreamble />
        ) : (
          <UniProtKBGenericPreamble />
        ))}
      <UniProtKBGenericMain />
    </Message>
  );
};
