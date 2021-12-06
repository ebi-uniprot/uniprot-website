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
    .map((searchParamId) => {
      const groups = searchParamId.match(reIds)?.groups;
      if (!groups) {
        return null;
      }
      const { id, start, end } = groups;
      return start && end
        ? {
            id,
            start: +start,
            end: +end,
          }
        : { id };
    })
    .filter(Boolean) as IdMaybeWithRange[];
