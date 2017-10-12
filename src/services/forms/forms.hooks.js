const { authed, addOrganizationParam, restrictToSameOrganization } = require('../../hooks')

module.exports = {
  before: {
    all: [authed, addOrganizationParam],
    find: [restrictToSameOrganization],
    get: [restrictToSameOrganization],
    create: [],
    update: [restrictToSameOrganization],
    patch: [restrictToSameOrganization],
    remove: [
      // todo: check if there are applicants before deleting?
      restrictToSameOrganization,
    ],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
