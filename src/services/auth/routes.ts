import { Router } from "express"
import * as controllers from "./controllers"

const router = Router()

router.post("/refreshToken", controllers.refresh)

export default router
