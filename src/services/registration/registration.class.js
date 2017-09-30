const errors = require('feathers-errors')

/* eslint-disable no-unused-vars */
class Service {
  setup(app) {
    this.app = app
  }

  constructor(options) {
    this.options = options || {}
  }

  find(params) {
    return Promise.reject([])
  }

  get(id, params) {
    return Promise.reject({
      id,
      text: `A new message with ID: ${id}!`,
    })
  }

  create(data, params) {
    // if (Array.isArray(data)) {
    //   return Promise.all(data.map(current => this.create(current)));
    // }

    // validate both models before creating to eliminate the need to delete an org incase the user validate fails

    return new Promise((resolve, reject) => {
      Promise.all([
        this.validateUser(data.user),
        this.validateOrganization(data.organization),
      ])
        .then(() => {
          return Promise.all([
            this.app.service('organizations').create(data.organization),
            this.app.service('users').create(data.user),
          ])
        })
        .then(([organization, user]) => {
          // todo: auth user and send token
          const authToken = ''

          resolve({ authToken, organization, user })
        })
        .catch(err => {
          return reject(new errors.BadRequest(err))
        })
    })
  }

  update(id, data, params) {
    return Promise.reject(data)
  }

  patch(id, data, params) {
    return Promise.reject(data)
  }

  remove(id, params) {
    return Promise.reject({ id })
  }

  validateOrganization(organization) {
    return new Promise((resolve, reject) => {
      this.app
        .service('organizations')
        .Model(organization)
        .validate(err => {
          if (err) return reject(err)

          return resolve()
        })
    })
  }

  validateUser(user) {
    return new Promise((resolve, reject) => {
      this.app
        .service('users')
        .Model(user)
        .validate(err => {
          if (err) return reject(err)

          // check email is unique
          this.app
            .service('users')
            .find({ query: { email: user.email } })
            .then(({ data }) => {
              if (!data.length) return resolve()

              return reject({
                errors: {
                  email: {
                    message: 'Path `email` must be unique.',
                    name: 'ValidatorError',
                    properties: {
                      type: 'unique',
                      message: 'Path `{PATH}` is required.',
                      path: 'email',
                    },
                    kind: 'unique',
                    path: 'email',
                    $isValidatorError: true,
                  },
                }
              })
            })
        })
    })
  }
}

module.exports = function(options) {
  return new Service(options)
}

module.exports.Service = Service
