const Election = require("../models/election.model");
const candidateQueries = require("../queries/candidate.queries");
const electionQueries = require("../queries/election.queries");
const userQueries = require("../queries/user.queries");

module.exports = {
    createElection : async (req,res) =>
    {
        try {
            if (req.body.electionStartDate > req.body.electionEndDate) {
                res.status(200).json({message: "Start date needs to be earlier than end date"});
            } else {
                const election = await electionQueries.createElection({
                    electionName: req.body.electionName,
                    electionStartDate: req.body.electionStartDate,
                    electionEndDate: req.body.electionEndDate,
                    club: req.body.club,
                    candidates: req.body.candidates 
                })
                res.status(200).json(election);
            }
        }
        catch (error){
            //status 500 means error
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

    deleteElection : async (req,res) =>{
        try {
            const {electionId}  = req.params;
            const election = await Election.findByIdAndDelete(electionId);
    
            if (!election){
                return res.status(500).json({message : 'Election not found'});
            }
            res.status(200).json({message: `deleted election with id: ${electionId}`});
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
    },

    addCandidateToElection : async(req,res) => {
        try {
            const {electionId , candidateId} = req.params;
            const election = await electionQueries.findById(electionId);
            if (!election){
                res.status(500).json({message : `Election with id ${electionId} not found`});
            }

            const candidate = await candidateQueries.findById(candidateId);
            if (!candidate){
                res.status(500).json({message : `Candidate with id ${candidateId} not found`});
            }
            
            // Add the candidate to the election's candidates array if not already added
            if (!election.candidates.includes(candidate)) {
                election.candidates.push(candidateId);
                await election.save();
                return res.status(200).json({ message: 'Candidate added successfully', election });
            } else {
                return res.status(400).json({ message: 'Candidate already in the election' });
            }

        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    removeCandidatefromElection : async(req,res) => {
        try {
            const {electionId , candidateId} = req.params;
            const election = await electionQueries.findById(electionId);
            if (!election){
                res.status(500).json({message : `Election with id ${electionId} not found`});
            }
            
            const candidate = await candidateQueries.findById(candidateId);
            if (!candidate){
                res.status(500).json({message : `Candidate with id ${candidateId} not found`});
            }

            // Check if the candidate exists in the election's candidates array
            const candidateIndex = election.candidates.indexOf(candidateId);
            if (candidateIndex === -1) {
                return res.status(404).json({ message: `Candidate with id ${candidateId} not found` });
            }

            // Remove the candidate from the array
            election.candidates.splice(candidateIndex, 1);
            await election.save();

            return res.status(200).json({ message: `Candidate with id ${candidateId} removed successfully`, election });

        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }, 

    addRepresentativeToElection : async(req,res) => {
        try {
            const {electionId , representativeId} = req.params;
            const election = await electionQueries.findById(electionId);
            if (!election){
                res.status(500).json({message : `Election with id ${electionId} not found`});
            }

            const representative = await userQueries.findById(representativeId);
            if (!representative){
                res.status(500).json({message : `Representative with id ${representativeId} not found`});
            }

            if(representative.isRepresentative == false){
                res.status(500).json({message : `User with id ${representativeId} is not a representative`});
            }
            
            // Add the candidate to the election's candidates array if not already added
            if (!election.representatives.includes(representativeId)) {
                election.representatives.push(representativeId);
                await election.save();
                return res.status(200).json({ message: 'Representative added successfully', election });
            } else {
                return res.status(400).json({ message: 'Representative already in the election' });
            }

        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    removeRepresentativefromElection : async(req,res) => {
        try {
            const {electionId , representativeId} = req.params;
            const election = await electionQueries.findById(electionId);
            if (!election){
                res.status(500).json({message : `Election with id ${electionId} not found`});
            }

            const representative = await userQueries.findById(representativeId);
            if (!representative){
                res.status(500).json({message : `Representative with id ${representativeId} not found`});
            }

            if(representative.isRepresentative == false){
                res.status(500).json({message : `User with id ${representativeId} is not a representative`});
            }

            // Check if the candidate exists in the election's candidates array
            const representativeIndex = election.representatives.indexOf(representativeId);
            if (representativeIndex === -1) {
                return res.status(404).json({ message: `Representative with id ${representativeId} not found` });
            }

            // Remove the candidate from the array
            election.representatives.splice(representativeIndex, 1);
            await election.save();

            return res.status(200).json({ message: `Representative with id ${representativeId} removed successfully`, election });

        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }


    
}