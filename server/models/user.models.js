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
    image: {
        type: String,
        required: false
    },
    isRepresentative: {
        type: Boolean,
        default: false
    }

},
    {
        // 2 extra fields for created and updated at
        Timestamps: true
    }
);

//for mongodb to use
const User = mongoose.model("User", UserSchema);

module.exports = User;