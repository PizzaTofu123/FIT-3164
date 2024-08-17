const Vote = require("../models/vote.models");

module.exports = {
    createOneVote : async (data) => {
        const vote = new Vote(data);
        await vote.save();
        return vote;
    },
    updateVote : async (voteId, data) => {
        const vote  = await User.findByIdAndUpdate(voteId, req.body);
        return vote;
    }
}
