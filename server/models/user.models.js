//model is to store smth to store in the database
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    student_id: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: false
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