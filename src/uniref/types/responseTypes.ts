import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';

type Response = {
  data: {
    results: UniRefLiteAPIModel[];
  };
  headers: {
    ['x-totalrecords']: string;
    link: string;
  };
};

export default Response;
