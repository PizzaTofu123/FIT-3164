// what happens when routed to the router
// what happens when routed to the router
const Candidate = require("../models/candidate.models");
const candidateQueries = require("../queries/candidate.queries");
module.exports = {
    createOneCandidate : async (req,res) =>
    {
        
        try {
            //const user  = await User.create(req.body);
            const candidate = await candidateQueries.createOneCandidate({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                description: req.body.description,
                electionId: req.body.electionId,
                image: req.body.image
            })
            res.status(200).json(candidate);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },
    getOneCandidate : async (req,res) =>
        {
            try {
                //get id from ref
                //may change this to req.body soon ?
                const {candidateId}  = req.params;
                const candidate  = await candidateQueries.getOneCandidate(candidateId);
                if (!candidate){
                    res.status(500).json({message : `Candidate with id ${candidateId} not found`});
                }
                res.status(200).json(candidate);
            }
            catch (error){
                //status 500 means error
                res.status(500).json({message:error.message});
            }
        },
        
    updateOneCandidate : async (req,res) =>{
    try {
        //get id from req params instantly
        const {candidateId}  = req.params;
        const candidate  = await Candidate.findByIdAndUpdate(candidateId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            description: req.body.description,
            image: req.body.image
            });

        if (!candidate){
            return res.status(500).json({message : `Candidate with id ${candidateId} not found`});
        }

        const updated = await Candidate.findById(candidateId);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteOneCandidate : async (req,res) =>{
        try {
            const {id}  = req.params;
            console.log("crot");
            const candidate = await candidateQueries.deleteOneCandidate(id);
            if (candidate) {
                res.status(200).json({message: `deleted candidate with id: ${id}`});
            } else {
                res.status(500).json({message : 'Candidate not found'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    getCandidateWithVotes : async (req,res) =>{
        try {
            const {id}  = req.params;
            const candidate  = await candidateQueries.getCandidateWithVotes(id);
    
            if (!candidate){
                return res.status(500).json({message : 'Candidate not found'});
            }
            
            res.status(200).json({message: `deleted candidate with id: ${id}`});

        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },
}
