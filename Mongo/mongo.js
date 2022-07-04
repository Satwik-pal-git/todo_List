const mongoose = require("mongoose");

const db = process.env.DB.replace("<password>", process.env.DB_PWD);

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("the DB is connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;