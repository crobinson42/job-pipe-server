const { authenticate } = require('feathers-authentication').hooks
const { restrictToOwner } = require('feathers-authentication-hooks')

exports.addOrganizationParam = hook => {
  hook.params.query.organization = hook.params.user.organization

  if (hook.data)
    hook.data.organization = hook.params.user.organization

  return hook
}

exports.authed = authenticate('jwt')

exports.isAdmin = hook => (hook.params.user && !!hook.params.user.admin)

exports.ownerOnly = restrictToOwner({
  idField: '_id',
  ownerField: '_id',
})

exports.restrictToSameOrganization = restrictToOwner({
  idField: 'organization',
  ownerField: 'organization',
})
