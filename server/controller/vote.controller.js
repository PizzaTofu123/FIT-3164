// what happens when routed to the router

const Vote = require("../models/vote.models");
const voteQueries = require("../queries/vote.queries");
const flagController = require("../controller/user.election.flag.controller");

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
            await flagController.createOneFlag({
                userId: req.body.userId,
                electionId: req.body.electionId
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
        const {voteId}  = req.params;
        const vote  = await voteQueries.updateVote(voteId, {
            candidateId: req.body.candidateId
        })

        if (!vote){
            res.status(500).json({message : `Vote with id ${voteId} not found`});
        }

        const updated = await Vote.findById(voteId);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },
    deleteOneVote : async (req,res) =>{
        try {
            const {voteId}  = req.params;
            const vote = await voteQueries.deleteOneVote(voteId);
            if (vote) {
                res.status(200).json({message: `deleted vote with id: ${voteId}`});
            } else {
                res.status(500).json({message : 'Vote not found'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    }

}