const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');

const utils = require('./utils.js');
const questions = utils.questions;

inquirer.prompt(questions).then(answers => {
  const command = 'ssh-keygen -t rsa -b 4096 -f ~/.ssh/' + answers.username + '-' + answers.domain + ' ' + '-C' + ' ' + '"' + answers.username + '-' + answers.domain + '"';
  console.log('hery', JSON.stringify(answers, null, ' '));
  console.log('Paste this command in terminal', command);
});
