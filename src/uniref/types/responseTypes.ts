import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';
import { FacetObject } from '../../uniprotkb/types/responseTypes';

type Response = {
  data: {
    results: UniRefLiteAPIModel[];
    facets?: FacetObject[];
  };
  headers: {
    ['x-totalrecords']: string;
    link: string;
  };
};

export default Response;
