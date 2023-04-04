const {Register,Login,LogOut,forgetpassword,changePassword,getOtp} = require ('../controller/UserControll');
const express = require ('express');
const {verifyUser,} = require ('../utils/auth');
const route = express.Router();
const {signup} = require('../middleware/validation/validation');


route.post('/register',signup,Register);

route.post('/login',Login);

route.route('/logout').get(verifyUser,LogOut);

route.post('/forgetpassword',forgetpassword);

// route.post('/changepassword',changePassword);

route.post('/getOtp',getOtp);

module.exports=route