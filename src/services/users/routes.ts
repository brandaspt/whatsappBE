import { Router } from "express"
import { avatarParser } from "../../settings/cloudinary"
import { JWTAuthMiddleware } from "../auth/middlewares"


import * as controllers from "./controllers"

const router = Router()

// Me Routes
router.get("/me", JWTAuthMiddleware, controllers.getMe)
router.put("/:me", JWTAuthMiddleware, controllers.editMe)
router.delete("/:me", JWTAuthMiddleware, controllers.deleteMe)
router.post("/:me/uploadAvatar", JWTAuthMiddleware, avatarParser.single("avatar"), controllers.uploadAvatarMe)

// General Routes
router.get("/", JWTAuthMiddleware, controllers.getAll)
router.get("/:id", JWTAuthMiddleware, controllers.getSingle)
router.put("/:id", JWTAuthMiddleware, controllers.editUser)
router.delete("/:id", JWTAuthMiddleware, controllers.deleteUser)
router.post("/:id/uploadAvatar", JWTAuthMiddleware, avatarParser.single("avatar"), controllers.uploadAvatar)
router.get("/me/chats", JWTAuthMiddleware, controllers.getChats)
export default router
