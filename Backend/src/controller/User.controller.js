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
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "no token provided " })
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (!req.file) {
            return res.status(400).json({ message: "no file uploaded " })
        }

        console.log(req.file.filename);
        await user.profilePicture = req.file.filename;
        await user.save();

        return res.json({ message: "Profile picture uploaded successfully" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

///upadte userprfile 
export const updateuserprofile = async (req, res) => {
    try {
        const { token, ...newuser } = req.body;
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "user not found " })
        }
        const { username, email } = newuser;

        const existuser = await User.findOne({ $or: [{ email }] });

        if (existuser) {
            if (existuser || String(existuser._id != user._id)) {
                return res.status(400).json({ message: "user already exist" })
            }
        }
        Object.assign(user, newuser);
        await user.save();

        return res.json({ message: "User profile updated successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


import Profile from "../models/Profile.js";
import jwt from "jsonwebtoken";
import { getVerifiedUserIds } from "../utils/verifiedUsers.js";

export const getUserProfile = async (req, res) => {
    try {
        // Extract token from request body
        const { token } = req.body;
        console.log("token", token);

        // Verify and decode the token to get user data
        let user;
        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token!" });
        }

        // Check if user exists after decoding
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Find the profile in DB and populate user fields
        const userProfile = await Profile.findOne({ userId: user._id }).populate(
            "userId",
            "name email username profilePicture"
        );

        // If no profile found, return 404
        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found!" });
        }

        // Convert Mongoose document to plain JS object
        const profileObj = userProfile.toObject();

        // Ensure pastWork field always exists (fallback to empty array)
        profileObj.pastWork = profileObj.pastWork || profileObj.postwork || [];

        // Get all verified user IDs
        const verifiedIds = await getVerifiedUserIds();

        // Dynamically add verified flag to user object
        if (profileObj.userId) {
            profileObj.userId.verified = verifiedIds.has(
                profileObj.userId._id.toString()
            );
        }

        // Send success response with profile data
        return res.status(200).json({ userProfile: profileObj });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};