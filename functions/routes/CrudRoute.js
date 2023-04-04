const express = require('express');
const routes = express.Router();
const {
    verifyUser,
    verifyAdmin
} = require('../utils/auth');
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,
    getAllProducts
} = require('../controller/Crud');

routes.route('/product').post(verifyUser,verifyAdmin,createProduct).get(verifyUser,getAllProducts);

routes.route('/product/:id').delete(verifyUser,deleteProduct).put(verifyUser,updateProduct).get(verifyUser,getOneProduct);

module.exports=routes;