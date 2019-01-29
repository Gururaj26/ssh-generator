const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
const execSync = require('child_process').execSync;
const utils = require('./utils.js');
const questions = utils.questions;

function validateUrl(name){
  const exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(exp);
  const isValid = name.match(regex);
  return (isValid ? true : false) || '~ Url is not valid'
}

function generateKeys(username, domain, type){
  let exp = 'ssh-keygen -t rsa -b 4096 -f ~/.ssh/' + username + '-' + domain + ' ' + '-C' + ' ' + '"' + username + '-' + domain + '"';
  if(type=='print'){
    console.log('Paste this to create your ssh keys: ', exp);
  } else {
    // execSync(command);
    console.log('generated', exp);
  }
}

inquirer.prompt(questions).then(answers => {
  let username = answers.username;
  let domain = answers.domain;
  if (answers.domain == 'custom_domain') {
    inquirer.prompt({
      type: 'input',
      name: 'domain_name',
      message: 'Enter the Custom Domain Name :',
      validate: validateUrl
    }).then(ans => {
        if(answers.isConfirm){
          generateKeys(answers.username, ans.domain_name, 'generate');
        } else {
          generateKeys(answers.username, ans.domain_name, 'print');
        }
    })
  }
  if(answers.domain != 'custom_domain'){
    if (answers.isConfirm) {
      console.log('-------2');
      generateKeys(answers.username, domain, 'generate');
    } else {
      console.log('-------3');
      generateKeys(answers.username, domain, 'print');
    }
  }
});
