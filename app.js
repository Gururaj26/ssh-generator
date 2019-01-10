const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
const execSync = require('child_process').execSync;
const utils = require('./utils.js');
const questions = utils.questions;

inquirer.prompt(questions).then(answers => {
  const command = 'ssh-keygen -t rsa -b 4096 -f ~/.ssh/' + answers.username + '-' + answers.domain + ' ' + '-C' + ' ' + '"' + answers.username + '-' + answers.domain + '"';
  let cmd = execSync(command);
  if(answers.isConfirm) console.log('Successfully created your ssh keys');
});
