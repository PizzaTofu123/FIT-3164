// what happens when routed to the router
const UserElectionFlag = require("../models/user.election.flag.models");
const User = require("../models/user.models");
const userElectionFlagQueries = require("../queries/user.election.flag.queries");
module.exports = {
    createOneFlag : async (req,res) =>
    {
        try {
            const userId = req.body.userId;
            const electionId = req.body.electionId;
            const test = await userElectionFlagQueries.getFlag(userId,electionId);
            if (!test){
                const flag = await userElectionFlagQueries.createFlag({
                    userId: userId,
                    electionId: electionId
                })
                res.status(200).json(flag);
            }
            else {
                res.status(200).json({message : `Flag with user id ${userId} in election id ${electionId} not found`});
            }
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    getFlag : async (req,res) =>
    {
        try {
            //use curlies cus find multiple users
            const flag = await userElectionFlagQueries.getFlag(req.body.userId, req.body.electionId);
            if (flag.length == 0){
                res.status(200).json(false);
            }
            else {
                res.status(200).json(true);
            }
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    deleteFlag : async (req,res) =>
    {
        try {
            const flag  = await userElectionFlagQueries.deleteFlag(req.body.userId, req.body.electionId);
            if (!flag){
                res.status(500).json({message : `Flag not found`});
            }
            res.status(200).json(flag);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    }
}
