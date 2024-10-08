const Election = require("../models/election.model");
const mainQueries = require("./main.queries");

const electionQueries = {
    createElection : async (data) => {
        const election = new Election(data);
        await election.save();
        await mainQueries.clubs._linkElectionToClubs(election._id, election.club);
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
                await mainQueries.candidates.deleteOneCandidate(candidateId);
            }
            await mainQueries.clubs._unlinkElectionToClubs(election._id, election.club);
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
