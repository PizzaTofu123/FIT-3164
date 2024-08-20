const express = require('express')
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user.models.js');
const UserRouter = require('./routes/user.route.js');
const VoteRouter = require('./routes/vote.route.js');
const CandidateRouter = require('./routes/candidate.route.js');
const env = require('dotenv');
env.config({path: './config/.env'});

//middleware because not allowed to pass json through
//node js by default
app.use(express.json());
//to allow form nd stuff
app.use(express.urlencoded({extended: false}));

// routes for user
app.use("/api/users", UserRouter);

// routes for vote
app.use("/api/votes", VoteRouter);

// routes for vote
app.use("/api/candidates", CandidateRouter);

app.get('/', (req,res) => {
    res.send("testicles");
});

app.get('/api', async (req,res) => {
    try {
        //use curlies cus find multiple users
        const user  = await User.find({});
        res.status(200).json(user);
    }
    catch (error){
        //status 500 means error
        res.status(500).json({message:error.message});
    }
});


//before routing nd controlling
/*
//Before routing nd controlling:

//what ever the client sends is a request
//what ever the server sends is a response
//needs async because await to create a user object
app.post('/api/users', async (req,res) =>
{
    try {
        const user  = await User.create(req.body);
        res.status(200).json(user);
    }
    catch (error){
        //status 500 means error
        res.status(500).json({message:error.message});
    }
});

// get all users
app.get('/api/users', async (req,res) =>
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
});
   
// get single user
app.get('/api/users/:id', async (req,res) =>
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
});

//update 1 entry
app.put('/api/users/:id', async (req,res) =>{
    try {
        //get id from req params instantly
        const {id}  = req.params;
        const user  = await User.findByIdAndUpdate(id, req.body);

        if (!user){
            return res.status(500).json({message : 'User not found'});
        }

        const updated = await User.findById(id);
        res.status(200).json(updated);
    }
    catch (error){
        res.status(500).json({message:error.message});
    }
});

//delete
app.delete('/api/users/:id', async (req,res) =>{
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
});
*/    

//put in connection string

mongoose.connect(process.env.MONGOOSE_URI)
.then(()=> {
    //database connected, then the server is running
    console.log("connected");
    app.listen(5000, () => {
        console.log("listening")
    });
})
.catch((e) => { console.log(e);});

