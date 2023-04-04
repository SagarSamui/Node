const express = require('express');
const router = express.Router();
const {verifyUser,verifyAdmin} = require('../utils/auth');
const {createUserProduct,DeleteUserProduct,findUserProducts,GetOneUserProduct}= require('../controller/UserProduct');

router.route('/userProduct/:userid').post(verifyUser,createUserProduct);
router.route('/userProduct/:id/:userid').delete(verifyUser,DeleteUserProduct);
router.route('/userProduct').get(verifyUser,findUserProducts);
router.route('/userProduct/:id').get(GetOneUserProduct);

module.exports=router;