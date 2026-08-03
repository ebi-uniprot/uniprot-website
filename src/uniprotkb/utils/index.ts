import { type UniProtkbAPIModel } from '../adapters/uniProtkbConverter';
import { type Property, type PropertyKey } from '../types/modelTypes';

export const getListOfIsoformAccessions = (data?: UniProtkbAPIModel) => {
  // will push all isoform accessions in this variable
  const out: string[] = [];
  if (!(data && 'comments' in data && data.comments)) {
    return out;
  }
  for (const comment of data.comments) {
    // filter out all the non-"Alternative Products" comments
    if (comment.commentType !== 'ALTERNATIVE PRODUCTS') {
      continue;
    }
    for (const isoform of comment.isoforms) {
      for (const isoformId of isoform.isoformIds) {
        if (isoformId) {
          out.push(isoformId);
        }
      }
    }
  }
  return out;
};

export const transfromProperties = (properties: Property[]) => {
  const o: { [key: string]: string } = {};
  properties.forEach(({ key, value }) => {
    if (key && value) {
      o[key] = value;
    }
  });
  return o;
};

export const stringToID = (str: string) => str.replace(/\s/g, '_');

// This function is useful because our API returns arrays of objects of shape: { key: x, value: y}
export const getPropertyValue = (
  properties: Property[],
  propertyKey: PropertyKey
) => {
  const found = properties.find(({ key }) => key === propertyKey);
  return found ? found.value : null;
};

type Sortable = { start: number | string; end?: number | string };
export const sortByLocation = (a: Sortable, b: Sortable) => {
  const aStart = +a.start;
  const bStart = +b.start;
  if (aStart !== bStart) {
    return aStart - bStart;
  }
  // Coerce the ends only on the rare start-tie path. Computing them eagerly
  // wastes an O(n log n) string→number coercion per comparison when sorting
  // large variant sets, even though `end` is only the tie-breaker.
  const aEnd = a.end ? +a.end : -Infinity;
  const bEnd = b.end ? +b.end : -Infinity;
  return aEnd - bEnd;
};
