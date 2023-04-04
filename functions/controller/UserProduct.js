const productData = require('../models/Product');
const userData = require('../models/User');
const createError = require('../utils/errorController');

// Create User Data

exports.createUserProduct = async (req, res, next) => {
    const productDetail = new productData(req.body);
    const userId = req.params.userid;

    try {

        const saveProduct = await productDetail.save();

        try {

            await userData.findByIdAndUpdate(userId, { $push: { products: saveProduct._id } });

        } catch (err) {

            next(err)

        }

        res.status(200).json({

            success: true,
            message: "Product have been save in the User id"

        });

    } catch (err) {

        next(err);

    }
}

// Delete User product id

exports.DeleteUserProduct = async (req, res, next) => {

    const userId = req.params.userid
    try {

        const deleteProduct = await productData.findByIdAndDelete(req.params.id);

        if(!deleteProduct){
            return res.status(404).json({
                success:false,
                message:'Product Does not Exist'
            })
        }

        try {

            await userData.findByIdAndUpdate(userId,{$pull:{products:req.params.id}})

        } catch (err) {
            next(err);
        }

        res.status(200).json({
            success:true,
            message:"Product has been succesfull removed"
        });

    } catch (err) {
        next(err);
    }
}

// Get All User Product 

exports.findUserProducts = async (req, res, next) =>{
    try {
        
        const product = await productData.find();
        res.status(200).json(product);

    } catch (err) {
        next(err);
    }
}

// Get One Product

exports.GetOneUserProduct = async (req,res,next) =>{
    try {
        
        const oneProduct = await productData.findById(req.params.id);
        res.status(200).json({
            success:true,
            message:'Successfully Got the single product',
            oneProduct
        })

    } catch (err) {
        next(err);
    }
}