import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
import { Message } from 'franklin-sites';

import useDataApi from '../../shared/hooks/useDataApi';

import md5 from '../../shared/utils/md5';
import { getEntryPath, Location, LocationToPath } from '../../app/config/urls';
import { pluralise } from '../../shared/utils/utils';
import { stringifyUrl } from '../../shared/utils/url';

import apiUrls from '../../shared/config/apiUrls/apiUrls';

import { Namespace } from '../../shared/types/namespaces';
import { UniParcColumn } from '../../uniparc/config/UniParcColumnConfiguration';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { SearchResults } from '../../shared/types/results';

import styles from '../../shared/components/results/styles/did-you-mean.module.scss';

type Props = {
  sequence?: string;
  name?: string;
};

const ChecksumSuggester = memo(
  ({ sequence, name }: Props) => {
    const checksum = sequence && md5(sequence.toUpperCase());
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

    const activeCanonicalUniprotkb = uniProtKBAccessions?.filter(
      (accession) => !(accession.includes('-') || accession.includes('.'))
    );
    const N_IDS_SHOWN = 5;
    return (
      <Message level="info">
        Are you looking for these entries which exactly match your sequence?
        <ul className={styles['suggestions-list']}>
          {activeCanonicalUniprotkb?.length && (
            <li key="uniprotkb">
              <div data-article-id="uniprotkb">UniProtKB</div>
              {`${activeCanonicalUniprotkb.length} ${pluralise('entry', activeCanonicalUniprotkb.length, 'entries')}: `}
              {activeCanonicalUniprotkb
                ?.slice(0, N_IDS_SHOWN)
                .map((accession, i, array) => (
                  <Fragment key={accession}>
                    <Link to={getEntryPath(Namespace.uniprotkb, accession)}>
                      {accession}
                    </Link>
                    {i < array.length - 1 && ', '}
                  </Fragment>
                ))}
              {(activeCanonicalUniprotkb.length > N_IDS_SHOWN && '…') ||
                (activeCanonicalUniprotkb.length > 1 && '-')}
              {activeCanonicalUniprotkb.length > 1 && (
                <Link
                  key="view all"
                  to={stringifyUrl(LocationToPath[Location.UniProtKBResults], {
                    query: `(uniparc:${uniParcId})`,
                  })}
                >
                  {' view all'}
                </Link>
              )}
            </li>
          )}
          <li key="uniparc">
            <div data-article-id="uniparc">UniParc</div>
            {'1 entry: '}
            <Link to={getEntryPath(Namespace.uniparc, uniParcId)}>
              {uniParcId}
            </Link>
          </li>
        </ul>
      </Message>
    );
  },
  (a, b) => a.sequence?.trim() === b.sequence?.trim()
);

export default ChecksumSuggester;
