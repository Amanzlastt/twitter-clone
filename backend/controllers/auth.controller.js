import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import { generateTokenAndSetCookies } from "../lib/utls/generateToken.js"

export const signup = async (req, res)=>{
    try {
        const {fullName, username, email, password} =req.body;
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email format"})
        }
        const existingUser = await User.findOne({username:username});
        if (existingUser){
            return res.status(400).json({error: "Username is already taken"})
        }
        const existingEmail = await User.findOne({email:email});
        if (existingEmail){
            return res.status(400).json({error: "Email is already taken"})
        }
        if (password.length < 6){
            return res.status(400).json({error : "Password must be atleast 6 characters long"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName:fullName,
            username:username,
            email:email,
            password:hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookies(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                email:newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
            

        }else{
            res.status(400).json({ error: "Invlid user data"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error : `Internal server error on auth control`});
    }
}
export const login = async (req, res)=>{
    res.json({
        data:" you hit the login endpoint",
    });
}
export const logout = async (req, res)=>{
    res.json({
        data:" you hit the logout endpoint",
    });
}
