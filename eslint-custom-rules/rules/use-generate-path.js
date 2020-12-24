// as local name might be different than exported name, this helper finds it.
const getLocalNameFor = (importDeclaration, namedExport, library) => {
  if (importDeclaration.source.value === library) {
    const specifier = importDeclaration.specifiers.find(
      (s) => s.imported.name === namedExport
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
      issue:
        'Make sure to use "generatePath" from "react-router-dom" with one of UniProt\'s locations',
    },
  },
  create(context) {
    // variables to keep the local names of the imports we are interested in
    let generatePath = null;
    let link = null;

    const sourceContainsGeneratePath = (node) => {
      if (!generatePath) {
        return false;
      }
      return context.getSource(node).includes(generatePath);
    };

    return {
      ImportDeclaration(node) {
        generatePath =
          generatePath ||
          getLocalNameFor(node, 'generatePath', 'react-router-dom');
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

        // if we arrive here and we don't have imported generatePath in scope,
        // we know the rule won't be able to be applied
        if (!generatePath) {
          return context.report({ node, messageId: 'issue' });
        }

        const value = toAttr.value;

        if (value.type === 'Literal' || value.type === 'TemplateLiteral') {
          return context.report({ node, messageId: 'issue' });
        }

        if (value.type === 'JSXExpressionContainer') {
          const exp = value.expression;
          if (exp.type === 'CallExpression') {
            // to={generatePath(...)}
            if (exp.callee.name === generatePath) {
              return; // all good 👍🏽
            } else {
              // fn that, somehow, inside, calls generatePath. (e.g., useMemo)
              if (sourceContainsGeneratePath(exp)) {
                return; // all good 👍🏽
              } else {
                return context.report({ node, messageId: 'issue' });
              }
            }
          } else if (exp.type === 'ArrowFunctionExpression') {
            // fn that, somehow, inside, calls generatePath.
            // e.g. when using the location parameters provided to the function
            if (sourceContainsGeneratePath(exp)) {
              return; // all good 👍🏽
            } else {
              return context.report({ node, messageId: 'issue' });
            }
          } else if (exp.type === 'Identifier') {
            // we use a variable as value, we need to find where it's defined
            const { declaration, declarationScope } = findDeclaration(
              context.getScope(),
              exp.name
            );
            if (declaration) {
              if (declaration.kind === 'const') {
                // const declaration, check if we use generatePath within
                if (sourceContainsGeneratePath(declaration)) {
                  return; // all good 👍🏽
                } else {
                  return context.report({ node, messageId: 'issue' });
                }
              } else {
                // var or let declaration, we need to check everywhere where it
                // might have been redefined
                const assignments = findAssignments(
                  declarationScope,
                  declaration.declarations[0].id.name
                );
                if (assignments.some(sourceContainsGeneratePath)) {
                  return; // OK, at least one assignment use generatePath
                  // That's how far we can go here in static analysis...
                } else {
                  return context.report({ node, messageId: 'issue' });
                }
              }
            } // if no declaration found... there's a bigger issue
          }

          return context.report({ node, messageId: 'issue' });
        }
      },
    };
  },
};
