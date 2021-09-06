import { TController } from "src/typings/controllers"
import createError from "http-errors"
import { verifyJWT } from "./tools"
import UserModel from "../users/model"
import { JwtPayload } from "jsonwebtoken"

export const JWTAuthMiddleware: TController = async (req, res, next) => {
  if (!req.cookies.accessToken) return next(createError(401, "Please provide credentials in cookies."))
  const token = req.cookies.accessToken
  try {
    const decodedToken = (await verifyJWT(token)) as JwtPayload
    const user = await UserModel.findById(decodedToken._id)
    if (!user) return next(createError(404, "User not found."))
    req.user = user
    next()
  } catch (error) {
    next(createError(401, "Invalid token"))
  }
}
