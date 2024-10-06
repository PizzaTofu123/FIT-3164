//for routing the api
const express = require("express");
const UserElectionFlag = require("../models/user.election.flag.models");
const router = express.Router();
const UserElectionFlagController = require("../controller/user.election.flag.controller");

router.post('/', UserElectionFlagController.createOneFlag);
router.get('/:electionId/:userId', UserElectionFlagController.getFlag);
router.delete('/:electionId/:userId', UserElectionFlagController.deleteFlag);

module.exports = router;