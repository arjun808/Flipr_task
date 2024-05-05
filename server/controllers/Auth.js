const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const dotenv  = require("dotenv")
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    
    
    try {
      // Destructure fields from the request body
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
       
        
      } = req.body
     
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }
      
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        })
      }
  
      
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists. Please sign in to continue.",
        })
      }
  
      
     
  
    
      const hashedPassword = await bcrypt.hash(password, 10)
  
      
  
    
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        
     
      })
  
      return res.status(200).json({
        success: true,
        user,
        message: "User registered successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "User cannot be registered. Please try again.",
      })
    }
  }


  exports.login = async (req, res) => {
    try {
   
      const { email, password } = req.body
  
     
      if (!email || !password) {
       
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
  

      const user = await User.findOne({ email })
  
     
      if (!user) {
   
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
      }
   

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, role: user.accountType },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
       
        user.token = token
        user.password = undefined
     
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }
  exports.changePassword=async(req,res)=>{
    try{
        const userDeatails =await User.findById(req.user.id)
        const {oldPassword,newPassword} = req.body
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,userDeatails.password
        )
        if (!isPasswordMatch) {
           
            return res
              .status(401)
              .json({ success: false, message: "The password is incorrect" })
          }
          const encryptedPassword = await bcrypt.hash(newPassword, 10)
          const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
          )
          return res.status(200).json({
            success:true,
            message:"password changed succesfully"
          })
    }
    catch(err){
        console.log("there is some error while changing the password",err)
    }

  }
  exports.getAllUsers=async(req,res)=>{



    try{
      const users= await User.find({});
      return res.status(200).json({
        success: true,
        data: users,
      })

    }catch(err){
      console.log(err);
      return res.status(500).json({
        success: false,
        
      })
    }
  }
  exports.deleteUser = async (req, res) => {
    try {
      const { user_id } = req.params; // Access user_id from req.params
      console.log(user_id);
  
      const deletedUser = await User.findByIdAndDelete(user_id);
  
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User deleted successfully', data: deletedUser });
    } catch (err) {
      console.log(`Error while deleting the user ${err}`);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  