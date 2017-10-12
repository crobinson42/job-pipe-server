// forms-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const forms = new Schema({
    // todo: add expires attr for termed forms

    description: { type: String },
    // the form-builder json shape that defines a forms elements on the frontend
    formShape: { type: Object, default: {}},
    title: { type: String, required: true },
    version: { type: Number, default: new Date().getTime(), required: true },

    applicants: [{ type: Schema.Types.ObjectId, ref: 'applicants' }],
    organization: { type: Schema.Types.ObjectId, ref: 'organizations' },

    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
  })

  return mongooseClient.model('forms', forms)
}
