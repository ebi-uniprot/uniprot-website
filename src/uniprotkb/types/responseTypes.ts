import { UniProtkbAPIModel } from '../adapters/uniProtkbConverter';

export type FacetValue = { label: string; value: string; count: number };

export type FacetObject = {
  label: string;
  name: string;
  allowMultipleSelection: boolean;
  values: FacetValue[];
};

type Response = {
  data: {
    results: UniProtkbAPIModel[];
    facets?: FacetObject[];
  };
  headers: {
    ['x-totalrecords']: string;
    link: string;
  };
};

export default Response;
