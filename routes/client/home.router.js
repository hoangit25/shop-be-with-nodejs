const express = require("express");
const router = express.Router();
const homeClientController = require("../../controller/client/home.controller");

router.get("/", homeClientController.homeClientPage);

 module.exports =router;