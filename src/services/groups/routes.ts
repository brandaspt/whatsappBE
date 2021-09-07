import { Router } from "express"
import { groupAdmin, publicGroupOnly } from "../auth/groupAdmin"
import { JWTAuthMiddleware } from "../auth/middlewares"
import * as controllers from "./controllers"

const router = Router()

router
  .post("/new", JWTAuthMiddleware, controllers.createGroup)
  .get("/:id", JWTAuthMiddleware, controllers.getSingleGroup)
  .put("/:id", JWTAuthMiddleware, groupAdmin, publicGroupOnly, controllers.editGroup)
  .post(
    "/:id/avatar",
    JWTAuthMiddleware,
    groupAdmin,
    publicGroupOnly,
    controllers.changeGroupAvatar
  )

export default router
