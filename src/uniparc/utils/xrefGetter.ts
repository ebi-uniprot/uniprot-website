import { uniqBy, identity } from 'lodash-es';

import { UniParcAPIModel, UniParcXRef } from '../adapters/uniParcConverter';

const xrefGetter = <T extends keyof UniParcXRef>(
  data: UniParcAPIModel,
  propertyName: T,
  uniqueBy?: keyof Exclude<UniParcXRef[T], undefined>
): Array<Exclude<UniParcXRef[T], undefined>> | undefined =>
  uniqBy(
    data.uniParcCrossReferences
      ?.map((xref) => xref[propertyName])
      // remove properties that were not the ones we were interested in
      .filter((x): x is Exclude<UniParcXRef[T], undefined> => x !== undefined),
    uniqueBy || identity
  );

export default xrefGetter;
