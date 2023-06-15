const {Register,Login,LogOut} = require ('../controller/UserControll');
const express = require ('express');
const {verifyUser,} = require ('../utils/auth');
const route = express.Router();
const {signup} = require('../middleware/validation/validation');


route.post('/register',signup,Register);

route.post('/login',Login);

route.route('/logout').get(verifyUser,LogOut);



module.exports=route