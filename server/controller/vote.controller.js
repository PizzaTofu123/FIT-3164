// what happens when routed to the router

const Vote = require("../models/vote.models");
const voteQueries = require("../queries/vote.queries");
const mainQueries = require("../queries/main.queries");

module.exports = {
    createOneVote : async (req,res) =>
    {
        if (req.body.anonymous = true){
            try {
                //const user  = await User.create(req.body);
                const vote = await voteQueries.createOneVote({
                    electionId: req.body.electionId,
                    candidateId: req.body.candidateId,
                    level: req.body.level,
                    faculty: req.body.faculty,
                    secondFaulcty: req.body.secondFaulcty,
                    course: req.body.course,
                    year: req.body.year,
                })
                await mainQueries.userElectionFlags.createFlag({
                    userId: req.body.userId,
                    electionId: req.body.electionId
                })
                res.status(200).json(vote);
            }
            catch (error){
                //status 500 means error
                res.status(500).json({message:error.message});
            }
        }
        else {
            try {
                //const user  = await User.create(req.body);
                const vote = await voteQueries.createOneVote({
                    userId: req.body.userId,
                    electionId: req.body.electionId,
                    candidateId: req.body.candidateId
                })
                await mainQueries.userElectionFlags.createFlag({
                    userId: req.body.userId,
                    electionId: req.body.electionId
                })
                res.status(200).json(vote);
            }
            catch (error){
                //status 500 means error
                res.status(500).json({message:error.message});
            }
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
            await mainQueries.userElectionFlags.deleteFlag(vote.userId, vote.electionId);
        }
        catch (error){
            res.status(500).json({message:error.message});
        }

    },

    getVoteOfCurrentUser : async (req,res) =>{
        try {
            userId= req.body.userId;
            electionId= req.body.electionId;
            const vote = await Vote.find({userId, electionId})
            if (vote) {
                res.status(200).json(vote);
            } else{
                if (mainQueries.userElectionFlags.getFlag(userId,electionId)){
                    res.status(200).json({message : 'Voted anonymously'});
                }
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    populateVote: async (req,res) =>{
        try{
            const elections = await mainQueries.elections.getAllElection();
            const users = await mainQueries.users.getAllUser();
            for (let i = 0; i < elections.length; i ++){
                let election = elections[i];
                let candidates = election.candidates;
                for (let i = 0; i < users.length; i ++){
                    let user = users[i];
                    let chosen_candidate = candidates[Math.floor(Math.random() * candidates.length)];
                    const vote = await voteQueries.createOneVote({
                        electionId: election._id,
                        candidateId: chosen_candidate,
                        level: user.level,
                        faculty: user.faculty,
                        secondFaulcty: user.secondFaulcty,
                        course: user.course,
                        year: user.year
                    })
                    await mainQueries.userElectionFlags.createFlag({
                        userId: user._id,
                        electionId: election._id
                    })
                }
            }
            res.status(200).json({message: "done"});
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },  

}