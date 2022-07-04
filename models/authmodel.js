const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide your name!"]
    },
    email: {
        type: String,
        required: [true, "Provide your mail address"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Provide a valid mail address"]
    },
    password: {
        type: String,
        required: [true, "provide a password"],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Confirm your password"],
        validate: {
            validator: function (element) {
                return this.password === element;
            },
            message: "Password are not same"
        }
    }
});

UserModel.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 07);
    this.passwordConfirm = undefined;
    this.todo = [];
    return next();
});

UserModel.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model("Auth_model", UserModel);
module.exports = User;