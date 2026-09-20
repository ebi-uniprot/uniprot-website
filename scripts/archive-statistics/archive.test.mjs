/* eslint-disable import/no-extraneous-dependencies */

/**
 * Checks against the archives actually sitting in `archive/`. Run with:
 *   node --test scripts/archive-statistics/archive.test.mjs
 *
 * Unlike verify.test.mjs and index.test.mjs — which are offline, deterministic
 * and depend on nothing outside the repo — this file deliberately touches the
 * world: it asks the live API which release is current, and it reads a
 * gitignored directory. That is why `test:scripts-unit` is not part of
 * `pnpm test`: nobody working on the app should have to care.
 *
 * What it answers: has the current release been archived yet, and does every
 * archive on disk still verify against its own embedded data?
 *
 * Needs network. If the API is unreachable this FAILS rather than skipping —
 * "I could not check" must not look the same as "I checked and it is fine".
 */

import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { JSDOM } from 'jsdom';

import { archiveFileName, DEFAULT_API, resolveRelease } from './index.mjs';
import { getEmbeddedData, verifyDocument } from './verify.mjs';

const ARCHIVE_DIR = fileURLToPath(new URL('../../archive/', import.meta.url));

/** Archives on disk, matched on the filename pattern rather than any one release. */
const archivesOnDisk = () =>
  existsSync(ARCHIVE_DIR)
    ? readdirSync(ARCHIVE_DIR)
        .filter((name) => /^uniprotkb-statistics-.+\.html$/.test(name))
        .sort()
    : [];

/**
 * The release the live site is serving. An unreachable API is a FAILURE, not a
 * skip: a check that quietly vanishes when the network does still reports
 * green, which is the silent-skip pattern this suite exists to stamp out. The
 * error is wrapped because a bare "fetch failed" says nothing about what was
 * being asked or of whom.
 */
const currentRelease = async () => {
  try {
    // resolveRelease already throws if the x-uniprot-release header is absent,
    // so a value coming back from here is always a real release number.
    const { headerRelease } = await resolveRelease(DEFAULT_API, 'current');
    return headerRelease;
  } catch (error) {
    throw new Error(
      `Could not reach ${DEFAULT_API} to ask which release is current: ${error.message}`,
      { cause: error }
    );
  }
};

test('the current release has been archived', async () => {
  const release = await currentRelease();
  const expected = archiveFileName(release);
  const present = archivesOnDisk();
  assert.ok(
    present.includes(expected),
    present.length
      ? `Release ${release} is current but archive/ only has ${present.join(', ')}.\n` +
          `Run: pnpm archive:statistics`
      : `Release ${release} is current but archive/ is empty.\n` +
          `Run: pnpm archive:statistics`
  );
});

test('every archive on disk verifies against its embedded data', async (t) => {
  const present = archivesOnDisk();
  if (!present.length) {
    t.skip('no archive/uniprotkb-statistics-*.html on disk');
    return;
  }
  for (const name of present) {
    // A subtest per archive so a failure names the file it came from.
    // eslint-disable-next-line no-await-in-loop
    await t.test(name, () => {
      const html = readFileSync(join(ARCHIVE_DIR, name), 'utf8');
      // One parse, reused: an archive with its fonts and images inlined runs to
      // tens of MB, and verifyArchive() would parse the same string again.
      const { document } = new JSDOM(html).window;
      const result = verifyDocument(document, getEmbeddedData(document));
      assert.equal(
        result.ok,
        true,
        result.mismatches.map((m) => `${m.name}: ${m.detail}`).join('\n')
      );
    });
  }
});
