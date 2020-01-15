const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MaildilloUserSchema = new Schema({
  name: {
    first: {
      type: String,
      trim: true,
      minlength: 1,
    },
    last: {
      type: String,
      trim: true,
      minlength: 1,
    }
  },
  email: {
    type: String,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    trim: true,
    minlength: 3
  },
  messages: [
    {
      to: {
        type: String
      },
      from: {
        type: String
      },
      subject: {
        type: String
      },
      body: {
        type: String
      },
      active: {
        type: Boolean,
        default: true
      },
      created: {
          type: Date,
          default: Date.now
      },
      execute: {
          type: Date
      }
    }
  ]
});

const User = mongoose.model('maildilloUsers', MaildilloUserSchema);

module.exports = User;
