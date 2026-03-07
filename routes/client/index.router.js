const homeClientPage = require("./home.router");
const productsClientPage = require("./products.router");
module.exports =(app)=>{

    app.use("/", homeClientPage);

    app.use("/products", productsClientPage);
}