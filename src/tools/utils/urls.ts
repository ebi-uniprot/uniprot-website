export const reIds = /(?<id>\w+-?\d*)(\[(?<start>\d+)-(?<end>\d+)\])?/;
// Note: also supporting isoform in regex

export type IdMaybeWithRange = {
  id: string;
  start?: number;
  end?: number;
};

export const parseIdsFromSearchParams = (
  searchParamIds: string[]
): IdMaybeWithRange[] =>
  searchParamIds
    .map((searchParamId): IdMaybeWithRange => {
      const { id, start, end } = searchParamId.match(reIds)?.groups || {};
      return start && end
        ? {
            id,
            start: +start,
            end: +end,
          }
        : { id };
    })
    .filter((idMaybeWithRange): idMaybeWithRange is IdMaybeWithRange =>
      Boolean(idMaybeWithRange)
    );
