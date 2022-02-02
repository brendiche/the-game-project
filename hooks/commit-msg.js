const commitMessageFile = process.argv[2];

if (!commitMessageFile) {
  throw new Error('Commit message is mandatory');
}

const PARAMS = require('fs').readFileSync(commitMessageFile);
const commitMessage = PARAMS.toString();

if (!require('./commit').validate(commitMessage)) {
  process.exit(1);
}