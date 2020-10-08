import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';
import { Facet } from '../../uniprotkb/types/responseTypes';

type Response = {
  data: {
    results: UniRefLiteAPIModel[];
    facets?: Facet[];
  };
  headers: {
    ['x-totalrecords']: string;
    link: string;
  };
};

export default Response;
