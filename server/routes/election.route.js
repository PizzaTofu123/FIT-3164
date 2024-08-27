//for routing the api
const express = require("express");
const Election = require("../models/election.model");
const router = express.Router();
const ElectionController = require("../controller/election.controller");



router.post('/', ElectionController.createElection);

router.get('/', ElectionController.getAllElection);
router.get('/:electionId', ElectionController.getOneElection);

router.put('/:electionId', ElectionController.updateElection);
router.delete('/:electionId', ElectionController.deleteElection);

module.exports = router;