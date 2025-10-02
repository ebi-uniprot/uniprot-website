import joinUrl from 'url-join';

import { Namespace } from '../../types/namespaces';
import { stringifyUrl } from '../../utils/url';
import { apiPrefix } from './apiPrefix';

export const unifire = (uniparcId: string, taxId: string) =>
  stringifyUrl(
    joinUrl(apiPrefix, Namespace.uniprotkb, Namespace.unifire, 'run'),
    {
      id: uniparcId,
      taxId,
    }
  );

export default { unifire };
