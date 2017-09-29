// Initializes the `registration` service on path `/registration`
const createService = require('./registration.class.js');
const hooks = require('./registration.hooks');
const filters = require('./registration.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'registration',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/registration', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('registration');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};