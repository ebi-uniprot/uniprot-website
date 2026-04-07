import type { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';

export type UniParcPrecomputedModel = Omit<
  UniProtkbAPIModel,
  'uniProtkbId' | 'entryType' | 'proteinExistence'
> & {
  entryType: 'AA';
  uniProtkbId: null;
};
