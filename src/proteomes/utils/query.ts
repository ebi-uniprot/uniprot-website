// Lucene phrase escaping: a literal backslash or double quote inside a
// quoted value must be escaped, otherwise it closes the phrase early and
// the API rejects the query (or silently searches something else).
const escapeQuotedValue = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

/**
 * Build a `proteomecomponent` query fusing a proteome ID with one or more
 * component names, eg `(proteomecomponent:"UP000005640:chromosome")` or,
 * for several names, an OR-joined list of fused clauses.
 */
export const proteomeComponentQuery = (
  id: string,
  names: string | string[]
): string => {
  const nameList = Array.isArray(names) ? names : [names];
  const clauses = nameList
    .map((name) => `proteomecomponent:"${escapeQuotedValue(`${id}:${name}`)}"`)
    .sort()
    .join(' OR ');
  return `(${clauses})`;
};
