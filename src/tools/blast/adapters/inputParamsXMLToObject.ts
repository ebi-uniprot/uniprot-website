import { PublicServerParameters } from '../types/blastServerParameters';

// all the input parameters come from one endpoint, apart from the input
// sequence which comes from an other one, so separate them in the input of this
const inputParamsXMLToObject = (
  xmlString: string,
  sequence: string
): PublicServerParameters => {
  const doc = new window.DOMParser().parseFromString(xmlString, 'text/xml');
  const out: { [key: string]: string } = {};

  for (const node of doc.firstElementChild?.children || []) {
    let key;
    let value;
    for (const childNode of node.children) {
      switch (childNode.tagName) {
        case 'name':
          key = childNode.textContent;
          break;
        case 'value':
          value = childNode.textContent;
          break;
        default:
        // skip
      }
    }
    if (!(key && value)) {
      continue; // eslint-disable-line no-continue
    }
    out[key] = value.trim();
  }
  out.sequence = sequence;

  // 'as unknown as' to stop TypeScript from driving me mad 🙄
  return out as unknown as PublicServerParameters;
};

export default inputParamsXMLToObject;
