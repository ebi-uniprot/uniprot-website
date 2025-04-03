// structuredClone not in JSDom (as of Aug 2024)
import 'core-js/stable/structured-clone';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'fake-indexeddb/auto';

export { IDBPDatabase, openDB } from 'idb';
