import { type ProteinNamesData } from '../../adapters/namesAndTaxonomyConverter';

const mock: ProteinNamesData = {
  recommendedName: {
    fullName: { value: 'My protein' },
    shortNames: [{ value: 'some shorter names' }],
  },
  alternativeNames: [
    { fullName: { value: 'alt1' } },
    { fullName: { value: 'alt2' } },
  ],
};

export default mock;
