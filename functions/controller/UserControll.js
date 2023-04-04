const express = require('express')
const app = express();
const Otp = require('../models/PasswordOTP')
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const randomString = require('randomstring');
const userData = require('../models/User');



exports.Register = async(req, res, next) => {

    const { name, email, password, cPassword, age, address } = req.body;

    if (!name || !email || !password || !cPassword || !address || !age) {

        return res.status(400).send("Plz fill all the details").json({
            success: false,
            message: "Plz fill all the details"
        });

    }

    try {

        const userExist = await userData.findOne({ email: email });

        if (userExist) {
            return res.status(404).json({
                success: false,
                message: "This email already exist"
            });
        }

        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);

        const newUser = new userData({
            name: name,
            password: hash,
            cPassword: hash,
            email: email,
            age: age,
            address: address
        });

        if (password != cPassword) {
            return res.status(404).json({
                success: false,
                message: "Password does not Match with Confirm Password"
            });
        }

        await newUser.save();
        
        res.status(200).json({
            success: true,
            message: "Registration is successfull"
        });

    } catch (error) {
        next(error);
        res.status(400).json({
            success: false,
            message: "Registration is not possible"
        });
    }
}


exports.Login = async (req, res, next) => {
    try {

        const { name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Plz fill all the details"
            });
        }

        const getEmail = await userData.findOne({ email: email });

        let token;
  
        if (getEmail) {
            const isMatch = await bcrypt.compare(password, getEmail.password);

            token = await getEmail.generateAuthToken();

            console.log(token);

            res.cookie('jwt_Token', token, {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true
            });

            if (isMatch) {
                res.status(200).json({
                    success: true,
                    message: "Login Successfully..."
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid credential pass"
                })
            }

        }else{
            return res.status(400).json({
                success: false,
                message: "Plz enter Registered email and password"
            });
        }


    } catch (error) {
        next(error);
        res.status(400).json({
            success: false,
            message: "Plz enter the Valid User and Password"
        });
    }
}


exports.LogOut = async (req,res,next) => {
    try {

        res.clearCookie('jwt_Token');

        res.status(200).json({
            success:true,
            message:"Logout successfull..."
        })
        next();
        
    } catch (error) {
        next(error)
        res.status(400).json({
            success: false,
            message: "Logout Failed"
        }); 
    }
}


const SendResetPasswordEmail = async (email,otp) => {
    try {
        var transporter = nodeMailer.createTransport({
            service:'gmail',
            port:587,
            secure:false,
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });

        var mailOption = {
            from:process.env.EMAIL,
            to:email,
            subject:`Sending Email Usind Noddejs and your otp is ${otp}`,
            text:'Thaks you sir'
        }

        transporter.sendMail(mailOption,function(error,info){
            if (error) {
                console.log(error,'Error in sending mail');
            } else {
                console.log('Email send',info.response);
            }
        });
        } catch (error) {
            console.log("Somthing went wrong while SendResetPasswordEmail",error);
        }
}

exports.forgetpassword = async (req,res,next) => {
    try {
        const { email } = req.body;
        const getEmail = await userData.findOne({ email: email,  });        
        
        if ( getEmail ) {
            const otp = Math.floor((Math.random()*10000+1));
            const expire = new Date().getTime()+1800000;
            const expireTime = new Date(expire).toISOString()
            const otpData = new Otp({
                email:req.body.email,
                code:otp,
                expireIn:expireTime
            })

            const otpSave= otpData.save();         
            SendResetPasswordEmail(email,otp)
        }

        res.status(200).json({
            success:true,
            message:"plz check your gmail inbox"
        })

    } catch (error) {
        next(error)
        res.status(404).json({
            success:false,
            message:"Somthing went wrong while forgeting password"
        })
    }
}

// exports.changePassword = async(req,res)=>{
// try {
//     const {email,code,password} = req.body;
//     let data = await Otp.findOne({email:email,code:code});
//     if(data){
//         let expire = data.expireIn
//         let currentTime = new Date().getTime();
//         let diff = new Date(expire).getTime() - currentTime;

//         if (diff<0) {
//             res.status(404).json({
//                 success:false,
//                 message:"Time is Up of Your OTP"
//             })
//         } else {
//             let user = await userData.findOneAndUpdate({email:email},{$set:req.body},{new:true});
//             user.save();
//             res.status(200).json({
//                 success:true,
//                 message:"Password is changed"
//             })  
//         }
//     }

// } catch (error) {
    
// }}


exports.getOtp = async(req,res)=>{
    try {
        const {email,code} = req.body;

        let data = await Otp.findOne({email:email});
        if (!data) {
            res.status(401).json({
                success:false,
                message:'Plz enter Valid Email'
            })
        }else {
            let expire = data.expireIn
            let currentTime = new Date().getTime();
            let diff = new Date(expire).getTime();
            let timeExceed = diff-currentTime

            if (data.code!=code) {
                console.log('OTP does not match');
                res.status(401).json({
                    success:false,
                    message:'OTP does not match'
                })
            } else{
                res.status(200).json({
                    success:true,
                    message:'otp has been verified and check /login'
                })
                
                delete data.code;
            }
        }
    
    } catch (error) {
        res.status(400).send('Invalid OTP. Please try again.');
    }
}



