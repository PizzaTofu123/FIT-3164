const Election = require("../models/election.model");
const electionQueries = require("../queries/election.queries");
module.exports = {
    createElection : async (req,res) =>
    {
        try {

            const election = await electionQueries.createElection({
                electionStartDate: req.body.startDate,
                electionEndDate: req.body.endDate,
                // might need tuing not 100 percent sure
                representatives: req.body.representatives,
                candidates: req.body.candidates
            })
            res.status(200).json(election);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    getAllElections : async (req,res) =>
    {
        try {
            //use curlies cus find multiple users
            const election  = await electionQueries.getAllElections();
            res.status(200).json(election);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    getElection : async (req,res) =>
        {
            try {
                //get id from ref
                //may change this to req.body soon ?
                const {id}  = req.params;
                const election  = await electionQueries.getElection(id);
                if (!election){
                    res.status(500).json({message : `Election with id ${id} not found`});
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
        const {id}  = req.params;
        const election  = await Election.findByIdAndUpdate(id, req.body);

        if (!election){
            return res.status(500).json({message : `Election with id ${id} not found`});
        }

        const updated = await Election.findById(id);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteElection : async (req,res) =>{
        try {
            const {id}  = req.params;
            const election = await Election.findByIdAndDelete(id);
    
            if (!election){
                return res.status(500).json({message : 'Election not found'});
            }
            res.status(200).json({message: `deleted election with id: ${id}`});
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },
    
    getDaysRemaining : async(req,res) => {
        try {
            const {id} = req.params;
            const election = await Election.findById(id);

            if (!election){
                return res.status(500).json({message : 'Election not found'});
            }

            const currentTime = new Date();
            const endTime = new Date(election.endDate);
            
            const timeDiff = endTime - currentTime;
    
            if (timeDiff <= 0) {
                return res.status(200).json({ message: 'Election has ended' });
            }
    
            // Calculate days, hours, minutes, and seconds remaining
            const daysRemaining = Math.floor(timeDiff / (3600000 * 24));
            const hoursRemaining = Math.floor((timeDiff % (3600000 * 24)) / (3600000));
            const minutesRemaining = Math.floor((timeDiff % (3600000)) / (60000));
            const secondsRemaining = Math.floor((timeDiff % (60000)) / 1000);
    
            // Return the result
            res.status(200).json({
                days: daysRemaining,
                hours: hoursRemaining,
                minutes: minutesRemaining,
                seconds: secondsRemaining
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    
}