import { Router } from "express"
import { groupAvatarParser } from "../../settings/cloudinary"
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
    groupAvatarParser.single("avatar"),
    controllers.changeGroupAvatar
  )
  .post("/:id/invite", JWTAuthMiddleware, publicGroupOnly, controllers.invitePeople)
  .get(
    "/:id/ban/:uId",
    JWTAuthMiddleware,
    groupAdmin,
    publicGroupOnly,
    controllers.banUser
  )
  .delete("/:id", JWTAuthMiddleware, groupAdmin, controllers.deleteGroup)
  .get("/:id/leave", JWTAuthMiddleware, publicGroupOnly, controllers.leaveGroup)
  .post("/:id/message", JWTAuthMiddleware, controllers.newMessage)

export default router
