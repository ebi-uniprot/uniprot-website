/**
 * @jest-environment node
 */
import { openDB } from 'idb';

import JobStore, { DB_NAME } from '../storage';
import { Stores } from '../stores';

describe('JobStore', () => {
  const storeName = Stores.METADATA;
  const jobStore = new JobStore(storeName);
  const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });

  beforeEach(async () => {
    (await dbPromise).clear(storeName);
    await (await dbPromise).put(storeName, 1, 'a');
    await (await dbPromise).put(storeName, { key: 'value' }, 'b');
  });

  afterAll(async () => {
    (await dbPromise).clear(storeName);
  });

  it('should set value for key', async () => {
    const key = 'some key';
    const value = { foo: 'bar', baz: 12345 };
    await jobStore.set(key, value);
    expect(await (await dbPromise).get(storeName, key)).toEqual(value);
  });

  it('should get value for key', async () => {
    expect(await (await dbPromise).get(storeName, 'a')).toEqual(1);
  });

  it('should get all', async () => {
    expect(await (await dbPromise).getAll(storeName)).toEqual([
      1,
      { key: 'value' },
    ]);
  });

  it('should delete key and corresponding value', async () => {
    await jobStore.del('a');
    expect(await (await dbPromise).get(storeName, 'a')).toBeUndefined();
  });

  it('should return all keys', async () => {
    expect(await jobStore.keys()).toEqual(
      await (await dbPromise).getAllKeys(storeName)
    );
  });

  it('should clear the store', async () => {
    await jobStore.clear();
    expect(await (await dbPromise).getAllKeys(storeName)).toEqual([]);
  });
});
