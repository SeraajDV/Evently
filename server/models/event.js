let mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateCreated: {type: Date, default: Date.now},
  owner: {
    type: String,
    required: true
  },
  location: String,
  isPublic: {type: Boolean, default: true},
  uri: String,
});

module.exports = mongoose.model('Event', eventSchema);
