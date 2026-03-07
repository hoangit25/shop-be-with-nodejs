// 
const mongoose = require('mongoose');
const products = require("../../model/products-model");
 module.exports.productClientPage = async (req, res) => {  
     let find = {

    }

const listProducts = await products.find(find);

    res.render("client/pages/products/products-client.pug",{
        title:"Products Page",
        listProduct: listProducts 
    });
}