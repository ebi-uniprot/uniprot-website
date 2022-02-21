import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';

export enum PeptideSearchColumn {
  match = 'match',
}

export type PeptideSearchMatches = {
  peptideSearchMatches: {
    matchSequence: string;
    position: number;
  }[];
};

export type PeptideSearchModel = UniProtkbAPIModel & PeptideSearchMatches;

export const matchColumnConfig = {
  label: 'Match',
  render: (row: Partial<PeptideSearchModel>) => {
    const { peptideSearchMatches } = row as PeptideSearchMatches;
    return (
      <ul className="no-bullet">
        {peptideSearchMatches.map(({ matchSequence, position }) => (
          <li>{`Match to ${matchSequence} at ${position}`}</li>
        ))}
      </ul>
    );
  },
};
