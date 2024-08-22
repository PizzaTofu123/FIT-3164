const express = require("express");
const Election = require("../models/election.models");
const router = express.Router();
const ElectionController = require("../controller/election.controller");

router.post('/addElection/', ElectionController.createElection);

router.get('/getAllElections/', ElectionController.getAllElections);
router.get('/getElection/:id', ElectionController.getElection);
router.get('/getElectionDaysRemaining/:id', ElectionController.getDaysRemaining);

router.put('/updateElection/:id', ElectionController.updateElection);
router.delete('/removeElection/:id', ElectionController.deleteElection);

// Candidate
router.post('/addCandidateToElection/:electionId/:candidateId',ElectionController.addCandidateToElection);
router.delete('/removeCandidateFromElection/:electionId/:candidateId',ElectionController.removeCandidatefromElection);

// Representatives
router.post('/addRepresentativeToElection/:electionId/:representativeId', ElectionController.addRepresentativeToElection);
router.delete('/removeRepresentativeFromElection/:electionId/:representativeId', ElectionController.removeRepresentativefromElection);

module.exports = router;