import cn from 'classnames';
import { EllipsisReveal } from 'franklin-sites';

import { UniProtkbUIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';

import style from '../../../shared/styles/helper.module.scss';

export type PeptideSearchMatch = {
  matchSequence: string;
  position: number;
};

export const matchColumnConfig = {
  label: 'Match',
  render: ({ peptideSearchMatches }: UniProtkbUIModel) => {
    if (!peptideSearchMatches?.length) {
      return null;
    }
    const nVisible = 10;
    return (
      <ul className={cn('no-bullet', style['no-wrap'])}>
        {peptideSearchMatches.map(({ matchSequence, position }) => (
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
  },
};
