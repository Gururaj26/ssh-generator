const inquirer = require('inquirer');

function validateName(name){
  const isValid = (name !== '');
  return isValid || '~ Username is required';
}

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
    },
    new inquirer.Separator(),
    {
      name: 'Custom Domain',
      value: 'custom_domain'
    }
  ]
}, {
  type: 'input',
  name: 'username',
  message: 'Your username :',
  validate: validateName
}, {
  type: 'confirm',
  name: 'isConfirm',
  message: 'Do you want to create your ssh key ?',
}];

module.exports = {
  'questions': questions
}
