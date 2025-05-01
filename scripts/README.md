# Scripts Directory

This directory contains utility scripts that automate various development and operational tasks for the project. Each script is designed to perform specific functions and can be run independently.

## `update-mocks`

The `update-mocks` script automates the process of updating TypeScript mock data files based on JSON payloads fetched from specified URLs. It parses files to find specific comments that indicate a source URL and updates the associated mock data variables with fresh data retrieved from these URLs.

The script reads TypeScript files, locates variables associated with a "Source:" and "Retrieved:" comment, fetches the corresponding JSON data from the source URL, and updates the variable's value with the new data. It also updates the "Retrieved:" comment with the current date to track when the mock was last updated.

If URLs do not have an origin, the script will assumed that they need to use the UniProt website API and the corresponding base will be prepended. For URLs that are not on the website API, the URLs should be complete with scheme and origin.

### Recognised patterns

Here are some examples of patterns recognised by this script:

```ts
// Source: <URL>
// Retrieved: <date>
const mock = { field: 'data' };

export mock;
```

```ts
// Source: <URL>
// Retrieved: <date>
export const myMock = [{ field: 'data' }, { field: 'content' }];
```

```ts
// Source: <URL>
// Retrieved: <date>
export const serverData: MockType = { key: { complex: 'value' } };
```

```ts
// Source: <URL>
// Retrieved: <date>
export default { content: 'ATCG' };
```

Note that if there are multiple mocks within the same file, it will update all of them.

### Caveats

This script will not allow to have a type casting directly on the mock (using `as`):

```ts
// Source: <URL>
// Retrieved: <date>
export const mock = { field: 'data' } as MockType; // will not work!
```

If a typecasting is needed, it should be somewhere else:

```ts
// Source: <URL>
// Retrieved: <date>
const mock = {field: 'data'} as any;

export default mock as any;
```

### Usage

The script should be called through `package.json` script, for example using `yarn run update-mocks`. It supports several command-line options to customize its behavior:

#### CLI Options

- **`--glob` (`-g`)**: This option allows you to specify a glob pattern to select the TypeScript files to process. The default is `'**/__mocks__/**/*.ts'`, which targets TypeScript files in any `__mocks__` directories. Make sure to quote the pattern to prevent glob expansion at the command line.
  
- **`--dev` (`-d`)**: When set, the script uses the development base URL for fetching the data (`https://wwwdev.ebi.ac.uk/uniprot/api/`) instead of the default which is the production base URL (`https://rest.uniprot.org/`).
  
- **`--dry`**: Enables a dry run, where the script will not write any changes to the files.
