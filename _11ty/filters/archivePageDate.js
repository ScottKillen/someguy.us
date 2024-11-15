const moduleName = require('../helpers/moduleName');
const { DateTime } = require('luxon');

const body = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('LLL dd, yyyy');
};

module.exports = {
  name: moduleName(__filename),
  body,
};
