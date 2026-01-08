import { LongNumber } from 'franklin-sites';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import helper from '../../../../../shared/styles/helper.module.scss';
import { type GenomicLocation } from './types';

type GetEnsembLinkArgs = {
  taxID: number;
  start: number;
  end: number;
  chromosome?: string;
};
export const getEnsemblLink = ({
  taxID,
  start,
  end,
  chromosome,
}: GetEnsembLinkArgs) =>
  `https://www.ensembl.org/${taxID}/Location/View?r=${
    chromosome ? `${chromosome}:` : ''
  }${start}-${end}`;

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
  return (
    <ExternalLink
      className={helper['no-wrap']}
      url={
        noLink
          ? null
          : getEnsemblLink({
              taxID,
              start: genomicLocation.reverseStrand
                ? genomicLocation.end
                : genomicLocation.start,
              end: genomicLocation.reverseStrand
                ? genomicLocation.start
                : genomicLocation.end,
              chromosome: genomicLocation.chromosome,
            })
      }
    >
      {content}
    </ExternalLink>
  );
};

export default GenomicLoc;
