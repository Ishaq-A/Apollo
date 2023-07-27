const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        url: String,
        filename: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    position: {
        type: String,
        default: 'IT Technician'
    },
    salary: {
        type: String,
        default: '£30,000'
    },
    holidays: {
        type: Number,
        default: 40
    }
}, { timestamps: true });

// Adds Username & Password To Schema
// Ensures Username Is Unique
// Provides Additional Methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

