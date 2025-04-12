import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup = async (req, res)=>{
   const {fullName,email,password} = req.body;
   //hashing the password
   try {
    if(!fullName || !email || !password){
        return res.status(400).json({message:"all fields are required"});
    }

    if(password.length<6)
    {
        return res.status(400).json({message:"password must be at least 6 characters"});
    }

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "email already exits"}); 

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashPassword,
        })

        if(newUser){
            //generate jwt token 
            generateToken(newUser._id,res)
            await newUser.save();
            
            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilepic: newUser.profilepic,
            })
        }
        else{
            res.status(400).json({message: "invalid user data"});
        }
   } catch (error) 
   {
    console.log("Error at signup controller",error.message);
    res.status(500).json({message:"Internal server Error"})
   }
};
export const login = (req, res)=>{
    res.send("login route");
};
export const logout = (req, res)=>{
    res.send("logout route");
};