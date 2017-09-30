const { authed, restrictToSameOrganization } = require('../../hooks')

module.exports = {
  before: {
    all: [
      authed,
      restrictToSameOrganization,
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      // todo: check if there are applicants before deleting?
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
