const jwt = require('jsonwebtoken');
const { createError } = require('./errorController');
const dotenv = require('dotenv');
const crudData = require('../models/Crud');
dotenv.config();



// verifying user token

exports.verifyUser = async (req, res, next) => {

    try {

        const token = req.cookies.jwt_Token;

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Login to Access this page..."
            })
        }

        const verify = jwt.verify(token, process.env.SECURITY);

        if (!verify) {
            return res.status(401).json({
                status: false,
                message: "Token Verification Failed..."
            })
        }

        await crudData.findOne({ _id: verify._id })
        next()

    } catch (error) {
        next(createError(403, "You are not authorized to access this page"))
    }

}

// verifying admin

exports.verifyAdmin = (req, res, next) => {
    try {
        const token = req.cookies.jwt_Token;

        if(!token){
            return next(createError(403, "Token is not valid"));   
        }

        jwt.verify(token, process.env.SECURITY, (err, user) => {
            if (err) return next(createError(403, "Token is not valid"));
            req.user = user;
        });        

        if (req.user.isAdmin === true) {
            next();
        }
        else{
            res.status(400).json({
                success:false,
                message:'You are not authorized to access this page'
            });
        }

    } catch (error) {
        res.status(400).json({
            success:flase,
            message:'Only admin can access this page'
        });
    }
}


