const { HUSKY_GIT_PARAMS } = process.env;
if (!HUSKY_GIT_PARAMS) {
  throw new Error('HUSKY_GIT_PARAMS is mandatory');
}

const PARAMS = require('fs').readFileSync(HUSKY_GIT_PARAMS);
const commitMessage = PARAMS.toString();

if (!require('./commit').validate(commitMessage)) {
  process.exit(1);
}