import cn from 'classnames';
import { EllipsisReveal } from 'franklin-sites';

import style from '../../../shared/styles/helper.module.scss';

export type PeptideSearchMatch = {
  matchSequence: string;
  position: number;
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
      {matches.map(({ matchSequence, position }) => (
        <li key={matchSequence}>
          {`Positions ${position}-${position + matchSequence.length - 1}: `}
          {matchSequence.length < nVisible ? (
            matchSequence
          ) : (
            <>
              {matchSequence.slice(0, nVisible)}
              <EllipsisReveal>{matchSequence.slice(nVisible)}</EllipsisReveal>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
