import { Message } from 'franklin-sites';
import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath, Location, LocationToPath } from '../../app/config/urls';
import apiUrls from '../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../shared/hooks/useDataApi';
import { Namespace } from '../../shared/types/namespaces';
import { SearchResults } from '../../shared/types/results';
import md5 from '../../shared/utils/md5';
import { stringifyUrl } from '../../shared/utils/url';
import { pluralise } from '../../shared/utils/utils';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { UniParcColumn } from '../../uniparc/config/UniParcColumnConfiguration';
import { TabLocation as UniParcTabLocation } from '../../uniparc/types/entry';
import SuggestionEntriesTable from './SuggestionEntriesTable';

type Props = {
  sequence?: string;
  name?: string;
  onMatch?: () => void;
  onUserDismiss?: () => void;
  sequenceDescription?: string;
  asMessage?: boolean;
};

const clean = (string: string): string => string.trim().toUpperCase();

const ChecksumSuggester = memo(
  ({
    sequence,
    name,
    onMatch,
    onUserDismiss,
    sequenceDescription = 'your sequence',
    asMessage = true,
  }: Props) => {
    const checksum = sequence && md5(clean(sequence));
    const options = checksum && {
      namespace: Namespace.uniparc,
      query: `checksum:${checksum}`,
      columns: [UniParcColumn.accession],
      size: 1,
      facets: null,
    };
    const url = options && apiUrls.search.search(options);
    const { data } = useDataApi<SearchResults<UniParcAPIModel>>(url);
    const didMatchRef = useRef(false);

    const { uniProtKBAccessions, uniParcId } = data?.results?.[0] || {};

    const activeCanonicalUniprotkb =
      uniProtKBAccessions?.filter(
        (accession) =>
          // Not an isoform
          !accession.includes('-') &&
          // Not inactive
          !accession.includes('.')
      ) || [];

    const activeIsoformsUniprotkb =
      uniProtKBAccessions?.filter(
        (accession) =>
          // Is an isoform
          accession.includes('-') &&
          // Not inactive
          !accession.includes('.') &&
          // Non-dashed version not already in the list of canonical accessions
          !activeCanonicalUniprotkb.some(
            (canonical) => accession.split('-')[0] === canonical
          )
      ) || [];

    const inactiveEntries =
      uniProtKBAccessions
        ?.filter(
          (accession) =>
            // is inactive
            accession.includes('.') &&
            // Latest version not already in the list of canonical accessions
            !activeCanonicalUniprotkb.some(
              (canonical) => accession.split('.')[0] === canonical
            )
        )
        .map((accession) => accession.split('.')?.[0]) || [];

    const onlyUniParc =
      !activeCanonicalUniprotkb.length &&
      !activeIsoformsUniprotkb.length &&
      inactiveEntries.length;

    // Reset when context changes
    useEffect(() => {
      didMatchRef.current = false;
    }, [checksum, uniParcId, onMatch]);

    useEffect(() => {
      if (!onlyUniParc && !didMatchRef.current && onMatch) {
        onMatch();
        didMatchRef.current = true;
      }
    }, [onlyUniParc, onMatch]);

    // Expect exactly one result otherwise don't show anything
    if (data?.results?.length !== 1) {
      return null;
    }

    // If the sequence header name includes any of the retrieved
    // uniprotkb or uniparc ids then don't show anything to the user
    // as it's assumed they know what they're doing
    if (
      name &&
      uniParcId &&
      [uniParcId, ...(uniProtKBAccessions || [])].some((id) =>
        name.includes(id)
      )
    ) {
      return null;
    }

    const content = (
      <>
        Are you looking for {onlyUniParc ? 'this entry ' : 'these entries '}
        which exactly {onlyUniParc ? 'matches' : 'match'} {sequenceDescription}?
        <div>
          <SuggestionEntriesTable
            activeEntries={[
              ...activeCanonicalUniprotkb,
              ...activeIsoformsUniprotkb,
            ]}
            inactiveEntries={inactiveEntries}
          />
          <small>
            <ul className="no-bullet">
              {activeCanonicalUniprotkb.length ? (
                <li>
                  <Link
                    to={stringifyUrl(
                      LocationToPath[Location.UniProtKBResults],
                      {
                        query: `(uniparc:${uniParcId})`,
                      }
                    )}
                  >
                    View the active{' '}
                    {pluralise(
                      'entry',
                      activeCanonicalUniprotkb.length,
                      'entries'
                    )}{' '}
                    in UniProtKB
                  </Link>
                </li>
              ) : null}
              {activeIsoformsUniprotkb.length &&
              !activeIsoformsUniprotkb.some((isoform) =>
                inactiveEntries.includes(isoform.split('-')[0])
              ) ? (
                <li>
                  <Link
                    to={stringifyUrl(
                      getEntryPath(
                        Namespace.uniparc,
                        uniParcId as string,
                        UniParcTabLocation.Entry
                      ),
                      {
                        facets: 'dbTypes:UniProtKB/Swiss-Prot protein isoforms',
                      }
                    )}
                  >
                    View the{' '}
                    {pluralise('isoform', activeIsoformsUniprotkb.length)} in
                    UniProtKB
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  to={getEntryPath(
                    Namespace.uniparc,
                    uniParcId as string,
                    UniParcTabLocation.Entry
                  )}
                >
                  View the matching entry in UniParc
                </Link>
              </li>
            </ul>
          </small>
          {onMatch && !onlyUniParc && (
            <div>
              <input
                type="checkbox"
                id="on-match"
                name="on-match"
                onClick={onUserDismiss}
                required
              />
              <label htmlFor="on-match">
                None of the entries are of interest to me
                <span aria-hidden="true">*</span>
              </label>
            </div>
          )}
        </div>
      </>
    );
    return asMessage ? <Message level="info">{content}</Message> : content;
  },
  (a, b) =>
    (a.sequence && clean(a.sequence)) === (b.sequence && clean(b.sequence))
);

export default ChecksumSuggester;
