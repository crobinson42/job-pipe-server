const forms = require('./forms/forms.service.js');
const users = require('./users/users.service.js');
const applicants = require('./applicants/applicants.service.js');
const organizations = require('./organizations/organizations.service.js');
const search = require('./search/search.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(forms);
  app.configure(users);
  app.configure(applicants);
  app.configure(organizations);
  app.configure(search);
};
