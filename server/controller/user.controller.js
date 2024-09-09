// what happens when routed to the router
const User = require("../models/user.models");
const Club = require("../models/club.models");
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

    populateUser : async (req,res) =>{
        try{
            const levelArray = ["Undergraduate", "Postgraduate"];
            const faculties = ["Arts", "Business", "Economics", "Education", "Engineering", "IT", "Science", "Law", "Medicine", "Pharmacy"];
            function randomIntFromInterval(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            let userArray = [];
            for (let i = 1; i < 451; i++) {
                let level = levelArray[Math.floor(Math.random() * levelArray.length)];
                let faculty = faculties[Math.floor(Math.random() * faculties.length)];
                let salt = await bcrypt.genSalt();
                let password = await bcrypt.hash("clubmem" + i, salt);
                userArray.push({
                    firstName: "club",
                    lastName: "mem" + i,
                    studentId: randomIntFromInterval(11111111, 99999999),
                    passwordHash: password,
                    dob: new Date(),
                    age: randomIntFromInterval(17, 62),
                    email: "clubmem" + i + "@gmail.com",
                    clubs: ["66de83a667bdf5235649ef91"],
                    representingClubs: [],
                    level: level,
                    faculty: faculty,
                    course: level + " of " +faculty,
                    year: randomIntFromInterval(1, 4),
                })
            }
            await User.insertMany(userArray).then(function () {
                console.log("Data inserted") 
            }).catch(function (error) {
                console.log(error)     
            });
            const users = await userQueries.getAllUser();
            let memList = [];
            let repList = [];
            for (let i = 0; i < users.length; i ++){
                let user = users[i]
                memList.push(user._id);
                if (user.representingClubs){
                    repList.push(user._id)
                }
            }
            const club  = await Club.findByIdAndUpdate(req.body.clubId, {
                clubMembers: memList,
                clubRepresentatives: repList
            });
            res.status(200).json({message: "done"});

        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    populateClub: async (req,res) =>{
        try{
            const users = await userQueries.getAllUser();
            let memList = [];
            let repList = [];
            for (let i = 0; i < users.length; i ++){
                let user = users[i]
                memList.push(user._id);
                if (user.representingClubs){
                    repList.push(user._id)
                }
            }
            const club  = await Club.findByIdAndUpdate(req.body.clubId, {
                clubMembers: memList,
                clubRepresentatives: repList
            });
            res.status(200).json({message:"Done"});
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