import { LongNumber } from 'franklin-sites';

import ExternalLink from '../../../../../shared/components/ExternalLink';

import { GenomicLocation } from './types';

export const getEnsemblLink = (
  taxID: number,
  chromosome?: string,
  start?: number,
  end?: number
) =>
  `https://www.ensembl.org/${taxID}/Location/View?r=${chromosome}:${start}-${end}`;

type GenomicLocProps = {
  genomicLocation: GenomicLocation;
  taxID: number;
};

const GenomicLoc = ({ genomicLocation, taxID }: GenomicLocProps) => (
  <ExternalLink
    url={getEnsemblLink(
      taxID,
      genomicLocation.chromosome,
      genomicLocation.reverseStrand
        ? genomicLocation.end
        : genomicLocation.start,
      genomicLocation.reverseStrand
        ? genomicLocation.start
        : genomicLocation.end
    )}
  >
    {genomicLocation.chromosome}:
    <LongNumber>
      {(genomicLocation.reverseStrand
        ? genomicLocation.end
        : genomicLocation.start) ?? ''}
    </LongNumber>
    -
    <LongNumber>
      {(genomicLocation.reverseStrand
        ? genomicLocation.start
        : genomicLocation.end) ?? ''}
    </LongNumber>
  </ExternalLink>
);

export default GenomicLoc;
