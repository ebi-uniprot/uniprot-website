import databaseInfoMaps from './__mocks__/databaseInfoMaps';
import databaseInfo from './__mocks__/databaseInfo';

describe('getDatabaseInfoMaps', () => {
  it('should match snapshot', () => {
    //
    const databaseInfoMapsJSON = Object.fromEntries(
      Object.entries(databaseInfoMaps).map(([k, v]) =>
        v instanceof Map ? [k, Object.fromEntries(v)] : [k, v]
      )
    );
    expect(databaseInfoMapsJSON).toMatchSnapshot();
  });

  it('should generate databaseToDatabaseInfo with keys equal to the name attribute', () => {
    const databaseNames = databaseInfo
      .map((databaseInfoPoint) => databaseInfoPoint.name)
      .sort();
    const keys = Object.keys(databaseInfoMaps.databaseToDatabaseInfo).sort();
    expect(keys).toEqual(databaseNames);
  });
});
