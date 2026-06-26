import User from "../modules/User.module.js";
import Profile from "../modules/profile.module.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;
        if (!name || !userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            userName,
            email,
            password: hashPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SEC, {
            expiresIn: "15d",
        });

        const newProfile = new Profile({
            userId: newUser._id,
        });
        await newProfile.save();

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                userName: newUser.userName,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// export default userRegister;

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
            expiresIn: "15d",
        });

        user.token = token;
        await user.save();

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userName: user.userName,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//upload profilePicture

export const uploadProfilePicture = async (req, res) => {
    console.log("body",
        req.body
    );
    console.log("File", req.file);
    try {
        const {token} = req.body;

        if(!token){
            return res.status(400).json({message:"no token provided "})
        }

        const user = await User.findOne({ token });

        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(!req.file){
            return res.status(400).json({message:"no file uploaded "})
        }

        console.log(req.file.filename);
        await user.profilePicture = req.file.filename;
        await user.save();

        return res.json({message:"Profile picture uploaded successfully"})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

///upadte userprfile 
const updateuserprofile = async (req,res)=>{
    try{

    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}