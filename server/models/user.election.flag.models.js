//model is to store smth to store in the database
const mongoose = require('mongoose');
const {isAlphanumeric, isNumeric} = require('../utility/stringValidator')

const UserElectionFlagSchema = mongoose.Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    electionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Election"
    }
},
    {
        // 2 extra fields for created and updated at
        Timestamps: true
    }
);

//for mongodb to use
const UserElectionFlag = mongoose.model("UserElectionFlag", UserElectionFlagSchema);

module.exports = UserElectionFlag;