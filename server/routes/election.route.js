//for routing the api
const express = require("express");
const Election = require("../models/election.model");
const router = express.Router();
const ElectionController = require("../controller/election.controller");


// create new election
router.post('/', ElectionController.createElection);

// return all elections
router.get('/', ElectionController.getAllElection);

// get election by election id
router.get('/:electionId', ElectionController.getOneElection);

// update election by election id
router.put('/:electionId', ElectionController.updateElection);

// delete election by election id
router.delete('/:electionId', ElectionController.deleteOneElection);

module.exports = router;