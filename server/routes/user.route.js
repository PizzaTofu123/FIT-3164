//for routing the api
const express = require("express");
const User = require("../models/user.models");
const router = express.Router();
const UserController = require("../controller/user.controller");



router.post('/', UserController.createOneUser);

router.get('/', UserController.getAllUser);
router.get('/:userId', UserController.getOneUser);

router.put('/:userId', UserController.updateOneUser);
router.delete('/:userId', UserController.deleteOneUser);

router.post('/login', UserController.login);

router.post('/populate', UserController.populateUser);
router.post('/populateClub', UserController.populateClub);

module.exports = router;