const Candidate = require("../models/candidate.models");

module.exports = {
    createOneCandidate : async (data) => {
        const candidate = new Candidate(data);
        await candidate.save();
        return candidate
    },

    getOneCandidate : async (candidateId) => {
        const candidate = await Candidate.findById(candidateId);
        return candidate;
    },

    getCandidateWithVotes : async (candidateId) => {
        const candidate = await Candidate.findById(candidateId).populate("votes");
        return candidate;
    },

    async _linkVoteToCandidate(voteId, candidateId){
        // connect multiple events with categories
        await Candidate.updateMany(
            { _id:  candidateId },
            { $addToSet: { votes: voteId } }
        ).exec();
    },

    async _unlinkVoteFromCandidate(voteId, candidateId){
        // removes connection from events to categories
        await Category.updateMany(
            { _id:  candidateId },
            { $pull: { votes: voteId } }
        ).exec();
    }
}
