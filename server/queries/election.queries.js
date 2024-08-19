const Election = require("../models/election.model");

module.exports = {
    createElection : async (data) => {
        const election = new Election(data);
        await election.save();
        return election
    },
    getAllElection : async () => {
        const election = await Election.find({});
        return election;
    },
    getElection : async (electionId) => {
        const election = await Election.findById(electionId);
        return election;
    },
    
}
