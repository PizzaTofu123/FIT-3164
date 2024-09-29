const Vote = require("../models/vote.models");
const mainQueries = require("./main.queries");
const ObjectId = require('mongodb').ObjectId; 

const voteQueries = {
    createOneVote : async (data) => {
        const vote = new Vote(data);
        await vote.save();
        await mainQueries.candidates._linkVoteToCandidate(vote._id, data.candidateId);
        return vote;
    },
    updateVote : async (voteId, data) => {
        const oldVote  = await Vote.findById(voteId);
        if (!oldVote){
            return res.status(500).json({message : `Vote with id ${id} not found`});
        }
        await mainQueries.candidates._unlinkVoteFromCandidate(voteId, oldVote.candidateId);

        const updated = await Vote.findByIdAndUpdate(voteId,data.candidateId);
        await mainQueries.candidates._linkVoteToCandidate(voteId, data.candidateId);
        
        return updated;
    },
    deleteOneVote : async (voteId) => {
        const vote = await Vote.findByIdAndDelete(voteId);
        mainQueries.candidates._unlinkVoteFromCandidate(voteId, vote.candidateId);
        return vote;
    },

    getVotesByElectionId : async (electionId) => {

            votesOId = new ObjectId(electionId)
            // Mongoose query to find votes by electionId and populate associated fields
            const votes = await Vote.find({electionId: votesOId});
            return votes

    }


}

mainQueries.votes = voteQueries;
module.exports = voteQueries;
