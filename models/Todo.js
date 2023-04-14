const { Schema, Types, model } = require('mongoose')
const schema = new Schema({
  owner: { type: Types.ObjectId, ref: 'User' },
  text: { type: 'String', require: true },
  status: { type: 'Boolean', require: true },
  important: { type: 'Boolean', require: true },
})
module.exports = model('Todo', schema)
