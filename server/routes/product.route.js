//for routing the api
const express = require("express");
const User = require("../models/user.models");
const router = express.Router();
const UserController = require("../controller/user.controller");



router.post('/', UserController.createOneUser);

router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getOneUser);

router.put('/:id', UserController.updateOneUser);
router.delete('/:id', UserController.deleteOneUser);

module.exports = router;