import { Router } from "express"
import * as controllers from "./controllers"

const router = Router()

router
  .post("/refreshToken", controllers.refresh)
  .post("/register", controllers.registerUser)
  .post("/login", controllers.loginUser)

export default router
