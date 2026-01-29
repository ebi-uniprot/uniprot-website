import type { UniProtkbAPIModel } from '../adapters/uniProtkbConverter';
import { type Evidence } from '../types/modelTypes';

type AnyRecord = Record<string, unknown>;

const isRecord = (node: unknown): node is AnyRecord =>
  typeof node === 'object' && node !== null;

const isEvidenceNode = (node: unknown): node is { evidences: unknown[] } =>
  isRecord(node) && Array.isArray(node.evidences);

const pruneNode = (node: unknown): unknown => {
  if (node == null) {
    return null;
  }

  if (Array.isArray(node)) {
    const items = node.map(pruneNode).filter((item) => item !== null);
    return items.length > 0 ? items : null;
  }

  if (!isRecord(node)) {
    return null;
  }

  if (isEvidenceNode(node)) {
    return node;
  }

  const result: AnyRecord = {};
  for (const [k, v] of Object.entries(node)) {
    const pruned = pruneNode(v);
    if (pruned !== null) {
      result[k] = pruned;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
};

export const includeOnlyItemsWithEvidences = (
  entry: UniProtkbAPIModel
): Partial<UniProtkbAPIModel> | null => {
  const pruned = pruneNode(entry);
  return pruned ? (pruned as Partial<UniProtkbAPIModel>) : null;
};

export const hasProtNLM2Evidence = (evidences?: Evidence[]) =>
  !!evidences?.some((evidence) => evidence.id === 'ProtNLM2');
