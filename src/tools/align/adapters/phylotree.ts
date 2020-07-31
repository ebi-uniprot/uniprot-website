// see parsing ideas here: https://stackoverflow.com/a/38311111 and rest of page

import { PhyloTree } from '../types/alignResults';

const phylotree = (string: string): PhyloTree => {
  console.log(string);

  return { name: '', children: [] };
};

export default phylotree;
