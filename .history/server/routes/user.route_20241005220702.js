//for routing the api
const express = require("express");
const User = require("../models/user.models");
const router = express.Router();
const UserController = require("../controller/user.controller");

router.post('/', UserController.createOneUser);

router.get('/', UserController.getAllUser);
router.get('/:userId', UserController.getOneUser);

router.get('/forgetPassword', UserController.getForgetQue);
router.post('/forgetPassword', UserController.forgetPassword);

router.put('/:userId', UserController.updateOneUser);

router.put('/:userId/setRecoveryCode', UserController.setRecoveryCode)

router.delete('/:userId', UserController.deleteOneUser);

// check-email route
router.post('/check-email', UserController.checkEmailExists);

router.post('/login', UserController.login);

router.post('/populate', UserController.populateUser);
router.post('/populateClub', UserController.populateClub);

module.exports = router;