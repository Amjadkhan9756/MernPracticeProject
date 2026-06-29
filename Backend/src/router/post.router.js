import {Router} from "express";
import createPost from "../controller/post.controller.js";
import multer from "multer"
const router = Router();

//multer profile picture here
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
 filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // keep file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
})

const upload = multer({ storage })   


router.post("/Post ",upload.single("videos"),createPost);

export default router;
