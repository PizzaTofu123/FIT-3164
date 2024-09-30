//for routing the api
const express = require("express");
const Vote = require("../models/vote.models");
const router = express.Router();
const voteController = require("../controller/vote.controller");



router.post('/', voteController.createOneVote);
router.put('/:voteId', voteController.updateVote);
router.delete('/:voteId', voteController.deleteOneVote);
router.post('/populateVote', voteController.populateVote);
router.get('/election/:electionId', voteController.getVotesByElectionId);
router.post('/dumpVote', voteController.dumpVote);
module.exports = router;