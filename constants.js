const seperator = '\n' + '---------------------------------------------------' + '\n'
const urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports = {
  seperator: seperator,
  urlRegex: urlRegex
}
