import { DatabaseInfoMaps } from '../../utils/database';
import databaseCategoryToNames from './databaseCategoryToNames';
import databaseNameToCategory from './databaseNameToCategory';
import databaseToDatabaseInfo from './databaseToDatabaseInfo';
import entrySectionToDatabaseCategoryOrder from './entrySectionToDatabaseCategoryOrder';
import entrySectionToDatabaseNames from './entrySectionToDatabaseNames';
import implicitDatabaseXRefs from './implicitDatabaseXrefs';

/**
 * This is generated, based on data from '/configure/uniprotkb/allDatabases'
 */

const databaseInfoMaps: DatabaseInfoMaps = {
  databaseCategoryToNames,
  databaseNameToCategory,
  databaseToDatabaseInfo,
  implicitDatabaseXRefs,
  entrySectionToDatabaseNames,
  entrySectionToDatabaseCategoryOrder,
};

export default databaseInfoMaps;
