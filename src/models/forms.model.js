// forms-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const forms = new Schema({
    applicants: [{ type: Schema.Types.ObjectId, ref: 'applicants' }],
    organization: { type: Schema.Types.ObjectId, ref: 'organizations' },
    text: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
  })

  return mongooseClient.model('forms', forms)
}
