const express = require("express");
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const  session = require('express-session')
const systemConfig = require("./config/system");
var methodOverride = require('method-override');
const  bodyParser  =  require ( 'body-parser' );

const connectDB = require("./config/products.config");
const clientRouter = require("./routes/client/index.router");
const adminRouter = require("./routes/admin/index.router");
//app
const app = express();

const PORT = process.env.PORT;

app.use(express.static(`${__dirname}/public`));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//
app.use ( bodyParser.urlencoded ({ extended: false }) );

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(methodOverride('_method'))

//connect to database
connectDB.connect(app);

//express-flash
app.use(cookieParser('HOANGNGUYEN25'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//end express-flash


//routers client
clientRouter(app);
//routers admin
adminRouter(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});