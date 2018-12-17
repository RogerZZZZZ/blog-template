const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VersionSchema = new Schema({
  version: Number,
})

const Version = mongoose.model('Version', VersionSchema)

export default Version
