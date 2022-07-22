import { reAccession } from '../../shared/utils/modifications';

export type IdMaybeWithRange = {
  id: string;
  start?: number;
  end?: number;
};

export const parseIdsFromSearchParams = (
  searchParamIds: string
): IdMaybeWithRange[] =>
  searchParamIds
    .split(',')
    .map((searchParamId): IdMaybeWithRange => {
      const { accession, start, end } =
        searchParamId.match(reAccession)?.groups || {};
      return start && end
        ? {
            id: accession,
            start: +start,
            end: +end,
          }
        : { id: accession };
    })
    .filter((idMaybeWithRange): idMaybeWithRange is IdMaybeWithRange =>
      Boolean(idMaybeWithRange)
    );
