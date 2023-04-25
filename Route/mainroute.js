const router = require("express").Router();
const bodyParser = require("body-parser");
const path = require("path");
const authController = require("../controllers/authControllers");
const todo_model = require("../models/todoModel");


router.get("/", (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.post("/", authController.login, (req, res) => {
    res.redirect("/todo");
    // res.render("todo");
});

router.post("/register", authController.signUp, (req, res) => {
    res.redirect("/todo");
});
router.get('/todo', async (req, res) => {
    const db_data = await todo_model.find({});
    res.render("todo", { Data: db_data });
});

router.post("/todo", async (req, res) => {
    const new_item = new todo_model({
        Name: req.body.title_todo
    });
    await new_item.save();

    res.redirect("/todo");
});

router.get("/delete/:data", async (req, res) => {
    await todo_model.deleteOne({ _id: req.params.data });
    res.redirect("/todo");
});

module.exports = router;