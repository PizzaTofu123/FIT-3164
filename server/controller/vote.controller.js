// what happens when routed to the router
// what happens when routed to the router
const Vote = require("../models/vote.models");
const voteQueries = require("../queries/vote.queries");
module.exports = {
    createOneVote : async (req,res) =>
    {
        try {
            //const user  = await User.create(req.body);
            const vote = await voteQueries.createOneVote({
                userId: req.body.userId,
                electionId: req.body.electionId,
                candidateId: req.body.candidateId
            })
            res.status(200).json(vote);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },
        
    updateVote : async (req,res) =>{
    try {
        //get id from req params instantly
        const {id}  = req.params;
        const vote  = await voteQueries.updateVote(id, {
            candidateId: req.body.candidateId
        })

        if (!vote){
            return res.status(500).json({message : `Vote with id ${id} not found`});
        }

        const updated = await Vote.findById(id);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    }
}