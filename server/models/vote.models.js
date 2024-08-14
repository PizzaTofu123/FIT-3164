//model is to store smth to store in the database
const mongoose = require('mongoose');
const {isAlphanumeric, isNumeric} = require('../utility/stringValidator')

const VoteSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    electionId: {
        type: ObjectId,
        required: true
    },
    candidateId: {
        type: ObjectId,
        required: true
    }

},
    {
        // 2 extra fields for created and updated at
        Timestamps: true
    }
);

//for mongodb to use
const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;