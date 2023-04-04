const mongoose= require('mongoose');
const validator= require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Details= new mongoose.Schema({
    name:{
        type:String,
        minlength:[2,"Minimun 2 letter are required"],
        maxlength:[16,"Not more then 16 letter are allowed"]
    },
    age:{
        type:Number,
        validate(value){
            if(!value>=18){
                throw new Error('Age must be above 18');
            }
        }
    },
    email:{
        type:String,
        required:[true,'Plz enter email'],
        unique:[true,'email must be unique'],
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    cPassword:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        trim:true,
        minlength:[10,"Minimum length of the address must be more then 10"],
        maxlength:[40,"Maximum limite is only 40"],
    },
    products:{
        type:[String]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],    
    resetLink:{
        data:String,
        default:''
    }, 
},
{
    timestamps:true
});

// Genetating Token

Details.methods.generateAuthToken = async function () {
    try {

        let myToken = jwt.sign({_id:this._id, isAdmin:this.isAdmin},process.env.SECURITY);
        this.tokens = this.tokens.concat({token:myToken});
        await this.save();
        return myToken;

    } catch (error) {
        console.log(error);
    }
}

const userData= mongoose.model('User',Details);
module.exports=userData;