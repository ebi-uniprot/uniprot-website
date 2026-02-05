import { type Evidence } from '../types/modelTypes';

export const hasProtNLM2Evidence = (evidences?: Evidence[]) =>
  !!evidences?.some((evidence) => evidence.id === 'ProtNLM2');
