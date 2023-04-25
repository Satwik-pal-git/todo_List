const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const mainRoutes = require("./Route/mainroute");
const connectDB = require("./Mongo/mongo");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use("/", mainRoutes);

const port = (process.env.PORT);
app.listen(port, console.log(`the server is started ${port}`));