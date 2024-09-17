const Candidate = require("../models/candidate.models");
const mainQueries = require("./main.queries");

const candidateQueries = {
    createOneCandidate : async (data) => {
        const candidate = new Candidate(data);
        await candidate.save();
        await mainQueries.elections._linkCandidateToElection(data.electionId, candidate._id);
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
        await Candidate.updateMany(
            { _id:  candidateId },
            { $addToSet: { votes: voteId } }
        ).exec();
        await this.addVoteCount(candidateId);
    },

    async _unlinkVoteFromCandidate(voteId, candidateId){
        await Candidate.updateMany(
            { _id:  candidateId },
            { $pull: { votes: voteId } }
        ).exec();
        await this.decreaseVoteCount(candidateId);
    },

    async addVoteCount(candidateId){
        const candidate = await Candidate.findById(candidateId).exec();
        if (candidate){
            candidate.voteCount += 1;
            await candidate.save();  
        }
    },

    async decreaseVoteCount(candidateId){
        const candidate = await Candidate.findById(candidateId).exec();
        if (candidate){
            candidate.voteCount -= 1;
            await candidate.save();  
        }
    },

    deleteOneCandidate : async (candidateId) =>{
        const candidate = await Candidate.findByIdAndDelete(candidateId);
        if (candidate) {
            for(let voteId of candidate.votes){
                await mainQueries.votes.deleteOneVote(voteId);
            }
            await mainQueries.elections._unlinkCandidateToElection(candidate.electionId, candidate._id);
            return candidate;
        } else {
            return null;
        }
    }
}

mainQueries.candidates = candidateQueries;
module.exports = candidateQueries;
