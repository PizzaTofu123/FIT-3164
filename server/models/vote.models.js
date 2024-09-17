//model is to store smth to store in the database
const mongoose = require('mongoose');
const {isAlphanumeric, isNumeric} = require('../utility/stringValidator')

const VoteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default: null
    },
    electionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Election"
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Candidate"
    },
    level: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
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
const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;