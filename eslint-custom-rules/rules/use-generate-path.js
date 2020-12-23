// as local name might be different than exported name, this helper finds it
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
          if (value?.expression?.callee?.name === 'generatePath') {
            return; // all good 👍🏽
          }

          return context.report({ node, messageId: 'issue' });
        }
      },
    };
  },
};
