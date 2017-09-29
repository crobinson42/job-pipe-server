// applicants-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const applicants = new Schema({
    forms: [{ type: Schema.Types.ObjectId, ref: 'forms' }],
    organization: { type: Schema.Types.ObjectId, ref: 'organizations' },
    text: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  })

  return mongooseClient.model('applicants', applicants)
}
