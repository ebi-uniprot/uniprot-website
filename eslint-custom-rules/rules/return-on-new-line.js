// This rule is probably fixable automatically, need implementation of `fix()`
module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      issue: 'Return statement needs to be on its own line',
    },
  },
  create(context) {
    return {
      ReturnStatement(node) {
        const previousToken = context.getTokenBefore(node);
        if (previousToken.loc.end.line === node.loc.start.line) {
          context.report({ node, messageId: 'issue' });
        }
      },
    };
  },
};
