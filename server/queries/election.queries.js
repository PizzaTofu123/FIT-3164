const Election = require("../models/election.model");
const mainQueries = require("./main.queries");

const electionQueries = {
    createElection : async (data) => {
        const election = new Election(data);
        await election.save();
        return election
    },
    getAllElections : async () => {
        const election = await Election.find({});
        return election;
    },
    getElection : async (electionId) => {
        const election = await Election.findById(electionId);
        return election;
    },
    
}

mainQueries.categories = electionQueries;
module.exports = electionQueries;
