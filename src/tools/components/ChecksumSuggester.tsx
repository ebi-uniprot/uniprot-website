import { Link } from 'react-router-dom';
import { Message } from 'franklin-sites';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';

import useDataApi from '../../shared/hooks/useDataApi';

import md5 from '../../shared/utils/md5';
import { getEntryPath } from '../../app/config/urls';

import apiUrls from '../../shared/config/apiUrls/apiUrls';

import { Namespace } from '../../shared/types/namespaces';
import { UniParcColumn } from '../../uniparc/config/UniParcColumnConfiguration';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { SearchResults } from '../../shared/types/results';

type Props = {
  parsedSequence?: SequenceObject;
};
const ChecksumSuggester = ({ parsedSequence }: Props) => {
  const checksum = parsedSequence && md5(parsedSequence.sequence);
  const options = checksum && {
    namespace: Namespace.uniparc,
    query: `checksum:${checksum}`,
    columns: [UniParcColumn.accession, UniParcColumn.commonTaxons],
    size: 1,
  };
  const url = options && apiUrls.search.search(options);
  const { data } = useDataApi<SearchResults<UniParcAPIModel>>(url);
  // Exactly one result or else we silently walk backwards out of the room without making a peep
  if (data?.results.length !== 1) {
    return null;
  }
  const result = data.results[0];
  return (
    <Message level="info">
      This exact sequence is available at UniParc:{' '}
      <Link to={getEntryPath(Namespace.uniparc, result.uniParcId)}>
        {result.uniParcId}
      </Link>
    </Message>
  );
};

export default ChecksumSuggester;
