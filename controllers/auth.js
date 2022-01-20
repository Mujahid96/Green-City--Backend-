const User = require("../model/user");
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const { errorHandler } = require("../helpers/dbErrorHandler");
// const { use } = require("../routes/user");
exports.signup = (req, res) => {

    // console.log("req.body",req.body);
    const user = new User(req.body);

    // once we create new user save to database
    user.save((err, user) => {
        if (err) {
            // console.log(err);
            return res.status(400).json({
                // error
                error: errorHandler(err)
                // message:err
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
       


    });


};

exports.signin = (req, res) => {
    // finding user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist.signup'
            });
        }

        // if email found in db then make sure email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }

        // genarate a signed token with user id and secret

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } })
    });

};
exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: "Signout success" });
};

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ['sha1', 'RS256', 'HS256']
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error:'Access denied'
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role=== 0){
        return res.status(403).json({
            error:'Admin resource! Access denied'
        });
    }
    next();
}

// exports.sayHi=(req,res)=>{
//     res.json({message:"hello there"});
// }