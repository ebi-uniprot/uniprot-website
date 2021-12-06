const reIds = /(?<id>\w+)(\[(?<start>\d+)-(?<end>\d+)\])?/;

type IdMaybeWithRange = {
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
