import { TController } from "src/typings/controllers"
import { IGroupDocument } from "src/typings/group"
import { IUserDocument } from "src/typings/users"
import GroupModel from "../groups/model"
import createError from "http-errors"

export const groupAdmin: TController = async (req, res, next) => {
  const groupId = req.params.id
  const user: IUserDocument | undefined = req.user
  try {
    const group: IGroupDocument | null = await GroupModel.findById(groupId)
    if (group) {
      res.locals.group = group
      if (
        group.users.some(
          (u) => u._id.toString() === user?.id.toString() && u.role === "ADMIN"
        )
      ) {
        next()
      } else {
        next(createError(403, "Admins only!"))
      }
    } else {
      next(createError(403, "Admins only!"))
    }
  } catch (error) {
    next(error)
  }
}

export const publicGroupOnly: TController = async (req, res, next) => {
  const groupId = req.params.id
  try {
    const group: IGroupDocument | null = res.locals.group
      ? res.locals.group
      : await GroupModel.findById(groupId)
    if (group) {
      res.locals.group = group
      if (group.groupType === "PUBLIC") {
        next()
      } else {
        next(createError(401))
      }
    } else {
      next(createError(404))
    }
  } catch (error) {
    next(error)
  }
}
