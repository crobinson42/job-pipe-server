// applicants-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const applicants = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    formValues: { type: Object, default: {} },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },

    form: { type: Schema.Types.ObjectId, ref: 'forms' },
    organization: { type: Schema.Types.ObjectId, ref: 'organizations' },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  })

  return mongooseClient.model('applicants', applicants)
}
