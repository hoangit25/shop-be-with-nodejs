// [POST] /admin/products/create
module.exports.createPost = (req,res,next)=>{
    if(!req.body.title){
         req.flash('err','Vui lòng nhập title để tạo sản phẩm');
         res.redirect(req.get('referer'));
    }
    next();
}

// [PATCH] /admin/products/edit/:id
module.exports.editPost = (req,res,next)=>{
    if(!req.body.title){
        req.flash('err','Vui lòng nhập title để chỉnh sửa sản phẩm');
        res.redirect(req.get('referer'));
    }
    next();
}