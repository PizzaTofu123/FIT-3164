//model is to store smth to store in the database
const mongoose = require('mongoose');
const {isAlphanumeric, isNumeric} = require('../utility/stringValidator')

const ElectionSchema = mongoose.Schema({
    electionName: {
        type: String,
        required: true
    },
    electionStartDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    electionEndDate: {
        type: Date,
        required: true
    },
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        default: []
    }],

    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "club"
    }

},
    {
        // 2 extra fields for created and updated at
        Timestamps: true
    }
);
//for mongodb to use
const Election = mongoose.model("Election", ElectionSchema);

module.exports = Election;