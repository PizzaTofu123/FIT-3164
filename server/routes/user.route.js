//for routing the api
const express = require("express");
const User = require("../models/user.models");
const router = express.Router();
const UserController = require("../controller/user.controller");

// create new user
router.post('/', UserController.createOneUser);

// return all users
router.get('/', UserController.getAllUser);

// get user by id
router.get('/:userId', UserController.getOneUser);

// get user specific forget password question
router.get('/forgetPassword', UserController.getForgetQue);
router.post('/forgetPassword', UserController.forgetPassword);

// update user by user id
router.put('/:userId', UserController.updateOneUser);

// delete user by user id
router.delete('/:userId', UserController.deleteOneUser);

// check-email route
router.post('/check-email', UserController.checkEmailExists);

router.post('/login', UserController.login);

router.post('/populate', UserController.populateUser);

router.post('/populateClub', UserController.populateClub);

module.exports = router;