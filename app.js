#! /usr/bin/env node

const inquirer = require('inquirer')
const chalkPipe = require('chalk-pipe')
const utils = require('./utils.js')
const questions = utils.questions

var exec = require('child_process').exec;


function validateUrl(name) {
  const exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(exp);
  const isValid = name.match(regex);
  return (isValid ? true : false) || '~ Url is not valid'
}

function generateKeys(username, domain, type) {
  let exp = 'ssh-keygen -t rsa -b 4096 -f ~/.ssh/' + username + '-' + domain + ' ' + '-C' + ' ' + '"' + username + '-' + domain + '"';
  let printExp = `${'cat ~/.ssh/' + username + '-' + domain + '.pub'}`;
  if (type == 'print') {
    console.log('Paste this to create your ssh keys: -------------------------------' + '\n' + '\n' , chalkPipe('orange')(exp));
  } else {
    let child = exec(exp);
    child.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
      console.log('stdout: ' + data);
    });
    child.on('close', function(code) {
      console.log('closing code: ' + code);
    });
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
      if (answers.isConfirm) {
        generateKeys(answers.username, ans.domain_name, 'generate');
      } else {
        generateKeys(answers.username, ans.domain_name, 'print');
      }
    })
  }
  if (answers.domain != 'custom_domain') {
    if (answers.isConfirm) {
      generateKeys(answers.username, domain, 'generate');
    } else {
      generateKeys(answers.username, domain, 'print');
    }
  }
});
