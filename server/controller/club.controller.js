// what happens when routed to the router

const Club = require("../models/club.models");
const clubQueries = require("../queries/club.queries");

module.exports = {
    createOneClub : async (req,res) =>
    {
        try {
            //const user  = await User.create(req.body);
            const club = await clubQueries.createOneClub({
                clubName: req.body.clubName,
                clubDescription: req.body.clubDescription
            })
            res.status(200).json(club);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },
    getOneClub : async (req,res) =>
        {
            try {
                //get id from ref
                //may change this to req.body soon ?
                const {clubId}  = req.params;
                const club  = await clubQueries.getOneCandidate(clubId);
                if (!club){
                    res.status(500).json({message : `Candidate with id ${clubId} not found`});
                }
                res.status(200).json(club);
            }
            catch (error){
                //status 500 means error
                res.status(500).json({message:error.message});
            }
        },
        
    updateOneClub : async (req,res) =>{
    try {
        //get id from req params instantly
        const {clubId}  = req.params;
        const club  = await Club.findByIdAndUpdate(clubId, {
            clubName: req.body.clubName,
            clubDescription: req.body.clubDescription
            });

        if (!club){
            return res.status(500).json({message : `Club with id ${clubId} not found`});
        }

        const updated = await Club.findById(clubId);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    getAllClub : async (req,res) =>
    {
        try {
            //use curlies cus find multiple users
            const club  = await clubQueries.getAllUser();
            res.status(200).json(club);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    deleteOneClub : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const club = await clubQueries.deleteOneCandidate(clubId);
            if (club) {
                res.status(200).json({message: `deleted club with id: ${clubId}`});
            } else {
                res.status(500).json({message : 'Club not found'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    }
}