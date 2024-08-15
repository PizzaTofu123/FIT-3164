//model is to store smth to store in the database
const mongoose = require('mongoose');
const {isAlphanumeric, isNumeric} = require('../utility/stringValidator')

const CandidateSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    candidateId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"Candidate"
    },
    image: {
        type: String,
        required: false
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