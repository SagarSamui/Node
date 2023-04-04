const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true
    },
    productPrice:{
        type:Number,
        required:true,
        trim:true
    },
    productTitle:{
        type:String,
        required:true,
        trim:true
    },
    productRating:{
        type:Number,
        required:true,
        trim:true
    },
    productDescription:{
        type:String,
        required:true,
        trim:true
    }
});

const productData = mongoose.model('addProducttouser',productSchema);
module.exports= productData;