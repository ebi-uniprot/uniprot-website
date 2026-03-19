import { Link } from 'react-router-dom';

import { getEntryPath } from '../../app/config/urls';
import { Namespace } from '../../shared/types/namespaces';
import { type CommonTaxon } from '../adapters/uniParcConverter';

const UPPER = /^[A-Z]/;
const isUpper = (s: string) => UPPER.test(s);

const commonTaxonFilter = (a: CommonTaxon, b: CommonTaxon) => {
  // Pull topLevel taxons starting with uppercase first
  // e.g. 'Virus' before 'cellular organisms'
  if (isUpper(a.topLevel) !== isUpper(b.topLevel)) {
    return isUpper(a.topLevel) ? -1 : 1;
  }

  // Then, pull commonTaxons starting with uppercase first
  // e.g. 'Plasmid F' before 'marine sediment metagenome'
  if (isUpper(a.commonTaxon) !== isUpper(b.commonTaxon)) {
    return isUpper(a.commonTaxon) ? -1 : 1;
  }

  // Otherwise, conserve original ordering
  return 0;
};

export const CommonTaxons = ({
  commonTaxons,
}: {
  commonTaxons: CommonTaxon[];
}) => (
  <ul className="no-bullet">
    {Array.from(commonTaxons)
      .sort(commonTaxonFilter)
      .map((taxon) => (
        <li key={taxon.commonTaxonId}>
          <Link to={getEntryPath(Namespace.taxonomy, taxon.commonTaxonId)}>
            {taxon.commonTaxon}
          </Link>{' '}
          ({taxon.topLevel})
        </li>
      ))}
  </ul>
);
