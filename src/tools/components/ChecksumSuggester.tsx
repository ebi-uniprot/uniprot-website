import { memo } from 'react';
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

type SequenceAndName = {
  sequence?: string;
  name?: string;
};

type Props = {
  sequenceAndName?: SequenceAndName | null;
};
const ChecksumSuggester = memo(
  ({ sequenceAndName }: Props) => {
    const { sequence, name } = sequenceAndName || {};
    const checksum = sequence && md5(sequence);
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
    if (data?.results.length !== 1) {
      return null;
    }
    const { uniProtKBAccessions, uniParcId } = data.results[0];

    // If the sequence header name includes any of the retrieved
    // uniprotkb or uniparc ids then don't show anything to the user
    // as it's assumed they know what they're doing
    if (
      name &&
      [uniParcId, ...uniProtKBAccessions].some((id) => name.includes(id))
    ) {
      return null;
    }

    const activeUniprotkbCount = uniProtKBAccessions.filter(
      (accession) => !(accession.includes('-') || accession.includes('.'))
    ).length;
    return (
      <Message level="info">
        This exact sequence has been found:
        <ul className={styles['suggestions-list']}>
          <li>
            UniProtKB:{' '}
            <Link
              to={stringifyUrl(LocationToPath[Location.UniProtKBResults], {
                query: `(uniparc:${uniParcId})`,
              })}
            >
              {activeUniprotkbCount}{' '}
              {pluralise('entry', activeUniprotkbCount, 'entries')}
            </Link>
          </li>
          <li>
            UniParc:{' '}
            <Link to={getEntryPath(Namespace.uniparc, uniParcId)}>1 entry</Link>
          </li>
        </ul>
      </Message>
    );
  },
  (a, b) =>
    a.sequenceAndName?.sequence?.trim() === b.sequenceAndName?.sequence?.trim()
);

export default ChecksumSuggester;
