//model is to store smth to store in the database
const mongoose = require('mongoose');
const {isAlphanumeric, isNumeric} = require('../utility/stringValidator')

const ElectionSchema = mongoose.Schema({

    electionStartDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    electionEndDate: {
        type: Date,
        required: true
    },

    representatives: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }],

    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate"
    }],

    //IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT 
    //how to do votes cuz u want vote id or by number idk how to store

},
    {
        // 2 extra fields for created and updated at
        Timestamps: true
    }
);

ElectionSchema.pre('save', function (next) {
    if (this.electionStartDate > this.electionEndDate) {
      next(new Error('Start date cannot be after end date'));
    } else {
      next();
    }
  });

//for mongodb to use
const Election = mongoose.model("Election", ElectionSchema);

module.exports = Election;