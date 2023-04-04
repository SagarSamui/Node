const mongoose= require('mongoose');

const crudSchema= new mongoose.Schema({
    productName:{
        type:String,
        trim:true,
        required:true
    },
    title:{
        type:String,
        trim:true,   
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    photos:{
        type:[String]
    },
    cheepestPrice:{
        type:Number,
        required:true,
        trim:true
    },
})

const crudData= mongoose.model('crudProduct',crudSchema);
module.exports=crudData;