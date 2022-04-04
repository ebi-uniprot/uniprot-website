import { memo } from 'react';
import { Link } from 'react-router-dom';
import { sequenceProcessor } from 'franklin-sites';

import { LocationToPath, Location } from '../../../app/config/urls';

const PeptideSearch = memo(({ searchTerm }: { searchTerm: string }) => {
  const potentialPeptide = searchTerm.toUpperCase();
  const [processed] = sequenceProcessor(potentialPeptide);

  if (!potentialPeptide || !processed.valid || processed.likelyType !== 'aa') {
    return null;
  }

  return (
    <>
      <Link
        to={{
          pathname: LocationToPath[Location.PeptideSearch],
          search: `peps=${potentialPeptide}`,
        }}
      >
        {potentialPeptide}
      </Link>{' '}
      as a peptide search
    </>
  );
});

export default PeptideSearch;
