// const commonHooks = require('feathers-hooks-common')
const { authed, addOrganizationParam } = require('../../hooks')

module.exports = {
  before: {
    all: [],
    find: [authed, addOrganizationParam],
    get: [],
    create: [],
    update: [authed, addOrganizationParam],
    patch: [authed, addOrganizationParam],
    remove: [
      // todo: disallow?
      authed,
      addOrganizationParam,
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
