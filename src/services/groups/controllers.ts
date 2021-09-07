// Packages
import createError from "http-errors"

// Model
import GroupModel from "./model"

import { TController } from "src/typings/controllers"
import { IUserDocument } from "src/typings/users"
import { IGroupDocument } from "src/typings/group"
import { Schema } from "src/typings/photos"

export const createGroup: TController = async (req, res, next) => {
  const user: IUserDocument | undefined = req.user

  const groupType = req.body.user ? "PRIVATE" : "PUBLIC"

  const groupUsers = req.body.user
    ? [
        { _id: req.body.user, role: "ADMIN" },
        { _id: user?._id, role: "ADMIN" },
      ]
    : [{ _id: user?._id, role: "ADMIN" }]

  const avatar = req.body.user
    ? null
    : "https://www.google.com/url?sa=i&url=http%3A%2F%2Fgetdrawings.com%2Fwhatsapp-group-icon-images-for-friends&psig=AOvVaw3MjmykrKIX7R8MgE0LFdGL&ust=1631007723474000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCZq7-H6vICFQAAAAAdAAAAABAD"

  const newGroup = {
    ...req.body,
    users: groupUsers,
    groupType,
    avatar,
  }
  try {
    const createdGroup = await new GroupModel(newGroup).save()
    res.send(createdGroup)
  } catch (error) {
    next(error)
  }
}

export const getSingleGroup: TController = async (req, res, next) => {
  const user: IUserDocument | undefined = req.user
  try {
    const group: IGroupDocument | null = await GroupModel.findById(req.params.id)
    if (group) {
      if (
        group?.closed === false ||
        group.users.some((u) => u._id.toString() === user?._id.toString())
      ) {
        res.send(group)
      } else {
        res.sendStatus(401)
      }
    } else {
      res.send(createError(404))
    }
  } catch (error) {
    next(error)
  }
}

export const editGroup: TController = async (req, res, next) => {
  const user: IUserDocument | undefined = req.user
  const group: IGroupDocument = res.locals.group
  try {
    if (group) {
      if (group.users.some((u) => u._id.toString() === user?._id.toString())) {
        const newGroup = { ...group, ...req.body }

        const updatedGroup = await GroupModel.findByIdAndUpdate(group._id, newGroup, {
          new: true,
          runValidators: true,
        })

        res.send(updatedGroup)
      } else {
        res.send(createError(401))
      }
    } else {
      res.send(createError(404))
    }
  } catch (error) {
    next(error)
  }
}

export const changeGroupAvatar: TController = async (req, res, next) => {}

// export const loginUser: TController = async (req, res, next) => {
//   const { email, password } = req.body
//   try {
//     const user = await UserModel.checkCredentials(email, password)
//     if (!user) return next(createError(401, "Invalid credentials"))
//     const { accessToken, refreshToken } = await getTokens(user)
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production" ? true : false,
//       sameSite: "none",
//     })
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production" ? true : false,
//       sameSite: "none",
//     })
//     res.status(204).send()
//   } catch (error) {
//     next(createError(500, error as Error))
//   }
// }

// export const getMe: TController = async (req, res, next) => {
//   res.json(req.user)
// }
