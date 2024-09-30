//for routing the api
const express = require("express");
const Club = require("../models/club.models");
const router = express.Router();
const ClubController = require("../controller/club.controller");



router.post('/', ClubController.createOneClub);
router.post('/populate', ClubController.populateClub);

router.put('/:clubId', ClubController.updateOneClub);

router.get('/:clubId', ClubController.getOneClub);
router.get('/', ClubController.getAllClub);
router.get('/checkElection', ClubController.checkElection);

router.delete('/:clubId', ClubController.deleteOneClub);

router.put('/members/add/:clubId', ClubController.addMember);
router.put('/members/delete/:clubId', ClubController.deleteMember);
router.put('/representatives/add/:clubId', ClubController.addRepresentative);
router.put('/representatives/delete/:clubId', ClubController.deleteRepresentative);

router.put('/election/start/:clubId', ClubController.startElection); 
router.put('/election/schedule/:clubId', ClubController.scheduleElection); 



module.exports = router;