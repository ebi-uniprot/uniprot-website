# Writing custom eslint rules

## Documentation and help:

- [Working with rules](https://eslint.org/docs/developer-guide/working-with-rules) official documentation on how to write rules.
- [The ESTree Spec](https://github.com/estree/estree) contains all the core ESTree AST types, grouped by versions of ECMAScript
- [AST Explorer](https://astexplorer.net/) to visualise and manipulate the AST of pasted source code, make sure to:
  - turn on the `ESLint v4` option in the `Transform` menu
  - switch the parser to `@typescript-eslint/parser` to match the one used in this project
  - open the devtools to access the currently selected node as the variable `$node`

## Debugging:

- Make sure to use eslint without caching on
- npm/yarn will have copied the content of the eslint rule at the moment of installing, make sure to link it to not have stale code
