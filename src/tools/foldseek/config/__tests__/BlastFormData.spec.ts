import { Namespace } from '../../../../shared/types/namespaces';
import { databaseToNamespace } from '../FoldseekFormData';

describe('BlastFormData test', () => {
  it('Should identify the correct namespace', () => {
    expect(databaseToNamespace('uniprotkb_archaea')).toBe(Namespace.uniprotkb);
    expect(databaseToNamespace('uniref50')).toBe(Namespace.uniref);
    expect(databaseToNamespace('uniparc')).toBe(Namespace.uniparc);
  });
});
