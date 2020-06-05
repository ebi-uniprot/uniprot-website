import { openDB, IDBPDatabase } from 'idb';

import { Stores } from './stores';

export const DB_NAME = 'UniProt-Jobs';

export default class JobStore {
  storeName: string;

  dbPromise: Promise<IDBPDatabase>;

  constructor(storeName: Stores) {
    this.storeName = storeName;
    this.dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(storeName);
      },
    });
  }

  async get(key: IDBValidKey) {
    return (await this.dbPromise).get(this.storeName, key);
  }

  async getAll() {
    return (await this.dbPromise).getAll(this.storeName);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  async set(key: IDBValidKey, value: any) {
    return (await this.dbPromise).put(this.storeName, value, key);
  }

  async del(key: IDBValidKey) {
    return (await this.dbPromise).delete(this.storeName, key);
  }

  async clear() {
    return (await this.dbPromise).clear(this.storeName);
  }

  async keys() {
    return (await this.dbPromise).getAllKeys(this.storeName);
  }
}
