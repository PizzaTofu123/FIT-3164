//for routing the api
const express = require("express");
const Candidate = require("../models/candidate.models");
const router = express.Router();
const CandidateController = require("../controller/candidate.controller");



router.post('/', CandidateController.createOneCandidate);

router.get('/:candidateId', CandidateController.getCandidateWithVotes);

router.put('/:candidateId', CandidateController.updateOneCandidate);
router.delete('/:candidateId', CandidateController.deleteOneCandidate);

module.exports = router;