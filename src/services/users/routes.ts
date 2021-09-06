import { Router } from "express"
import { JWTAuthMiddleware } from "../auth/middlewares"

import * as controllers from "./controllers"

const router = Router()

router.post("/register", controllers.registerUser)
router.post("/login", controllers.loginUser)

router.get("/me", JWTAuthMiddleware, controllers.getMe)

export default router
