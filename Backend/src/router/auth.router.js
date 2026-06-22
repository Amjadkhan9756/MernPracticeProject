import authRouter from "express"
import {userRegister} from "../controller/User.controller.js"
import { userLogin } from "../controller/User.controller.js";
const router = authRouter();

router.post("/register", userRegister);
router.post("/login",userLogin)
export default router;