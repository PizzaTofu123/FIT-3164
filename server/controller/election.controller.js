const Election = require("../models/election.model");
const candidateQueries = require("../queries/candidate.queries");
const electionQueries = require("../queries/election.queries");
const userQueries = require("../queries/user.queries");
const mainQueries = require("../queries/main.queries");

module.exports = {
    createElection : async (req,res) =>
    {
        try {
            const club = await mainQueries.clubs.getOneClub(req.body.club);
            if (!club){
                res.status(200).json({message: "club not found"});
            }
            else {
                let flag = club.electionOngoingFlag;
                if (flag){
                    const election = await electionQueries.createElection({
                        electionName: req.body.electionName,
                        club: req.body.club,
                        candidates: req.body.candidates 
                    })
                    res.status(200).json(election);
                }
                else {
                    res.status(200).json({message: "no election ongoing"});
            }

            }
            
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    getAllElection : async (req,res) =>
    {
        try {
            //use curlies cus find multiple users
            const election  = await electionQueries.getAllElection();
            res.status(200).json(election);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    getOneElection : async (req,res) =>
        {
            try {
                //get id from ref
                //may change this to req.body soon ?
                const {electionId}  = req.params;
                const election  = await electionQueries.getOneElection(electionId);
                if (!election){
                    res.status(500).json({message : `Election with id ${electionId} not found`});
                }
                res.status(200).json(election);
            }
            catch (error){
                //status 500 means error
                res.status(500).json({message:error.message});
            }
        },
        
    updateElection : async (req,res) =>{
    try {
        //get id from req params instantly
        const {electionId}  = req.params;
        const election  = await Election.findByIdAndUpdate(electionId, req.body);

        if (!election){
            return res.status(500).json({message : `Election with id ${electionId} not found`});
        }

        const updated = await Election.findById(electionId);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteOneElection : async (req,res) =>{
        try {
            const {electionId}  = req.params;
            const election = await electionQueries.deleteOneElection(electionId);
    
            if (!election){
                return res.status(500).json({message : 'Election not found'});
            }
            res.status(200).json({message: `deleted election with id: ${electionId}`});
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    }
}