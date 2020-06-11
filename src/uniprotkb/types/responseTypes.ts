export type FacetValue = { label: string; value: string; count: number };

export type Facet = {
  label: string;
  name: string;
  allowMultipleSelection: boolean;
  values: FacetValue[];
};

type Response = {
  data: {
    results: [];
    facets: Facet[];
  };
  headers: {
    ['x-totalrecords']: string;
    link: string;
  };
};

export default Response;
