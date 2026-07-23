// Shared rendering for community submissions whose contributor has asked
// not to share their details. UniProt still knows who the submitter is —
// they have just opted out of having their identity displayed publicly.

import Toggletip from '../../shared/components/Toggletip';

// The literal source ID returned by the API for community submissions where
// the contributor has opted not to share their identity.
const ANONYMOUS_SOURCE_ID = 'Anonymous';

const WITHHELD_BY_REQUEST_LABEL = 'Withheld by request';
const WITHHELD_BY_REQUEST_TOOLTIP =
  'The contributor authenticated with ORCID but has chosen not to display their identity publicly.';

export const isWithheldSubmitter = (sourceId?: string) =>
  sourceId === ANONYMOUS_SOURCE_ID;

const WithheldByRequest = () => (
  <Toggletip content={WITHHELD_BY_REQUEST_TOOLTIP}>
    {WITHHELD_BY_REQUEST_LABEL}
  </Toggletip>
);

export default WithheldByRequest;
