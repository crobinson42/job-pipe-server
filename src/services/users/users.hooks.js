const commonHooks = require('feathers-hooks-common')
const { hashPassword } = require('feathers-authentication-local').hooks
const {
  authed,
  isAdmin,
  ownerOnly,
  restrictToSameOrganization,
} = require('../../hooks')

module.exports = {
  before: {
    all: [authed],
    find: [
      // todo: we need to open this up to check for unique email addresses for user creation
      restrictToSameOrganization
    ],
    get: [restrictToSameOrganization],
    // Only admin can create a user or the 'registration' service
    create: [
      commonHooks.iffElse(
        isAdmin,
        restrictToSameOrganization,
        commonHooks.disallow('external'),
      ),
      hashPassword(),
    ],
    update: [
      commonHooks.iffElse(
        isAdmin,
        [restrictToSameOrganization, commonHooks.discard('_id', 'organization')],
        [ownerOnly, commonHooks.discard('admin', '_id', 'organization')],
      ),
      hashPassword(),
    ],
    patch: [
      commonHooks.iffElse(
        isAdmin,
        [restrictToSameOrganization, commonHooks.discard('_id', 'organization')],
        [ownerOnly, commonHooks.discard('admin', '_id', 'organization')],
      ),
      hashPassword(),
    ],
    remove: [commonHooks.disallow()],
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password'),
      ),
    ],
    find: [],
    get: [],
    create: [
      hook => {
        const organizations = hook.app.service('organizations')
        const orgId = hook.result.organization

        return organizations.get(orgId).then(organization => {
          organization.users.push(hook.result._id)

          organizations.update(orgId, organization)

          return hook
        })
      },
    ],
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
