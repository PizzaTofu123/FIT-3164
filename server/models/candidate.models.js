//model is to store smth to store in the database
const mongoose = require('mongoose');
const {isAlphanumeric, isNumeric} = require('../utility/stringValidator')

const CandidateSchema = mongoose.Schema({
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
    description: {
        type: String,
        required: true
    },
    electionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Election"
    },
    image: {
        type: String,
        required: false
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vote"
    }],
    voteCount: {
        type: Number,
        required: false,
        default: 0
    },
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
    image: {
        type: String,
        required: false,
        default: null
    },

},
    {
        // 2 extra fields for created and updated at
        Timestamps: true
    }
);

//for mongodb to use
const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;