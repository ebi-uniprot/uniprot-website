import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';
import { FacetObject } from '../../uniprotkb/types/responseTypes';

type Response = {
  data: {
    results: UniRefLiteAPIModel[];
    facets?: FacetObject[];
  };
  headers: {
    ['x-total-records']: string;
    link: string;
  };
};

export default Response;
