// const commonHooks = require('feathers-hooks-common')
const { authed } = require('../../hooks')

module.exports = {
  before: {
    all: [],
    find: [authed],
    get: [],
    create: [],
    update: [authed],
    patch: [authed],
    remove: [
      // todo: disallow?
      authed,
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
