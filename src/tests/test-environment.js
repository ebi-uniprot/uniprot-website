const JestEnvironmentNode = require('jest-environment-node');

class TestEnvironment extends JestEnvironmentNode {
  constructor(config, context) {
    super(config, context);
  }

  async setup() {
    await super.setup();

    // define "global" in the context of the tests
    this.global.__BROWSER__ = global.__BROWSER__;
    this.global.__APP_URL__ = global.__APP_URL__;
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = TestEnvironment;
