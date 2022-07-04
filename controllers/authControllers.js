const User = require("../models/authmodel");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
    const newUser = new User({
        name: req.body.naam,
        email: req.body.Email,
        password: req.body.Password,
        passwordConfirm: req.body.ConfirmPassword
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_expiry
    });

    return next();

    // res.status(201).json({
    //     status: "Success",
    //     data: {
    //         user: newUser
    //     }
    // });
}

exports.login = async (req, res, next) => {
    const email = req.body.Email;
    const password = req.body.password;
    // console.log(email, password);

    const olduser = await User.findOne({ email: email }).select("+password");
    const checkPass = await olduser.correctPassword(password, olduser.password);
    // console.log(checkPass);

    if (!olduser || !checkPass) {
        res.redirect("/");
    }
    else {
        const Token = jwt.sign({ id: olduser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_expiry
        });
        return next();
    }
}

exports.protect = async (req, res, next) => {
    //1. Getting Token and check if it exist
    //2. Verification token
    //3. Check if user still exist

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/");
            } else {
                // console.log(decodedToken);
                res.locals.id = decodedToken.sub;
                return next();
            }
        });
    } else {
        res.redirect("/");
    }
    // return next();
}
