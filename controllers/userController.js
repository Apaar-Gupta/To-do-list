const userModel = require("../models/userModel.js");

const bcrypt = require('bcryptjs');

const JWT = require('jsonwebtoken');

//Register
const registerController = async (req, res) => {
  try {

 const{username,email,password}=req.body;
 //validation 
if(!username || !email || !password){
    return res.status(400).send({
        success:false,
        message:'Please provide all required fields'
    })
}

//check existing user
 const existingUser=await userModel.findOne({email})
    if(existingUser){
        return res.status(400).send({
            success:false,
            message:'User already exists'
        })
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

//save user
const newUser=new userModel({username,email,password:hashedPassword})
await newUser.save() 

res.status(201).send({
    success:true,
    message:'User registered successfully',
    user:newUser
  })

}
  
  catch (error) {
    res.status(500).send(
        { 
        success: false,
        message: 'Register API',   
        error: error.message 
    }
    )
  }
}


//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return  res.status(404).send({
            success: false,
            message: 'Invalid credentials'
        });
    }

    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({
            success: false,
            message: 'Invalid Credentials'
        });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    }); 

    res.status(200).send({
        success: true,
        message: 'User logged in successfully',
        token,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    });
}
    catch (error) {
res.status(500).send(
    { 
    success: false,
    message: 'Login API',   
    error: error.message 
}
)
    }
}

module.exports = { registerController,loginController }