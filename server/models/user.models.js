//model is to store smth to store in the database
const mongoose = require('mongoose');
const {isAlphanumeric, isNumeric} = require('../utility/stringValidator')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter first name"],
        validate: {
            validator: function(value) {
                return isAlphanumeric(value);
            },
            message: _ => 'A valid alphanumeric name is required!'
        }
    },
    lastName: {
        type: String,
        required: [true, "Please enter last name"],
        validate: {
            validator: function(value) {
                return isAlphanumeric(value);
            },
            message: _ => 'A valid alphanumeric name is required!'
        }
    },
    studentId: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: function(value) {
                return isNumeric(value);
            },
            message: _ => 'A valid numeric ID is required!'
        }
    },
    passwordHash: {
        type: String, 
        required: true
    },
    dob: {
        //YYYY-MM-DD
        type: Date,
        required: true 
    },
    age: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        default: []
    }],
    representingClubs: [{
        type: mongoose.Schema.Types.ObjectId,
        default: []
    }],
    level: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    secondFaculty: {
        type: String,
        default: null
    },
    course: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
},
    {
        // 2 extra fields for created and updated at
        Timestamps: true
    }
);

//for mongodb to use
const User = mongoose.model("User", UserSchema);

module.exports = User;