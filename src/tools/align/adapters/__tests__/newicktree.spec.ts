import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import newicktree from '../newicktree';

import { NewickTreeNode } from '../../types/alignResults';

const readFile = promisify(fs.readFile);

function* traverseTree(tree: NewickTreeNode): Generator<NewickTreeNode> {
  for (const child of tree.children || []) {
    // and recursively do the same for all the children
    yield* traverseTree(child);
  }
  yield tree; // yields itself as a node
}

describe('newicktree', () => {
  let file1: string;
  let file2: string;
  let file3: string;

  beforeAll(async () => {
    file1 = await readFile(
      path.join(__dirname, '..', '__mocks__', 'phylotree1.txt'),
      'utf8'
    );
    file2 = await readFile(
      path.join(__dirname, '..', '__mocks__', 'phylotree2.txt'),
      'utf8'
    );
    file3 = await readFile(
      path.join(__dirname, '..', '__mocks__', 'phylotree3.txt'),
      'utf8'
    );
  });

  it('should parse without error', () => {
    expect(() => newicktree(file1)).not.toThrow();
    expect(() => newicktree(file2)).not.toThrow();
    expect(() => newicktree(file3)).not.toThrow();
  });

  it('should have the correct number of nodes', () => {
    const nodes1 = Array.from(traverseTree(newicktree(file1)));
    expect(nodes1.length).toBe(4); // all nodes
    // named nodes (should be one per sequence)
    expect(nodes1.filter((node) => node.name).length).toBe(3);

    const nodes2 = Array.from(traverseTree(newicktree(file2)));
    expect(nodes2.length).toBe(26);
    expect(nodes2.filter((node) => node.name).length).toBe(14);

    const nodes3 = Array.from(traverseTree(newicktree(file3)));
    expect(nodes3.length).toBe(32);
    expect(nodes3.filter((node) => node.name).length).toBe(17);
  });

  it('should match snapshot', () => {
    const nodes1 = Array.from(traverseTree(newicktree(file1)));
    expect(nodes1).toMatchSnapshot();

    const nodes2 = Array.from(traverseTree(newicktree(file2)));
    expect(nodes2).toMatchSnapshot();

    const nodes3 = Array.from(traverseTree(newicktree(file3)));
    expect(nodes3).toMatchSnapshot();
  });
});
