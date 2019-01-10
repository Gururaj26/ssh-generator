const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');

var questions = [{
  type: 'list',
  name: 'domain',
  message: "select the domain for which you want to create ssh-key",
  choices: [{
      name: 'Github',
      value: 'github.com'
    },
    {
      name: 'Gitlab',
      value: 'gitlab.com'
    },
    {
      name: 'Bitbucket',
      value: 'bitbucket.org'
    }
  ]
}, {
  type: 'input',
  name: 'username',
  message: 'Your username :',
}, {
  type: 'confirm',
  name: 'isConfirm',
  message: 'Do you want to create your ssh key ? (y/N)',
}];

module.exports = {
  'questions': questions
}
