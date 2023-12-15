import { LongNumber } from 'franklin-sites';

import ExternalLink from '../../../../../shared/components/ExternalLink';

import { GenomicLocation } from './types';

import helper from '../../../../../shared/styles/helper.module.scss';

export const getEnsemblLink = (
  taxID: number,
  start: number,
  end?: number,
  chromosome?: string
) =>
  `https://www.ensembl.org/${taxID}/Location/View?r=${
    chromosome && `${chromosome}:`
  }${start}${end && `-${end}`}`;

type GenomicLocProps = {
  genomicLocation: GenomicLocation;
  taxID: number;
  noLink?: boolean;
};

const GenomicLoc = ({ genomicLocation, taxID, noLink }: GenomicLocProps) => {
  const content = (
    <>
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
    </>
  );
  if (noLink) {
    return <span className={helper['no-wrap']}>{content}</span>;
  }
  return (
    <ExternalLink
      className={helper['no-wrap']}
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
      {content}
    </ExternalLink>
  );
};

export default GenomicLoc;
