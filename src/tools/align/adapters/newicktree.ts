// see parsing ideas here: https://stackoverflow.com/a/38311111 and rest of page

import { NewickTree, NewickTreeNode } from '../types/alignResults';

const assignDistanceFromRoot = (node: NewickTreeNode, isRoot = false) => {
  if (
    !node.children ||
    (typeof node.distanceFromRoot === 'undefined' && !isRoot)
  ) {
    return;
  }
  for (const child of node.children) {
    if (typeof child.distance === 'undefined') {
      continue; // eslint-disable-line no-continue
    }
    // taking absolute value, as to be consistent with other tools out there 🤷🏽‍♂️
    child.distanceFromRoot =
      (node.distanceFromRoot || 0) + Math.abs(child.distance);
    assignDistanceFromRoot(child);
  }
};

const WHITESPACE = /\s+/g;
const TOKENIZER = /([;(),:])/;

const newicktree = (string?: string): NewickTree => {
  const ancestors: NewickTreeNode[] = [];
  let tree: NewickTree = {};
  let subtree;

  if (!string) {
    return tree;
  }

  try {
    // clean and tokenize the input string
    const tokens = string.replace(WHITESPACE, '').split(TOKENIZER);

    let previousToken: string | undefined;
    for (const token of tokens) {
      switch (token) {
        case '':
          // just skip emtpy tokens (should be the first and the last tokens)
          break;
        case '(': // new children list
          subtree = {};
          tree.children = [subtree];
          ancestors.push(tree);
          tree = subtree;
          break;
        case ')': // preceding name (optional)
          tree = ancestors.pop() as NewickTreeNode;
          break;
        case ',': {
          // another branch
          subtree = {};
          const ancestor = ancestors[ancestors.length - 1];
          if (!('children' in ancestor && Array.isArray(ancestor.children))) {
            throw new SyntaxError();
          }
          ancestor.children.push(subtree);
          tree = subtree;
          break;
        }
        case ':': // preceding distance info (optional)
          break;
        case ';': // end of file
          break;
        default:
          switch (previousToken) {
            case '(':
            case ')':
            case ',':
              // name info
              tree.name = token;
              break;
            case ':':
              // distance info
              tree.distance = parseFloat(token);
              if (Number.isNaN(tree.distance)) {
                throw new SyntaxError(
                  `Expected to get a number value but got "${token}"`
                );
              }
              break;
            default:
              // shouldn't happen
              throw new SyntaxError(
                `"${previousToken}" shouldn't be followed by "${token}"`
              );
          }
      }

      previousToken = token;
    }
  } catch (error) {
    throw new SyntaxError(
      (error instanceof Error ? error : null)?.message ||
        'Error while parsing the input in Newick format'
    );
  }

  // mutate the tree recursively to add the distance of each node from the root
  assignDistanceFromRoot(tree, true);

  return tree;
};

export default newicktree;
