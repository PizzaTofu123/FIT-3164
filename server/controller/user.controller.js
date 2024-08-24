// what happens when routed to the router
// what happens when routed to the router
const User = require("../models/user.models");
const userQueries = require("../queries/user.queries");
module.exports = {
    createOneUser : async (req,res) =>
    {
        try {
            //const user  = await User.create(req.body);
            birthDate = Math.floor((new Date() - new Date(req.body.dob).getTime()) / 3.15576e+10) // 3.115576 is miliseconds
            const user = await userQueries.createOneUser({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                studentId: req.body.studentId,
                passwordHash: req.body.passwordHash,
                representativeOfClubs: req.body.representativeOfClubs,
                dob: req.body.dob,
                age: birthDate,
                clubs: req.body.clubs
            })
            res.status(200).json(user);
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
                const {id}  = req.params;
                const user  = await userQueries.getOneUser(id);
                if (!user){
                    res.status(500).json({message : `User with id ${id} not found`});
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
        const {id}  = req.params;
        const user  = await User.findByIdAndUpdate(id, req.body);

        if (!user){
            return res.status(500).json({message : `User with id ${id} not found`});
        }

        const updated = await User.findById(id);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteOneUser : async (req,res) =>{
        try {
            const {id}  = req.params;
            const user = await User.findByIdAndDelete(id);
    
            if (!user){
                return res.status(500).json({message : 'User not found'});
            }
            res.status(200).json({message: `deleted user with id: ${id}`});
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    }

    
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