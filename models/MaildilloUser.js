const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const MaildilloUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('maildillo-user', MaildilloUserSchema);