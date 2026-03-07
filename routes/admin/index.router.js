const systemName = require("../../config/system");
const dashboardAdminRouter = require("./dashboard.router");
const productsAdminRouter = require("./products.router");
module.exports =(app)=>{

    app.use(`${systemName.prefixAdmin}/dashboard`, dashboardAdminRouter);

    app.use(`${systemName.prefixAdmin}/products`, productsAdminRouter);
}