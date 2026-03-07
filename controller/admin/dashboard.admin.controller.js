const mongoose = require("mongoose");
const products = require("../../model/products-model");
module.exports.dashboardAdminPage = (req, res) => {  

    res.render("admin/pages/home/dashboard.pug",{
        title: "Dashboard"
    }); 
}