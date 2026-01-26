import { type PublicServerParameters } from '../types/alignServerParameters';

// all the input parameters come from one endpoint, apart from the input
// sequence which comes from an other one, so separate them in the input of this
const inputParamsXMLToObject = (
  xmlString: string,
  sequence: string
): PublicServerParameters => {
  const out: { [key: string]: string } = { sequence };

  if (typeof window === 'undefined') {
    return out as unknown as PublicServerParameters;
  }

  const doc = new window.DOMParser().parseFromString(xmlString, 'text/xml');

  for (const node of doc.querySelector('userParameters')?.children || []) {
    let key;
    let value;
    for (const childNode of node.children) {
      if (!key) {
        key = childNode.textContent;
      } else {
        value = childNode.textContent;
      }
    }
    if (!(key && value)) {
      continue;
    }
    out[key] = value.trim();
  }
  out.sequence = sequence;

  // 'as unknown as' to stop TypeScript from driving me mad 🙄
  return out as unknown as PublicServerParameters;
};

export default inputParamsXMLToObject;
