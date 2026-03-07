const express = require("express");
const router = express.Router();
const dashboardAdminController = require("../../controller/admin/dashboard.admin.controller");

    router.get("/", dashboardAdminController.dashboardAdminPage);

module.exports =router;