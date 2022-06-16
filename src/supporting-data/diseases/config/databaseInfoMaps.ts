export type DiseasesDatabaseInfoPoint = {
  name: string;
  displayName: string;
  uriLink: string;
};

export type DiseasesDatabaseToDatabaseInfo = {
  [database: string]: DiseasesDatabaseInfoPoint;
};

const allDatabases: DiseasesDatabaseInfoPoint[] = [
  {
    name: 'MedGen',
    displayName: 'MedGen',
    uriLink: 'https://www.ncbi.nlm.nih.gov/medgen/%id',
  },
  {
    name: 'MeSH',
    displayName: 'MeSH',
    uriLink: 'https://meshb.nlm.nih.gov/record/ui?ui=%id',
  },
  {
    name: 'MIM',
    displayName: 'MIM',
    uriLink: 'https://www.omim.org/entry/%id',
  },
];

const databaseToDatabaseInfo: DiseasesDatabaseToDatabaseInfo =
  Object.fromEntries(allDatabases.map((db) => [db.name, db]));

export default databaseToDatabaseInfo;
