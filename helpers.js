const chalkPipe = require('chalk-pipe')
const constants = require('./constants.js')
const seperator = constants.seperator
const urlRegex = constants.urlRegex
const thanksDecorator = constants.thanksDecorator
const exec = require('child_process').exec
const fs = require('fs');

module.exports = {
  validateUrl: function(name) {
    const exp = urlRegex;
    const regex = new RegExp(exp);
    const isValid = name.match(regex);
    return (isValid ? true : false) || '~ Url is not valid'
  },
  validateName: function(name){
    const isValid = (name !== '');
    return isValid || '~ Username is required';
  },
  updateConfig: function(){
    const configPath = 'sample.txt';
    // const configPath = '~/.ssh/config';
    fs.open(configPath, "a+", function(error, fd) {
      if (error) {
        console.error("open error:  " + error.message);
      } else {
        fs.appendFile(configPath, '\r\ndata to append', function (err) {
          if (err) throw err;
          console.log(seperator + 'Saved SSH to config file !' + seperator + thanksDecorator);
          process.exit(1);
        });
      }
    });
  },
  generateKeys: function(username, domain, type) {
    let exp = 'ssh-keygen -t rsa -b 4096 -f ~/.ssh/' + username + '-' + domain + ' ' + '-C' + ' ' + '"' + username + '-' + domain + '"';
    let printExp = `${'cat ~/.ssh/' + username + '-' + domain + '.pub'}`;
    if (type == 'print') {
      console.log(seperator + 'Paste this to create your ssh keys:' + seperator, chalkPipe('orange')(exp));
    } else {
      let child = exec(exp);
      child.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
        let subchild = exec(printExp);
        subchild.stdout.on('data', function(data) {
          console.log(seperator + 'Freshly baked key: Ready to be served !' + seperator, chalkPipe('orange')(data));
          module.exports.updateConfig();
        });
        subchild.stderr.on('data', function(data) {
          console.log('stdout: ' + data);
        });
        subchild.on('close', function(code) {
          console.log('closing code: ' + code);
        });
      });
      child.stderr.on('data', function(data) {
        console.log('stdout: ' + data);
      });
      child.on('close', function(code) {
        console.log('closing code: ' + code);
      });
    }
  }
};
