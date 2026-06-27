import authRouter from "express"
import {userRegister} from "../controller/User.controller.js"
import { userLogin } from "../controller/User.controller.js";
const router = authRouter();

router.post("/register", userRegister);
router.post("/login",userLogin)
router.post("/update_profile_picture", upload.single("profilePicture"), uploadProfilePicture);
router.route("/user_update").post(updateuserprofile);
router.route("/get_user_update_profile").get(getuserupdateprofile);

export default router;