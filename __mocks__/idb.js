/* eslint-disable import/no-import-module-exports, import/no-extraneous-dependencies */
// structuredClone not in JSDom (as of Aug 2024)
import 'core-js/stable/structured-clone';
import 'fake-indexeddb/auto';

export { openDB, IDBPDatabase } from 'idb';
