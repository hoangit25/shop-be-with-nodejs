const productsAdmin = require("../../controller/admin/products.admin.controller");
const validate = require("../../validates/products-validate")
const multer = require("multer");
const express = require("express");
const storageMulter = require('../../helper/storageMulter');
const upload = multer();
const router = express.Router();

const uploadCloud = require('../../middleware/admin/uploadCloud.middleware');
// 

    router.get("/", productsAdmin.productsAdmin);

// change status

    router.patch('/change-status/:status/:id',productsAdmin.statusChanged);

// change multi status

    router.patch('/change-multi', productsAdmin.changeMulti)

// /Recycle

    router.get('/recycle', productsAdmin.recycleProductPage);

// /Create
    
    router.get('/create',productsAdmin.createProduct);

    router.post('/create',
        upload.single('thumbnail'),
        uploadCloud.uploadCloud,
        validate.createPost,
        productsAdmin.createPost)

// /Edit

    router.get('/edit/:id',productsAdmin.getEditProduct);

    router.patch('/edit/:id',
        upload.single('thumbnail'),
         uploadCloud.uploadCloud,
        validate.editPost,
        productsAdmin.editProduct)

// /Detail
    router.get('/detail/:slug',productsAdmin.detailProduct);

module.exports =router;