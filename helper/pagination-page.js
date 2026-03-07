module.exports=(object,query,getTotalProducts)=>{
    if(query.page){
    
        object.currentPage= parseInt(query.page);
    
    }
    object.totalPage = Math.ceil(getTotalProducts/object.limits);
    object.pagination = (object.currentPage - 1)* object.limits;
    return object 
    
}