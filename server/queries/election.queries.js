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

    async _linkCandidateToElection(electionId, candidateId){
        await Election.updateMany(
            { _id:  electionId },
            { $addToSet: { candidates: candidateId } }
        ).exec();
    },

    async _unlinkCandidateToElection(electionId, candidateId){
        await Election.updateMany(
            { _id:  electionId },
            { $pull: { candidates: candidateId } }
        ).exec();
    },

    async _linkRepresentativeToElection(electionId, representativeId){
        await Election.updateMany(
            { _id:  electionId },
            { $addToSet: { representatives: representativeId } }
        ).exec();
    },

    async _unlinkRepresentativeToElection(electionId, representativeId){
        await Election.updateMany(
            { _id:  electionId },
            { $pull: { representatives: representativeId } }
        ).exec();
    }
    
}

mainQueries.categories = electionQueries;
module.exports = electionQueries;
