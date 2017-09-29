// Initializes the `applicants` service on path `/applicants`
const createService = require('feathers-mongoose');
const createModel = require('../../models/applicants.model');
const hooks = require('./applicants.hooks');
const filters = require('./applicants.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'applicants',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/applicants', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('applicants');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
