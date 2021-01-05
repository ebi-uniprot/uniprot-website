const fs = require('fs');
const path = require('path');

const ruleTests = fs
  .readdirSync(__dirname)
  // only run test files
  .filter((filename) => filename.endsWith('.spec.js'));

for (const ruleTest of ruleTests) {
  try {
    require(path.join(__dirname, ruleTest));
  } catch (error) {
    console.error(`Error while executing "${ruleTest}"`);
    throw error;
  }
}
