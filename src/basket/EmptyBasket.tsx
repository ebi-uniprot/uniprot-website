import { Link } from 'react-router-dom';
import { Message } from 'franklin-sites';

import ErrorPage from '../shared/components/error-pages/ErrorPage';

import { LocationToPath, Location } from '../app/config/urls';

import ArtWork from './svgs/empty-basket.img.svg';

const ErrorMessage = () => (
  <Message
    noIcon
    level="warning"
    heading={<h3 className="">Your saved items will be displayed here</h3>}
    subtitle={
      <>
        Start by adding{' '}
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: 'query=*',
          }}
        >
          UniProtKB
        </Link>
        ,{' '}
        <Link
          to={{
            pathname: LocationToPath[Location.UniRefResults],
            search: 'query=*',
          }}
        >
          UniRef
        </Link>{' '}
        or{' '}
        <Link
          to={{
            pathname: LocationToPath[Location.UniParcResults],
            search: 'query=*',
          }}
        >
          UniParc
        </Link>{' '}
        entries
      </>
    }
  />
);

const EmptyBasket = () => (
  <ErrorPage artwork={<img src={ArtWork} width="295" height="190" alt="" />}>
    <ErrorMessage />
  </ErrorPage>
);

export default EmptyBasket;
