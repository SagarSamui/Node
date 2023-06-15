var bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
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



