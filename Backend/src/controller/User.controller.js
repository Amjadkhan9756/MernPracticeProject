import User from "../modules/User.module.js";
import bcrypt from "bcrypt";
import crypto from "crypto";


export const register = async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;
        if (!name || !userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(201).json({
                message: "User all ready exist "
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newuser = new User({
            name,
            email,
            password: hashPassword,
            userName
        })
        await newuser.save();
        console.log(newuser);
        const token = jwt.sign({ newuser }, process.env.JWT_SEC, {
            expiresIn: "15d"

        });


        const newProfile = new Profile({
            userId: newuser._id
        })

        await newProfile.save();


        return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })

    }
}