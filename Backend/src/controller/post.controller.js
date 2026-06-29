import User from "../modules/User.module.js";
import Post from "../modules/post.module.js";
import connections from "../modules/connections.module.js";
import { getVerifiedUserIds } from "../utils/verified.js";




export const activeCheck = async (req, res) => {
    return res.status(200).json({ message: 'RUNNING' })

}

