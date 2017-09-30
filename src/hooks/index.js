const { authenticate } = require('feathers-authentication').hooks
const { restrictToOwner } = require('feathers-authentication-hooks')

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
