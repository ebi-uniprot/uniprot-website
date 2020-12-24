// as local name might be different than exported name, this helper finds it.
const getLocalNameFor = (importDeclaration, namedExport, library) => {
  if (importDeclaration.source.value.endsWith(library)) {
    const specifier = importDeclaration.specifiers.find(
      (s) => s.imported && s.imported.name === namedExport
    );
    if (specifier) {
      return specifier.local.name;
    }
  }
};

// recursively go up the scope to find this variable.
const findDeclaration = (scope, name) => {
  // there is no upper scope 🤷🏽‍♂️ bail here
  if (!scope.upper) {
    return;
  }
  const variable = scope.variables.find((v) => v.name === name);
  if (variable) {
    return {
      declaration: variable.defs[0].parent, // VariableDeclaration
      declarationScope: scope,
    };
  } else {
    // recursively go up the scope
    return findDeclaration(scope.upper, name);
  }
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

  const scopeAssignments = scopeBody
    .filter(
      (statement) =>
        statement.type === 'ExpressionStatement' &&
        statement.expression.type === 'AssignmentExpression' &&
        statement.expression.left.name === name
    )
    .map((statement) => statement.expression);

  return [...scopeAssignments, ...lowerAssignments];
};

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      issue: "Make sure to use one of UniProt's config locations for links",
    },
  },
  create(context) {
    // variables to keep the local names of the imports we are interested in
    let location = null;
    let link = null;

    const sourceContainsLocation = (node) => {
      if (!location) {
        return false;
      }
      return context.getSource(node).includes(location);
    };

    const isVariableUsingLocation = (name) => {
      // we need to find where it's defined
      const { declaration, declarationScope } = findDeclaration(
        context.getScope(),
        name
      );
      if (declaration) {
        if (declaration.kind === 'const') {
          // const declaration, check if we use Location within
          if (sourceContainsLocation(declaration)) {
            return true;
          } else {
            return false;
          }
        } else {
          // var or let declaration, we need to check everywhere where it
          // might have been redefined
          const assignments = findAssignments(
            declarationScope,
            declaration.declarations[0].id.name
          );
          if (assignments.some(sourceContainsLocation)) {
            return true; // OK, at least one assignment uses Location
            // That's how far we can go here in static analysis...
          } else {
            return false;
          }
        }
      } // else, if no declaration found... there's a bigger issue
    };

    return {
      ImportDeclaration(node) {
        location = location || getLocalNameFor(node, 'Location', 'config/urls');
        link = link || getLocalNameFor(node, 'Link', 'react-router-dom');
      },
      JSXElement(node) {
        // if the element we are inspecting is not a <Link />, bail
        if (!link || node.openingElement.name.name !== link) {
          return;
        }

        const toAttr = node.openingElement.attributes.find(
          (attr) => attr.name.name === 'to'
        );
        // if it doesn't use "to", bail
        if (!toAttr) {
          return;
        }

        // if we arrive here and we don't have imported Location in scope,
        // we know the rule won't be able to be applied
        if (!location) {
          return context.report({ node, messageId: 'issue' });
        }

        const value = toAttr.value;

        if (value.type === 'Literal' || value.type === 'TemplateLiteral') {
          return context.report({ node, messageId: 'issue' });
        }

        if (value.type === 'JSXExpressionContainer') {
          const exp = value.expression;
          if (
            exp.type === 'CallExpression' ||
            exp.type === 'ArrowFunctionExpression' ||
            exp.type === 'MemberExpression'
          ) {
            // fn that, somehow, inside, calls Location.
            // e.g., useMemo(() => Location...)
            // e.g., to={generatePath(Location...)}
            // e.g., when using the location parameters provided to the function
            // e.g., when using Location directly
            if (sourceContainsLocation(exp)) {
              return; // all good 👍🏽
            } else {
              return context.report({ node, messageId: 'issue' });
            }
          } else if (exp.type === 'Identifier') {
            // we use a variable as value
            if (isVariableUsingLocation(exp.name)) {
              return; // all good 👍🏽
            } else {
              return context.report({ node, messageId: 'issue' });
            }
          } else if (exp.type === 'ObjectExpression') {
            // we use a location descriptor object
            // find the pathname
            const pathnameProperty = exp.properties.find(
              (property) => property.key.name === 'pathname'
            );
            if (!pathnameProperty) {
              return; // all good 👍🏽
            }
            if (sourceContainsLocation(pathnameProperty.value)) {
              return; // all good 👍🏽
            } else if (
              pathnameProperty.value.type === 'Identifier' &&
              isVariableUsingLocation(pathnameProperty.value.name)
            ) {
              return; // all good 👍🏽
            } else {
              return context.report({ node, messageId: 'issue' });
            }
          }

          return context.report({ node, messageId: 'issue' });
        }
      },
    };
  },
};
