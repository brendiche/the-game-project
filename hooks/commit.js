exports.validate = function (name) {
    try {
      const types = [
        { name: 'feat', comment: 'feature' },
        { name: 'fix', comment: 'bug fix' },
        { name: 'style', comment: 'formatting, missing semi colons, ... [no css files]' },
        { name: 'refactor', comment: 'refactor' },
        { name: 'test', comment: 'when adding missing tests' },
        { name: 'chore', comment: 'maintain webpack, packages, ...' },
        { name: 'doc', comment: 'documentation' },
        { name: 'wip', comment: 'Work in progress [do not merge on master]' },
      ];
      const commitMessage = name;
      const typesRegexp = types.map(type => type.name).join('|');

      const reg = new RegExp(`((${typesRegexp}): [A-z 0-9]*)`);

      if (!reg.test(commitMessage)) {
        console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
        console.log('\x1b[31mAborting commit.\x1b[0m');
        console.log('Your commit message: ',commitMessage)
        console.log('This commit message is not valid please use \x1b[1m<type>\x1b[0m: \x1b[1m<subject>\x1b[0m');
        console.log('\n\x1b[1mAllowed <type>\x1b[0m\n');
        types.forEach(type => {
          console.log(`\x1b[1m- ${type.name}\x1b[0m (${type.comment})`);
        });
        console.log('\n\x1b[1mSubject text\x1b[0m\n');
        console.log(`\x1b[1m- use imperative, present tense: "change" not "changed" nor "changes"`);
        console.log(`\x1b[1m- don't capitalize first letter`);
        console.log(`\x1b[1m- no dot (.) at the end`);
        console.log('\n\x1b[1mExamples\x1b[0m\n');
        console.log(`\x1b[1m- fix: css transition`);
        console.log(`\x1b[1m- feat: add error toast`);
        console.log(`\x1b[1m- chore: update webpack config`);
        console.log(`\x1b[1m- doc: add quick setup md`);
        console.log(`\x1b[1m- refactor: component structure`);
        console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }
