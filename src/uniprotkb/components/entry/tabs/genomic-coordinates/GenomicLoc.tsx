import { LongNumber } from 'franklin-sites';

import ExternalLink from '../../../../../shared/components/ExternalLink';

import { GenomicLocation } from './types';

import styles from './styles/genomic-loc.module.css';

export const getEnsemblLink = (
  taxID: number,
  start: number,
  end: number,
  chromosome?: string
) =>
  `https://www.ensembl.org/${taxID}/Location/View?r=${
    chromosome && `${chromosome}:`
  }${start}-${end}`;

type GenomicLocProps = {
  genomicLocation: GenomicLocation;
  taxID: number;
};

const GenomicLoc = ({ genomicLocation, taxID }: GenomicLocProps) => (
  <ExternalLink
    className={styles['genomic-loc']}
    url={getEnsemblLink(
      taxID,
      genomicLocation.reverseStrand
        ? genomicLocation.end
        : genomicLocation.start,
      genomicLocation.reverseStrand
        ? genomicLocation.start
        : genomicLocation.end,
      genomicLocation.chromosome
    )}
  >
    {genomicLocation.chromosome && `${genomicLocation.chromosome}:`}
    <LongNumber>
      {(genomicLocation.reverseStrand
        ? genomicLocation.end
        : genomicLocation.start) ?? ''}
    </LongNumber>
    {' - '}
    <LongNumber>
      {(genomicLocation.reverseStrand
        ? genomicLocation.start
        : genomicLocation.end) ?? ''}
    </LongNumber>
  </ExternalLink>
);

export default GenomicLoc;
