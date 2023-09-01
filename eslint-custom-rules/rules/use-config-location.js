// as local name might be different than exported name, this helper finds it.
const getLocalNameFor = (importDeclaration, namedExport = '*', library) => {
  if (importDeclaration.source.value.endsWith(library)) {
    const names = importDeclaration.specifiers
      .filter(
        (specifier) =>
          specifier.imported &&
          (namedExport === '*' || specifier.imported.name === namedExport)
      )
      .map((specifier) => specifier.local.name);
    if (names.length) {
      return namedExport === '*' ? names : names[0];
    }
  }
};

// recursively go up the scope to find this variable.
const findDeclaration = (scope, name) => {
  // there is no upper scope 🤷🏽‍♂️ bail here
  if (!scope.upper) {
    return {};
  }
  const variable = scope.variables.find((v) => v.name === name);
  if (variable) {
    return {
      declaration: variable.defs[0].parent, // VariableDeclaration
      declarationScope: scope,
    };
  }
  // recursively go up the scope
  return findDeclaration(scope.upper, name);
};

// recursively go down all the scopes to find all possible variable assignments.
const findAssignments = (scope, name) => {
  // there are lower scopes, go down the rabbit hole
  let lowerAssignments = [];
  if (scope.childScopes.length) {
    lowerAssignments = scope.childScopes.flatMap((scope) =>
      findAssignments(scope, name)
    );
  }

  const scopeBody =
    scope.type === 'block' ? scope.block.body : scope.block.body.body;

  const scopeAssignments =
    scopeBody && scopeBody.length
      ? scopeBody
          .filter(
            (statement) =>
              statement.type === 'ExpressionStatement' &&
              statement.expression.type === 'AssignmentExpression' &&
              statement.expression.left.name === name
          )
          .map((statement) => statement.expression)
      : [];

  return [...scopeAssignments, ...lowerAssignments];
};

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      // for use within `<Link to />`
      link: "Use one of UniProt's config locations for links",
      // for use with history.push() or history.replace()
      navigation:
        "Use one of UniProt's config locations for imperative history navigation",
      // We don't want to use standalone `push` or `replace`:
      //  - It simplies detecting its use
      //  - those method names are too common
      destructureHistory: "Don't destructure the history object",
      // `history.push({ search: 'blabla' })` -> Where's the pathname‽
      noPathname:
        'Use a pathname, otherwise will default to the root of the site',
      // `history.push(`${}`)` or `history.push(`/uniprotkb/`)` -> Big no-no!
      string: "Don't build a pathname from scratch with a string",
    },
  },
  create(context) {
    // variables to keep the local names of the imports we are interested in
    let locationConfig;
    let link = null;
    let useHistory = null;
    let history = null;

    /* Helper functions */
    // linting issue reporter
    const report = (node, messageId = 'link') =>
      context.report({ node, messageId });

    const sourceContainsLocationConfig = (node) => {
      if (!(locationConfig && locationConfig.length)) {
        return false;
      }
      return locationConfig.some((namedImport) =>
        context.getSource(node).includes(namedImport)
      );
    };

    const isVariableUsingLocationConfig = (name) => {
      if (!name) {
        return false;
      }
      // we need to find where it's defined
      const { declaration, declarationScope } = findDeclaration(
        context.getScope(),
        name
      );
      if (
        declaration &&
        declaration.declarations &&
        declaration.declarations.length
      ) {
        if (declaration.kind === 'const') {
          // const declaration, check if we use location config within
          return sourceContainsLocationConfig(declaration);
        }
        // else...
        // var or let declaration, we need to check everywhere where it
        // might have been redefined
        const assignments = findAssignments(
          declarationScope,
          declaration.declarations[0].id.name
        );
        // Find if at least one assignment uses location config
        // That's how far we can go here in static analysis...
        return assignments.some(sourceContainsLocationConfig);
      }
      // if no declaration found... there's a bigger issue anyway
      return false;
    };

    const validateExpression = (expression, reportAs = 'link') => {
      switch (expression.type) {
        case 'Literal':
        case 'TemplateLiteral':
          // nope! don't build a pathname from scratch
          report(expression, 'string');
          break;
        case 'CallExpression':
        case 'ArrowFunctionExpression':
        case 'MemberExpression':
          // fn that, somehow, inside, calls Location or other location config
          // e.g., useMemo(() => Location...)
          // e.g., generatePath(Location...)
          // e.g., when using the location parameters provided to the function
          // e.g., when using Location directly
          if (!sourceContainsLocationConfig(expression)) {
            // Inlined code doesn't use location config
            // if function call, let's check its definition
            if (
              !(
                expression.type === 'CallExpression' &&
                isVariableUsingLocationConfig(expression.callee.name)
              )
            )
              report(expression, reportAs);
          }
          break;
        case 'Identifier':
          // we use a variable as value
          if (!isVariableUsingLocationConfig(expression.name)) {
            report(expression, reportAs);
          }
          break;
        case 'ObjectExpression': {
          // we use a location descriptor object
          // find the pathname
          let isUsingSpread = false;
          let pathnameProperty = null;
          for (const property of expression.properties) {
            if (property.type === 'SpreadElement') {
              isUsingSpread = true;
            } else if (property.key.name === 'pathname') {
              pathnameProperty = property;
              break;
            }
          }
          if (!pathnameProperty) {
            // Not using pathname at all
            if (!isUsingSpread) {
              // but pathname should be coming from the spread then
              // 😕 we might have forgotten to use the pathname altogether
              // That's an issue because otherwise it will route to `/`
              report(expression, 'noPathname');
            }
            break;
          }
          if (sourceContainsLocationConfig(pathnameProperty.value)) {
            // use location config directly
            break; // all good 👍🏽
          } else if (
            pathnameProperty.value.type === 'Identifier' &&
            isVariableUsingLocationConfig(pathnameProperty.value.name)
          ) {
            // use a variable that is defined using location config
            break; // all good 👍🏽
          } else {
            report(expression, reportAs);
          }
          break;
        }
        default:
          // Just here for debugging in case we missed, well... a case...
          console.warn(`We didn't consider a "${expression.type}" expression`);
          report(expression, reportAs);
      }
    };

    // Main logic
    return {
      // on any ES module import
      ImportDeclaration(node) {
        // keep track of the local names of the things we are interesting in
        locationConfig =
          locationConfig || getLocalNameFor(node, '*', 'config/urls');
        link = link || getLocalNameFor(node, 'Link', 'react-router-dom');
        useHistory =
          useHistory || getLocalNameFor(node, 'useHistory', 'react-router-dom');
      },
      // on any function call
      CallExpression(node) {
        const { callee, arguments } = node;
        if (!useHistory) {
          return; // bail
        } else if (
          // `someIdentifier()`
          callee.type === 'Identifier' &&
          // `useHistory()`
          callee.name === useHistory
        ) {
          const { parent } = node;
          if (parent.type === 'VariableDeclarator') {
            if (parent.id.type === 'ObjectPattern') {
              // `const { push, replace } = useHistory();`
              report(parent, 'destructureHistory');
            } else if (parent.id.type === 'Identifier') {
              // `const history === useHistory();`
              history = parent.id.name;
            } else {
              // 🤷🏽‍♂️ not sure what else there could be out there
            }
          }
        } else if (
          // `someObject.someIdentifier()`
          callee.type === 'MemberExpression' &&
          // `history.someIdentifier()`
          callee.object.name === history &&
          // `history.push()` or `history.replace()`
          (callee.property.name === 'replace' ||
            callee.property.name === 'push')
        ) {
          // validate the argument of the history navigation call
          validateExpression(arguments[0], 'navigation');
        }
      },
      // on any use of a JSX element
      JSXElement(node) {
        // if the element we are inspecting is not a <Link />, bail
        if (!link || node.openingElement.name.name !== link) {
          return;
        }

        const toAttr = node.openingElement.attributes.find(
          (attr) => attr.name?.name === 'to'
        );
        // if it doesn't use "to", bail
        if (!toAttr) {
          return;
        }

        // if we arrive here and we don't have imported any location config in
        // scope, we know the rule won't be able to be applied
        if (!(locationConfig && locationConfig.length)) {
          return report(toAttr);
        }

        const { value } = toAttr;

        if (value.type === 'Literal' || value.type === 'TemplateLiteral') {
          return report(toAttr, 'string');
        }

        if (value.type === 'JSXExpressionContainer') {
          validateExpression(value.expression, 'link');
        }
      },
    };
  },
};
