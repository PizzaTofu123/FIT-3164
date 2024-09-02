const Election = require("../models/election.model");
const mainQueries = require("./main.queries");

const electionQueries = {
    createElection : async (data) => {
        const election = new Election(data);
        await election.save();
        return election
    },

    getAllElection : async () => {
        const election = await Election.find({});
        return election;
    },

    getOneElection : async (electionId) => {
        const election = await Election.findById(electionId);
        return election;
    },

    deleteOneElection : async (electionId) =>{
        const election = await Election.findByIdAndDelete(electionId).exec();
        if (election) {
            for(let candidateId of election.candidates){
                await mainQueries.Candidates.deleteOneCandidate(candidateId);
                this._unlinkCandidateToElection(electionId, candidateId);
            }
            return election;
        } else {
            return null;
        }
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
    }
}

mainQueries.elections = electionQueries;
module.exports = electionQueries;
