import { type Evidence } from '../types/modelTypes';
import { protNLM2Id } from '../types/protNLMAPIModel';

export const hasProtNLM2Evidence = (evidences?: Evidence[]) =>
  !!evidences?.some((evidence) => evidence.id === protNLM2Id);
