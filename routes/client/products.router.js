const express = require("express");
const router = express.Router();
const productsClientController = require("../../controller/client/products.controller");

router.get("/", productsClientController.productClientPage);

 module.exports =router;