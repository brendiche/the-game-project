if (!require('./commit').validate(process.env.GITHUB_PULL_REQUEST_NAME)) {
  process.exit(1);
}