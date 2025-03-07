import { Link } from 'react-router-dom';

type SearchTextLinkProps = {
  query: string;
  text: string;
};

export const SearchTextLink = ({ query, text }: SearchTextLinkProps) => (
  <Link to={{ search: `query=${query}` }}>{text}</Link>
);
