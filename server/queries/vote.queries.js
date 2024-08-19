const Vote = require("../models/vote.models");
const candidateQueries = require("../queries/candidate.queries");

module.exports = {
    createOneVote : async (data) => {
        const vote = new Vote(data);
        await vote.save();
        await candidateQueries._linkVoteToCandidate(vote._id, data.candidateId);
        return vote;
    },
    updateVote : async (voteId, data) => {
        const oldVote  = await User.findById(voteId);
        if (!oldVote){
            return res.status(500).json({message : `Vote with id ${id} not found`});
        }
        await candidateQueries._unlinkVoteFromCandidate(VoteId, oldVote.candidateId);
        const updated = await User.findByIdAndUpdate(voteId,data.candidateId);
        await candidateQueries._linkVoteToCandidate(voteId, data.candidateId);
        return updated;
    }
}
