// what happens when routed to the router
const User = require("../models/user.models");
const userQueries = require("../queries/user.queries");
const mainQueries = require("../queries/main.queries");
const bcrypt = require('bcrypt');

module.exports = {
    createOneUser : async (req,res) =>
    {
        try {
            const inClub = await mainQueries.clubs.checkMemberAndRepresentativeUsingEmail(req.body.email, req.body.clubs, req.body.representingClubs);
            if(!inClub){
                res.status(200).json({message: "Wrong club/representative input"});
            }
            else {
                birthDate = Math.floor((new Date() - new Date(req.body.dob).getTime()) / 3.15576e+10) // 3.115576 is miliseconds
                const salt = await bcrypt.genSalt();
                const password = await bcrypt.hash(req.body.passwordHash, salt);
                const user = await userQueries.createOneUser({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    studentId: req.body.studentId,
                    passwordHash: password,
                    dob: req.body.dob,
                    age: birthDate,
                    email: req.body.email,
                    clubs: req.body.clubs,
                    representingClubs: req.body.representingClubs,
                    level: req.body.level,
                    faculty: req.body.faculty,
                    course: req.body.course,
                    year: req.body.year,
                })
                await mainQueries.clubs._linkUserToClubs(user._id, user.clubs, user.representingClubs);
                res.status(200).json(user);
            }
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    getAllUser : async (req,res) =>
    {
        try {
            //use curlies cus find multiple users
            const user  = await userQueries.getAllUser();
            res.status(200).json(user);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    getOneUser : async (req,res) =>
        {
            try {
                //get id from ref
                //may change this to req.body soon ?
                const {userId}  = req.params;
                const user  = await userQueries.getOneUser(userId);
                if (!user){
                    res.status(500).json({message : `User with id ${userId} not found`});
                }
                res.status(200).json(user);
            }
            catch (error){
                //status 500 means error
                res.status(500).json({message:error.message});
            }
        },
        
    updateOneUser : async (req,res) =>{
    try {
        //get id from req params instantly
        const {userId}  = req.params;
        const user  = await User.findByIdAndUpdate(userId, req.body);

        if (!user){
            return res.status(500).json({message : `User with id ${userId} not found`});
        }

        const updated = await User.findById(userId);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteOneUser : async (req,res) =>{
        try {
            const {userId}  = req.params;
            const user = await User.findByIdAndDelete(userId);
            if (user) {
                await mainQueries.clubs._unlinkUserToClubs(userId, user.clubs, user.representingClubs);
                
                res.status(200).json({message: `deleted user with id: ${userId}`});
            } else {
                res.status(500).json({message : 'User not found'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    
    login : async (req,res) =>{
        try {
            const user = await User.findOne({ email:req.body.email }).exec();
            if (user) {
                let flag = await bcrypt.compare(req.body.password, user.passwordHash);
                res.status(200).json(flag);
            } else {
                res.status(200).json(false);
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },
}

//or
/*
const User = require("../models/user.models");
const getAllUser = async (req,res) =>
{
    try {
        //use curlies cus find multiple users
        const user  = await User.find({});
        res.status(200).json(user);
    }
    catch (error){
        //status 500 means error
        res.status(500).json({message:error.message});
    }
};

const getOneUser = async (req,res) =>
    {
        try {
            //get id
            const {id}  = req.params;
            const user  = await User.findById(id);
            res.status(200).json(user);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    };

module.exports = {
    getAllUser,
    getOneUser
}
*/