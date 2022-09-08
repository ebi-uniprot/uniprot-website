import cn from 'classnames';
import { EllipsisReveal } from 'franklin-sites';

import style from '../../../shared/styles/helper.module.scss';

export type PeptideSearchMatch = {
  matchSequence: string;
  start: number;
  end: number;
};

export const PeptideSearchMatches = ({
  matches,
}: {
  matches?: PeptideSearchMatch[];
}) => {
  if (!matches?.length) {
    return null;
  }
  const nVisible = 10;
  return (
    <ul className={cn('no-bullet', style['no-wrap'])}>
      {matches.map(({ matchSequence, start, end }) => (
        <li key={matchSequence}>
          {`Positions ${start + 1}-${end + 1}: `}
          {matchSequence.length < nVisible ? (
            matchSequence
          ) : (
            <>
              {matchSequence.slice(0, nVisible)}
              <EllipsisReveal contextKey="peptide_search_match">
                {matchSequence.slice(nVisible)}
              </EllipsisReveal>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
