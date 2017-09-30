const commonHooks = require('feathers-hooks-common')
const { authed, isAdmin, restrictToSameOrganization } = require('../../hooks')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      // only allow internal service (registration)
      commonHooks.disallow('external')
    ],
    update: [
      // only allow admin, same organization, and remove sensitive fields
      commonHooks.iff(commonHooks.isProvider('external'), [
        authed,
        isAdmin,
        restrictToSameOrganization,
        commonHooks.discard(['_id', 'users']),
      ]),
    ],
    patch: [
      // same as update
      commonHooks.iff(commonHooks.isProvider('external'), [
        authed,
        isAdmin,
        restrictToSameOrganization,
        commonHooks.discard(['_id', 'users']),
      ]),
    ],
    remove: [commonHooks.disallow()],
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
