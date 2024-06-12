#!/usr/bin/env node

/* eslint-disable no-console, import/no-extraneous-dependencies */
import fs from 'node:fs/promises';
import { parseArgs } from 'node:util';

import { Glob } from 'glob';
import recast from 'recast';
import parser from '@babel/parser';
import prettier from 'prettier';
import chalk from 'chalk';

/* Configs and options */

const argsConfig = {
  options: {
    glob: {
      type: 'string',
      short: 'g',
      default: '**/__mocks__/**/*.ts',
    },
    dev: {
      type: 'boolean',
      short: 'd',
      default: false,
    },
    dry: {
      type: 'boolean',
      default: false,
    },
  },
};

const recastOptions = {
  parser: {
    parse(source) {
      return parser.parse(source, {
        sourceType: 'module',
        plugins: ['typescript'],
      });
    },
  },
};

const fetchOptions = {
  headers: { Accept: 'application/json' },
};

const prettierConfig = await prettier.resolveConfig(import.meta.dirname);

const objectKeyRE = /^[$_a-zA-Z][$_a-zA-Z0-9]*$/;

/* Helper functions */

// Handle if object key needs to be wrapped in quotes
const identifierOrLiteral = (key) =>
  recast.types.builders[objectKeyRE.test(key) ? 'identifier' : 'literal'](key);

// From a JavaScript value, transform it to an AST representation
const createValueExpression = (value) => {
  // Handle case where value is an array
  if (Array.isArray(value)) {
    return recast.types.builders.arrayExpression(
      value.map((item) => createValueExpression(item))
    );
  }

  // Handle case where property is an object
  if (typeof value === 'object' && value !== null) {
    return recast.types.builders.objectExpression(
      Object.entries(value).map(([propKey, propValue]) =>
        recast.types.builders.objectProperty(
          identifierOrLiteral(propKey),
          createValueExpression(propValue)
        )
      )
    );
  }

  // Handle rest where property is a literal (e.g. string, number, boolean)
  return recast.types.builders.literal(value);
};

// Handler to be passed when visiting the AST
const astPathHandler = (path, context, baseAPI, tasks) => {
  const dateComment = path.value.leadingComments?.find((comment) =>
    comment.value.includes('Retrieved:')
  );
  const sourceComment = path.value.leadingComments?.find((comment) =>
    comment.value.includes('Source:')
  );

  if (dateComment && sourceComment) {
    const declaration =
      // In case of variable declaration
      path.value.declarations?.[0] ||
      // In case of named export (variable declaration within named export)
      path.value.declaration.declarations[0];

    if (declaration.init.typeAnnotation) {
      throw new Error(
        'Do not cast the mock where it is defined, if you do have to cast it do it when exporting it'
      );
    }

    // Will mutate the AST asynchronously, cannot wait to continue traversing
    tasks.push(
      // Async IIFE, returns a promise because async
      (async () => {
        const sourceURL = sourceComment.value.replace(/^ Source: /, '');
        const parsedURL = new URL(
          sourceURL,
          sourceURL.startsWith('http') ? undefined : baseAPI
        );

        console.log(
          '   - replacing content of variable',
          chalk.bgBlueBright(declaration.id.name),
          'with content from URL'
        );
        console.log('    ', chalk.bgBlueBright(parsedURL));

        const response = await fetch(parsedURL, fetchOptions);
        if (!response.ok) {
          throw new Error(`Issue when downloading mock data from ${parsedURL}`);
        }

        const payload = await response.json();

        // eslint-disable-next-line no-param-reassign
        declaration.init = createValueExpression(payload);

        // Update the date in the comment to keep track of when last updated
        dateComment.value = dateComment.value.replace(
          /\d{4}-\d{2}-\d{2}/,
          new Date().toISOString().split('T')[0]
        );
      })()
    );
  }

  context.traverse(path);
};

const processFile = async (file, baseAPI, dry) => {
  const content = await fs.readFile(file, 'utf8');

  const ast = recast.parse(content, recastOptions);

  const tasks = [];

  recast.visit(ast, {
    visitExportNamedDeclaration(path) {
      astPathHandler(path, this, baseAPI, tasks);
    },
    visitVariableDeclaration(path) {
      astPathHandler(path, this, baseAPI, tasks);
    },
  });

  await Promise.all(tasks);

  let output = recast.print(ast).code;
  // replace some ugly whitespaces between properties within objects
  output = output.replaceAll(/,\n\s*\n/gm, ',\n');
  // more formatting
  output = prettier.format(output, {
    ...prettierConfig,
    parser: 'typescript',
  });

  if (!dry) {
    console.log(`writing to ${file}`);
    await fs.writeFile(file, output);
  }

  if (!tasks.length) {
    console.log(
      '  ',
      chalk.whiteBright.bgYellow.italic('No mocks to update have been detected')
    );

    // Sanity check:
    // If no mock variable detected but a corresponding Source or Retrieved
    // comment is there, throw an error
    if (/(Source|Retrieved):/.test(content)) {
      throw new Error('Found a possible undetected mock to update');
    }
  }

  return tasks.length;
};

/* Main */

const main = async () => {
  const {
    values: { glob, dev, dry },
  } = parseArgs(argsConfig);
  console.log(chalk.bgGreen.bold('Will process mocks, with these parameters:'));
  console.log(' - glob for files to process:', chalk.green(glob));
  const baseAPI = dev
    ? 'https://wwwdev.ebi.ac.uk/uniprot/api/'
    : 'https://rest.uniprot.org/';
  console.log(' - base UniProt website API:', chalk.green(baseAPI));

  if (dry) {
    console.log(
      ' -',
      chalk.bgYellow.italic.bold('dry run, no files will be written')
    );
  }

  console.log(chalk.bgGreen.bold('Processing...'));
  const globObject = new Glob(glob, {});
  let files = 0;
  let variables = 0;
  for await (const file of globObject) {
    console.log(' - processing mock file:', chalk.bgBlue(file));
    variables += await processFile(file, baseAPI, dry);
    files++; // eslint-disable-line no-plusplus
  }

  console.log(
    chalk.bgGreen(
      `Finished updating ${variables} mock variables across ${files} processed files`
    )
  );
};

try {
  await main();
} catch (error) {
  console.error(chalk.red.bold(error));
  process.exit(1);
}
