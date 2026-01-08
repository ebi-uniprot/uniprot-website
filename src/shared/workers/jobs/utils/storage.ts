import { type IDBPDatabase, openDB } from 'idb';

import { type Stores } from './stores';

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

  async get<T>(key: IDBValidKey): Promise<T> {
    return (await this.dbPromise).get(this.storeName, key);
  }

  async getAll<T>(): Promise<T[]> {
    return (await this.dbPromise).getAll(this.storeName);
  }

  async set<T>(key: IDBValidKey, value: T) {
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
