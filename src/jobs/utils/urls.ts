export const reIds = /(?<id>\w+-?\d*)(\[(?<start>\d+)-(?<end>\d+)\])?/;
// Note: also supporting isoform in regex

// Drops a subset range, if any, e.g. "P05067[1-10]" -> "P05067"
export const getIdWithoutRange = (idMaybeWithRange: string) =>
  idMaybeWithRange.match(reIds)?.groups?.id || idMaybeWithRange;

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
