#! /usr/bin/env node
const inquirer = require('inquirer')
// Helpers
const utils = require('./utils.js')
const helpers = require('./helpers.js')
// helper pointers
const questions = utils.questions

inquirer.prompt(questions).then(answers => {
  let username = answers.username;
  let domain = answers.domain;
  if (answers.domain == 'custom_domain') {
    inquirer.prompt({
      type: 'input',
      name: 'domain_name',
      message: 'Enter the Custom Domain Name :',
      validate: helpers.validateUrl
    }).then(ans => {
      if (answers.isConfirm) {
        helpers.generateKeys(answers.username, ans.domain_name, 'generate');
      } else {
        helpers.generateKeys(answers.username, ans.domain_name, 'print');
      }
    })
  }
  if (answers.domain != 'custom_domain') {
    if (answers.isConfirm) {
      helpers.generateKeys(answers.username, domain, 'generate');
    } else {
      helpers.generateKeys(answers.username, domain, 'print');
    }
  }
});
