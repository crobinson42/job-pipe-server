// applicants-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const applicants = new Schema({
    archived: { type: Boolean, default: false },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    flagged: { type: Boolean, default: false },
    form: { type: Schema.Types.ObjectId, ref: 'forms' },
    // formValues will be stored by key(label) => value in the
    // event the form shape changes, the formValues still
    // make sense when reviewing on the client
    formValues: { type: Object, default: {} },
    lastName: { type: String, required: true },
    // used by organization users only
    notes: [{
      text: { type: String, required: true },

      createdAt: { type: Date, default: Date.now },
      createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
      updatedAt: { type: Date, default: Date.now },
      updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
    }],
    phone: { type: String, required: true },

    form: { type: Schema.Types.ObjectId, ref: 'forms' },
    organization: { type: Schema.Types.ObjectId, ref: 'organizations' },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  })

  return mongooseClient.model('applicants', applicants)
}
