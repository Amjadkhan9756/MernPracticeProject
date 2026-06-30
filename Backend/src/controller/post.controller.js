import User from "../modules/User.module.js";
import Post from "../modules/post.module.js";
import connections from "../modules/connections.module.js";
import { getVerifiedUserIds } from "../utils/verified.js";




export const activeCheck = async (req, res) => {
    return res.status(200).json({ message: 'RUNNING' })

}


export const createPost = async (req,res)=>{
    try{
        const {token} = req.body;

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new Post ({
            userId:user_id,
            body:req.body.body,
            media:req.file != undefined ? req.file.filename : " ",
            filetype:req.file !=undefined ? req.file.mimetype.split("/")[1] : " "
        });
        await newPost.save();

        return res.status(200).json({
            message: "Post created successfully"
        });

        // Continue with post creation logic
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const getAllPost = async (req,res) =>{
   
}