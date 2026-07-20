import unifireModelData from '../../__mocks__/unifireModelData';
import uniParcLightEntryModelData from '../../__mocks__/uniParcLightEntryModelData';
import uniparcXrefsModelData from '../../__mocks__/uniparcXrefsModelData';
import { type UniParcXRef } from '../uniParcConverter';
import uniParcSubEntryConverter, {
  type UniFireModel,
} from '../uniParcSubEntryConverter';

const subEntryXref = uniparcXrefsModelData.results[0] as UniParcXRef;

// The UniFire mock is plain JSON, so JSON round-trip is a sufficient deep clone.
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

describe('uniParcSubEntryConverter', () => {
  it('does not mutate the UniFire input', () => {
    const uniFireInput: UniFireModel = clone(unifireModelData);
    const before = clone(uniFireInput);

    uniParcSubEntryConverter(
      uniParcLightEntryModelData,
      subEntryXref,
      undefined,
      uniFireInput
    );

    // The input is untouched — the converter builds a new UniFireModel rather
    // than reassigning `.predictions` on the caller's object.
    expect(uniFireInput).toEqual(before);
    expect(typeof uniFireInput.predictions[0].evidence[0]).toBe('string');
  });

  it('converts string evidence into Evidence objects on the returned model', () => {
    const result = uniParcSubEntryConverter(
      uniParcLightEntryModelData,
      subEntryXref,
      undefined,
      clone(unifireModelData)
    );

    const evidence = result?.unifire?.predictions[0].evidence[0];
    expect(evidence).toMatchObject({ evidenceCode: 'ECO:0000256' });
  });
});
