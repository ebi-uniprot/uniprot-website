import { Message } from 'franklin-sites';
import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath, Location, LocationToPath } from '../../app/config/urls';
import styles from '../../shared/components/results/styles/did-you-mean.module.scss';
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
import { TabLocation as UniProtKBTabLocation } from '../../uniprotkb/types/entry';

type Props = {
  sequence?: string;
  name?: string;
  sequenceDescription?: string;
  asMessage?: boolean;
};

const N_IDS_SHOWN = 5;

const clean = (string: string): string => string.trim().toUpperCase();

const ChecksumSuggester = memo(
  ({
    sequence,
    name,
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
    // Expect exactly one result otherwise don't show anything
    if (data?.results?.length !== 1) {
      return null;
    }
    const { uniProtKBAccessions, uniParcId } = data.results[0];

    // If the sequence header name includes any of the retrieved
    // uniprotkb or uniparc ids then don't show anything to the user
    // as it's assumed they know what they're doing
    if (
      name &&
      [uniParcId, ...(uniProtKBAccessions || [])].some((id) =>
        name.includes(id)
      )
    ) {
      return null;
    }

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

    const onlyUniParc =
      !activeCanonicalUniprotkb.length && !activeIsoformsUniprotkb.length;

    const content = (
      <>
        Are you looking for {onlyUniParc ? 'this entry ' : 'these entries '}
        which exactly {onlyUniParc ? 'matches' : 'match'} {sequenceDescription}?
        <div>
          <ul className={styles['suggestions-list']}>
            {activeCanonicalUniprotkb.length ? (
              <li>
                <div data-article-id="uniprotkb">UniProtKB</div>
                {`${activeCanonicalUniprotkb.length} ${pluralise('entry', activeCanonicalUniprotkb.length, 'entries')}: `}
                {activeCanonicalUniprotkb
                  ?.slice(0, N_IDS_SHOWN)
                  .map((accession, i, array) => (
                    <Fragment key={accession}>
                      <Link
                        to={getEntryPath(
                          Namespace.uniprotkb,
                          accession,
                          UniProtKBTabLocation.Entry
                        )}
                      >
                        {accession}
                      </Link>
                      {i < array.length - 1 && ', '}
                    </Fragment>
                  ))}
                {(activeCanonicalUniprotkb.length > N_IDS_SHOWN && '…') ||
                  (activeCanonicalUniprotkb.length > 1 && ' –')}
                {activeCanonicalUniprotkb.length > 1 && (
                  <Link
                    to={stringifyUrl(
                      LocationToPath[Location.UniProtKBResults],
                      {
                        query: `(uniparc:${uniParcId})`,
                      }
                    )}
                  >
                    {' view all'}
                  </Link>
                )}
              </li>
            ) : null}
            {activeIsoformsUniprotkb.length ? (
              <li>
                <div data-article-id="alternative_products">
                  UniProtKB{' '}
                  {pluralise('isoform', activeIsoformsUniprotkb.length)}
                </div>
                {`${activeIsoformsUniprotkb.length} ${pluralise('isoform', activeIsoformsUniprotkb.length)}: `}
                {activeIsoformsUniprotkb
                  ?.slice(0, N_IDS_SHOWN)
                  .map((accession, i, array) => (
                    <Fragment key={accession}>
                      <Link
                        to={getEntryPath(
                          Namespace.uniprotkb,
                          accession,
                          UniProtKBTabLocation.Entry
                        )}
                      >
                        {accession}
                      </Link>
                      {i < array.length - 1 && ', '}
                    </Fragment>
                  ))}
                {(activeIsoformsUniprotkb.length > N_IDS_SHOWN && '…') ||
                  (activeIsoformsUniprotkb.length > 1 && ' –')}
                {activeIsoformsUniprotkb.length > 1 && (
                  <Link
                    to={stringifyUrl(
                      getEntryPath(
                        Namespace.uniparc,
                        uniParcId,
                        UniParcTabLocation.Entry
                      ),
                      {
                        facets: 'dbTypes:UniProtKB/Swiss-Prot protein isoforms',
                      }
                    )}
                  >
                    {' view all'}
                  </Link>
                )}
              </li>
            ) : null}
            <li>
              <div data-article-id="uniparc">UniParc</div>
              {'1 entry: '}
              <Link
                to={getEntryPath(
                  Namespace.uniparc,
                  uniParcId,
                  UniParcTabLocation.Entry
                )}
              >
                {uniParcId}
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
    return asMessage ? <Message level="info">{content}</Message> : content;
  },
  (a, b) =>
    (a.sequence && clean(a.sequence)) === (b.sequence && clean(b.sequence))
);

export default ChecksumSuggester;
