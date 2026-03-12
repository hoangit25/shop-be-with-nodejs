const mongoose = require("mongoose");
require("dotenv").config();
module.exports.connect = async(app) => {
    try {
    const listProducts = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }   
}   
