//for routing the api
const express = require("express");
const Candidate = require("../models/candidate.models");
const router = express.Router();
const CandidateController = require("../controller/candidate.controller");



router.post('/', CandidateController.createOneCandidate);

router.get('/:id', CandidateController.getCandidateWithVotes);

router.put('/:id', CandidateController.updateOneCandidate);
router.delete('/:id', CandidateController.deleteOneCandidate);

module.exports = router;