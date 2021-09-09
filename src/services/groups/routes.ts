import { Router } from "express"
import { groupAvatarParser } from "../../settings/cloudinary"
import {
  groupAdmin,
  groupMemberOnly,
  myMessageOnly,
  publicGroupOnly,
} from "../auth/groupAdmin"
import { JWTAuthMiddleware } from "../auth/middlewares"
import * as controllers from "./controllers"

const router = Router()

router
  .post("/new", JWTAuthMiddleware, controllers.createGroup)
  .get("/:id", JWTAuthMiddleware, controllers.getSingleGroup)
  .get("/:id/history", JWTAuthMiddleware, controllers.getSingleGroupHistory)
  .put("/:id", JWTAuthMiddleware, groupAdmin, publicGroupOnly, controllers.editGroup)
  .post(
    "/:id/avatar",
    JWTAuthMiddleware,
    groupAdmin,
    publicGroupOnly,
    groupAvatarParser.single("avatar"),
    controllers.changeGroupAvatar
  )
  .post(
    "/:id/invite",
    JWTAuthMiddleware,
    publicGroupOnly,
    groupMemberOnly,
    controllers.invitePeople
  )
  .get(
    "/:id/ban/:uId",
    JWTAuthMiddleware,
    groupAdmin,
    publicGroupOnly,
    controllers.banUser
  )
  .delete("/:id", JWTAuthMiddleware, groupAdmin, groupMemberOnly, controllers.deleteGroup)
  .get(
    "/:id/leave",
    JWTAuthMiddleware,
    publicGroupOnly,
    groupMemberOnly,
    controllers.leaveGroup
  )
  .post("/:id/message", JWTAuthMiddleware, groupMemberOnly, controllers.newMessage)
  .put(
    "/:id/message/:mId",
    JWTAuthMiddleware,
    groupMemberOnly,
    myMessageOnly,
    controllers.editMessage
  )
  .delete(
    "/:id/message/:mId",
    JWTAuthMiddleware,
    groupMemberOnly,
    myMessageOnly,
    controllers.deleteMessage
  )

export default router
