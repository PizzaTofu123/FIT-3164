//for routing the api
const express = require("express");
const Vote = require("../models/vote.models");
const router = express.Router();
const voteController = require("../controller/vote.controller");


// create new vote
router.post('/', voteController.createOneVote);

// update one vote by vote id
router.put('/:voteId', voteController.updateVote);

// delete one vote by vote id
router.delete('/:voteId', voteController.deleteOneVote);
router.post('/populateVote', voteController.populateVote);

// get all votes by election ID
router.get('/election/:electionId', voteController.getVotesByElectionId);
router.post('/dumpVote', voteController.dumpVote);
module.exports = router;