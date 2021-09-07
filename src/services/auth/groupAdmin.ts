import { TController } from "src/typings/controllers"
import { IGroupDocument } from "src/typings/group"
import { IUserDocument } from "src/typings/users"
import GroupModel from "../groups/model"
import createError from "http-errors"

export const groupAdmin: TController = async (req, res, next) => {
  const groupId = req.params.groupId
  const user: IUserDocument | undefined = req.user

  const group: IGroupDocument | null = await GroupModel.findById(groupId)
  if (group) {
    res.locals.group = group
    if (group.groupType === "PRIVATE") {
      next()
    } else if (group.users.some((u) => u.userId === user?.id && u.role === "ADMIN")) {
      next()
    } else {
      next(createError(403, "Admins only!"))
    }
  } else {
    next(createError(403, "Admins only!"))
  }
}
