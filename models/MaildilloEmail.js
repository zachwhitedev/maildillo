const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MaildilloEmailSchema = new Schema({
  userid: {
    type: String,
    trim: true
  },
  useremail: {
    type: String,
    trim: true
  },
  toemail: {
    type: String,
    trim: true
  },
  content: {
    type: String,
  },
  subject: {
    type: String,
  },
  month: {
    type: String,
    trim: true
  },
  day: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  hour: {
    type: String,
    trim: true
  },
  minutes: {
    type: String,
    trim: true
  },
  ampm: {
    type: String,
    trim: true
  },
  unixTime: {
    type: String,
    trim: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  edit: {
    type: Boolean,
    default: false
  }
});

const Email = mongoose.model('maildilloEmails', MaildilloEmailSchema);

module.exports = Email;
