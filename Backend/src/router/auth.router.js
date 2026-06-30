import authRouter from "express"
import {userRegister} from "../controller/User.controller.js"
import { userLogin } from "../controller/User.controller.js";
import multer from "multer";
const router = authRouter();



//multer profile picture here
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })
router.post("/register", userRegister);
router.post("/login",userLogin)
router.post("/update_profile_picture", upload.single("profilePicture"), uploadProfilePicture);
router.route("/user_update").post(updateuserprofile);
router.route("/get_user_update_profile").get(getuserupdateprofile);
router.route("/update_Profile_Data").post(updateProfileData);


export default router;