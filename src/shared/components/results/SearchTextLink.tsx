import { Link } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import { stringifyUrl } from '../../utils/url';

type SearchTextLinkProps = {
  query: string;
  text: string;
};

export const SearchTextLink = ({ query, text }: SearchTextLinkProps) => (
  <Link to={stringifyUrl(LocationToPath[Location.UniProtKBResults], { query })}>
    {text}
  </Link>
);
