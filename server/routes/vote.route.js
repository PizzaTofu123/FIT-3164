//for routing the api
const express = require("express");
const Vote = require("../models/vote.models");
const router = express.Router();
const voteController = require("../controller/vote.controller");



router.post('/', voteController.createOneVote);
router.put('/:id', voteController.updateVote);
router.delete('/:id', voteController.deleteOneVote);


module.exports = router;