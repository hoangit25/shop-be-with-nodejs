const products = require('../../model/products-model.js');
const mongoose = require('mongoose');
const Filter = require('../../helper/filter-status.js');
const searchHelper = require('../../helper/search.js')
const paginationPageProducts = require('../../helper/pagination-page.js')
const systemConfig = require('../../config/system.js');


// [GET] /admin/products
module.exports.productsAdmin = async (req, res) => {

    //Filter
    const filterStatus = Filter(req.query);

    // object will render 

    let find = {
        deleted: false
    }
    //object render sort 
    let sort={

    }
    if (req.query.sortKey && req.query.sortValue) {
        console.log(req.query);
        sort[req.query.sortKey]=req.query.sortValue;
    }else{
        sort.position ='asc';
    }


    //pagination

    const getTotalProducts = await products.countDocuments(find);
    const pagePagination = paginationPageProducts({
        currentPage: 1,
        limits: 4
    },
        req.query, getTotalProducts)

    // search prosucts 

    const search = await searchHelper(req.query);
    console.log(search);
    if (search.regex) {
        find.title = search.regex;
    }
    //status products

    if (req.query.status) {
        find.status = req.query.status;
    }
    const Products = await products.find(find).limit(pagePagination.limits).skip(pagePagination.pagination).sort(sort);
    res.render('admin/pages/products/products-admin.pug', {
        titlePage: "Trang sản phẩm Ad",
        products: Products,
        FilterStatus: filterStatus,
        Keyword: search.keyword,
        pagination: pagePagination
    })

}

// [GET] /admin/products/change-status/:status/:id
module.exports.statusChanged = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    // res.send(`${status}-${id}`)
    await products.updateOne({ _id: id }, { status: status });
    req.flash('changeStatusSuccess', 'Bạn đã thay đổi trạng thái sản phẩm thành công');
   
    res.redirect(req.get('referer'));
}
//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const id = req.body.ids.split(", ");
    const type = req.body.type;
    switch (type) {
        case "active":
            await products.updateMany({ _id: { $in: id } },
                { $set: { status: "activeactive" } });
                break;
        case "inactive":
            await products.updateMany({ _id: { $in: id } },
                { $set: { status: "inactive" } });
            break;
        case "delete-all":
            await products.updateMany({ _id: { $in: id } },
                { $set: { deleted: true, deletedAt: new Date() } });
            break;
        case "change-position":
            for(item of id){
                const ids = item.split("-")
                const [id,position]=ids;
                await products.updateOne({_id: id},{position : position})
            }
            break;
        default:
            break;  
    }
    res.redirect(req.get('referer'));
}
//[GET] /admin/products/recycle
module.exports.recycleProductPage = async (req, res) => {
        const find = {
            deleted: true
        }

        //pagination page recycle
        const getTotalProducts = await products.countDocuments(find);
        const pagePagination = paginationPageProducts({
            currentPage: 1,
            limits: 4
        },
            req.query, getTotalProducts)

        //search products in recycle
        const search = await searchHelper(req.query);
        console.log(search);
        if (search.regex) {
            find.title = search.regex;
        }

        const deletedProducts = await products.find(find).limit(pagePagination.limits).skip(pagePagination.pagination);
        res.render('admin/pages/products/recycle-products.pug', {
            titlePage: "Trang khôi phục sản phẩm",
            products: deletedProducts,
            FilterStatus: Filter(req.query),
            pagination: pagePagination,
            Keyword: searchHelper(req.query).keyword
        })
}   

//[GET]/admin/producs/create
module.exports.createProduct= async (req,res)=>{
res.render("admin/pages/products/create.pug")
}

//[POST]admin/products/create
module.exports.createPost = async (req, res) => {

       
            try {
                let position = req.body.position;
               

                if (position === "") {
                    const total = await products.countDocuments({});
                    position = total + 1;
                } else {
                    position = parseInt(position);
                }
                const newProduct = new products(req.body);
                await newProduct.save();
                req.flash('successCreateProduct', "Bạn đã tạo mới sản phẩm thành công");
                res.redirect(`${systemConfig.prefixAdmin}/products`);
            } catch (err) {
                console.log("Lỗi không thể thêm sản phẩm", err);
                req.flash('createProductError', 'Không thể thêm sản phẩm');
                res.redirect(req.get('referer'));
            }
};
    
//[GET] /admin/products/edit/:id
module.exports.getEditProduct=async (req,res)=>{
    const find = {
        deleted: false,
        _id : req.params.id
    };

    const product = await products.findOne(find);
    res.render('admin/pages/products/edit-product.pug',{
        titlePage:"Chỉnh sửa sản phẩm",
        product: product
        }
    )
}

//[PATCH] /admin/products/edit/:id
module.exports.editProduct = async (req,res)=>{
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discount = parseInt(req.body.discount);
    req.body.stock = parseInt(req.body.stock);
 try {

        if(req.body.position === "") {
            const total = await products.countDocuments({});
            req.body.position =parseInt(total + 1);
        }   else {
            req.body.position = parseInt(req.body.position);
        }
        if(req.file){
            req.body.thumbnail = `/uploads/${req.file.filename}`;
              }
        await
            products.updateOne({ _id: id }, req.body);
        req.flash('editProductSuccess', 'Bạn đã chỉnh sửa sản phẩm thành công');
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    } catch (err) {
        console.log("Lỗi không thể chỉnh sửa sản phẩm", err);
        req.flash('editProductError', 'Không thể chỉnh sửa sản phẩm');
        res.redirect(req.get('referer'));
    }   
}
 
//[GET] /admin/products/detail/:slug
module.exports.detailProduct = async (req,res)=>{
    const slug = req.params.slug;
    const find = {
        deleted: false,
        slug: slug
    }
    const product = await products.findOne(find);
    res.render('admin/pages/products/detail.pug',{
        titlePage: "Chi tiết sản phẩm",
        product: product
    })
}
