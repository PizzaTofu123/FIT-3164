//model is to store smth to store in the database
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: [true, "Please enter first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter last name"]
    },
    studentId: {
        type: Number,
        required: true,
        default: 0
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
    },
    {
        _id: false  // This disables automatic generation of the _id field
    }

);

//for mongodb to use
const User = mongoose.model("User", UserSchema);

module.exports = User;