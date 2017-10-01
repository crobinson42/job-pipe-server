// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const users = new mongooseClient.Schema({
    admin: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'organizations' },
    password: { type: String, required: true },

    // auth
    googleId: { type: String },
    facebookId: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  })

  return mongooseClient.model('users', users)
}
