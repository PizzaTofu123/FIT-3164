//model is to store smth to store in the database
const mongoose = require('mongoose');
const {isAlphanumeric, isNumeric} = require('../utility/stringValidator')

const ClubSchema = mongoose.Schema({
    clubName: {
        type: String,
        required: [true, "Please enter club name"],

    },
    clubDescription: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    clubRepresentatives: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    clubMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    memberEmailList: [{
        type: String,
        required: true
    }],
    representativeEmailList: [{
        type: String,
        required: true
    }],
    electionStartDate: {
        type: Date,
        default: null
    },
    electionEndDate: {
        type: Date,
        default: null
    },
    electionOngoingFlag: {
        type: Boolean,
        deafult:false
    },
    elections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election"
    }],
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
const Club = mongoose.model("Club", ClubSchema);

module.exports = Club;