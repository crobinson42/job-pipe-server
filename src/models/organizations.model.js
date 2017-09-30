// organizations-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const organizations = new Schema({
    name: { type: String, required: true },
    // organization statuses - can be changed on client
    status: { type: Array, default: ['new', 'archived', 'reviewed', 'interviewed', 'hired']},
    // organization tags used on applicants - can be changed on client
    tags: { type: Array, default: ['dismissed', 'unqualified', 'over qualified', 'no response', 'more info needed', 'schedule interview']},
    users: [{ type: Schema.Types.ObjectId, ref: 'users' }],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  })

  return mongooseClient.model('organizations', organizations)
}
