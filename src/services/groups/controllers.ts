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

export const changeGroupAvatar: TController = async (req, res, next) => {
  const group: IGroupDocument = res.locals.group
  try {
    await GroupModel.findByIdAndUpdate(group._id, { $set: { avatar: req.file?.path } })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
}

export const invitePeople: TController = async (req, res, next) => {
  const group: IGroupDocument = res.locals.group
  const newUsers = req.body.ids
  try {
    // ADD A CHECK TO INVITE ONLY EXISTING USERS

    // ADD THE UPDATING OF USERS

    const existingIds = group.users.map((u) => u._id.toString())

    const notExistingUsers = newUsers.filter(
      (u: any) => !existingIds.includes(u.toString())
    )

    const allGroupUsers = [
      ...group.users,
      ...notExistingUsers.map((u: any) => {
        return { _id: u }
      }),
    ]

    await GroupModel.findByIdAndUpdate(group._id, { $set: { users: allGroupUsers } })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
}

export const banUser: TController = async (req, res, next) => {
  const group: IGroupDocument = res.locals.group
  try {
    // ADD A CHECK TO BE ABLE TO BAN ONLY NON ADMINS

    await GroupModel.updateOne(
      { _id: group._id, "users._id": req.params.uId },
      { $set: { "users.$.banned": true } }
    )
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
}

export const deleteGroup: TController = async (req, res, next) => {
  const group: IGroupDocument = res.locals.group
  try {
    // ADD THE DELETION OF THE GROUP FOR ALL THE USERS
    await GroupModel.deleteOne({ _id: group._id })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

export const leaveGroup: TController = async (req, res, next) => {
  const group: IGroupDocument = res.locals.group
  try {
    const newUsers = group.users.filter(
      (u: any) => u._id.toString() !== (req.user as IUserDocument)._id.toString()
    )

    // ADD A CHECK THAT DOESNT LET THE LAST ADMIN LEAVE THE GROUP

    // ADD ALSO DELETION FROM USER DOCUMENT

    await GroupModel.findByIdAndUpdate(group._id, { $set: { users: newUsers } })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

// MESSAGE CONTROLLERS

export const newMessage: TController = async (req, res, next) => {
  const user: IUserDocument | undefined = req.user
  try {
    const testMessage = { sender: user?._id }

    await GroupModel.findByIdAndUpdate(req.params.id, {
      $push: { messageHistory: testMessage },
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

export const editMessage: TController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}

export const deleteMessage: TController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}

export const attachmentMessage: TController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}
