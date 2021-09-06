import { Router } from "express"
import { JWTAuthMiddleware } from "../auth/middlewares"
import * as controllers from "./controllers"

const router = Router()

router.post("/", JWTAuthMiddleware, controllers.newMessage)

export default router
