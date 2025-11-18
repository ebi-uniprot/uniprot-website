import { Link } from 'react-router-dom';

import { SearchResultsLocations } from '../../../app/config/urls';
import { Namespace, SearchableNamespace } from '../../types/namespaces';
import { stringifyUrl } from '../../utils/url';

type SearchLinkProps = {
  query: string;
  children: React.ReactNode;
  namespace?: Namespace;
};

export const SearchLink = ({
  query,
  children,
  namespace = Namespace.uniprotkb,
}: SearchLinkProps) => (
  <Link
    to={stringifyUrl(SearchResultsLocations[namespace as SearchableNamespace], {
      query,
    })}
  >
    {children}
  </Link>
);
