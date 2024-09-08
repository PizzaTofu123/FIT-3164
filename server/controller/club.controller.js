// what happens when routed to the router

const Club = require("../models/club.models");
const clubQueries = require("../queries/club.queries");

module.exports = {
    createOneClub : async (req,res) =>
    {
        try {
            const club = await clubQueries.createOneClub({
                clubName: req.body.clubName,
                clubDescription: req.body.clubDescription,
                clubRepresentatives: req.body.clubRepresentatives,
                clubMembers: req.body.clubMembers,
                memberEmailList: req.body.memberEmailList,
                representativeEmailList: req.body.representativeEmailList,
                image: req.body.image
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
                const club  = await clubQueries.getOneClub(clubId);
                if (!club){
                    res.status(500).json({message : `Club with id ${clubId} not found`});
                }
                else{
                    res.status(200).json(club);
                }
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
            await clubQueries.endElection();
            //use curlies cus find multiple users
            const club  = await clubQueries.getAllClub();
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
            const club = await clubQueries.deleteOneClub(clubId);
            if (club) {
                res.status(200).json({message: `deleted club with id: ${clubId}`});
            } else {
                res.status(500).json({message : 'Club not found'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    addMember : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const member = await clubQueries.addMember(req.body.userId, clubId);
            if (member) {
                res.status(200).json({message: `added member with id: ${member}`});
            } else {
                res.status(500).json({message : 'Member not added'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteMember : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const member = await clubQueries.deleteMember(req.body.userId, clubId);
            if (member) {
                res.status(200).json({message: `deleted member with id: ${member}`});
            } else {
                res.status(500).json({message : 'Member not deleted'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    addRepresentative : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const member = await clubQueries.addRepresentative(req.body.userId, clubId);
            if (member) {
                res.status(200).json({message: `added rep with id: ${member}`});
            } else {
                res.status(500).json({message : 'Rep not added'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteRepresentative : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const member = await clubQueries.deleteRepresentative(req.body.userId, clubId);
            if (member) {
                res.status(200).json({message: `deleted rep with id: ${member}`});
            } else {
                res.status(500).json({message : 'Rep not added'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    startElection : async (req,res) =>{
        try {
            if (req.body.electionStartDate > req.body.electionEndDate) {
                res.status(200).json({message: "Start date needs to be earlier than end date"});
            } else {
                const {clubId}  = req.params;
                const club  = await Club.findByIdAndUpdate(clubId, {
                    electionOngoingFlag: true,
                    electionStartDate: req.body.electionStartDate,
                    electionEndDate: req.body.electionEndDate
                    });
        
                if (!club){
                    return res.status(500).json({message : `Club with id ${clubId} not found`});
                }
        
                const updated = await Club.findById(clubId);
                res.status(200).json(updated);
            }
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },
}

