import { Link } from 'react-router-dom';

import { SearchResultsLocations } from '../../../app/config/urls';
import { Namespace, SearchableNamespace } from '../../types/namespaces';
import { stringifyUrl } from '../../utils/url';

type SearchTextLinkProps = {
  query: string;
  text: string | React.ReactNode;
  namespace?: Namespace;
};

export const SearchTextLink = ({
  query,
  text,
  namespace = Namespace.uniprotkb,
}: SearchTextLinkProps) => (
  <Link
    to={stringifyUrl(SearchResultsLocations[namespace as SearchableNamespace], {
      query,
    })}
  >
    {text}
  </Link>
);
