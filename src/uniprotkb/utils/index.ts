import UniProtKBEntryConfig from '../config/UniProtEntryConfig';

import {
  UniProtkbUIModel,
  UniProtkbAPIModel,
} from '../adapters/uniProtkbConverter';
import { Property, PropertyKey } from '../types/modelTypes';

export const hasExternalLinks = (transformedData: UniProtkbUIModel) =>
  UniProtKBEntryConfig.some(({ id }) => {
    const data = transformedData[id];
    return Boolean('xrefData' in data && data.xrefData?.length);
  });

export const getListOfIsoformAccessions = (data?: UniProtkbAPIModel) => {
  // will push all isoform accessions in this variable
  const out: string[] = [];
  if (!(data && 'comments' in data && data.comments)) {
    return out;
  }
  for (const comment of data.comments) {
    // filter out all the non-"Alternative Products" comments
    if (comment.commentType !== 'ALTERNATIVE PRODUCTS') {
      continue; // eslint-disable-line no-continue
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

type Sortable = { start: number | string; end: number | string };
export const sortByLocation = (a: Sortable, b: Sortable) => {
  const aStart = +a.start;
  const aEnd = a.end ? +a.end : -Infinity;
  const bStart = +b.start;
  const bEnd = b.end ? +b.end : -Infinity;
  if (aStart === bStart) {
    return aEnd - bEnd;
  }
  return aStart - bStart;
};
