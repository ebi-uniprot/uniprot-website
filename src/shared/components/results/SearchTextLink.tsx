import { Link } from 'react-router-dom';

type SearchTextLinkProps = {
  query: string;
  text: string;
};

export const SearchTextLink = ({ query, text }: SearchTextLinkProps) => (
  <Link
    // eslint-disable-next-line uniprot-website/use-config-location
    to={{ search: `query=${query}` }}
  >
    {text}
  </Link>
);
