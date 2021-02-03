import { ReactNode } from 'react';
import { UniProtkbAPIModel } from '../adapters/uniProtkbConverter';

export type FacetValue = {
  // if from API, a simple string and always there,
  // but make it an optional React node for the constructed facets
  label?: ReactNode;
  value: string;
  count: number;
};

export type FacetObject = {
  // if from API, a simple string and always there,
  // but make it an optional React node for the constructed facets
  label?: string;
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
