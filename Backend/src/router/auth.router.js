import authRouter from "express"
const router = authRouter();

router.post("/register", register);
export default router;