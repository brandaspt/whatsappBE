// Packages
import createError from "http-errors"
import { TController } from "src/typings/controllers"
import { IMessage } from "src/typings/messages"
import { IUserDocument } from "src/typings/users"

// Model
import UserModel from "./model"

export const getMe: TController = async (req, res, next) => {
  res.json(req.user)
}

export const getChats: TController = async (req, res, next) => {
  const user: IUserDocument | undefined = req.user
  try {
    const populatedUser = (
      await UserModel.findById(user?._id).populate("groups")
    )?.toObject()

    // const groups = populatedUser?.groups

    // const chatResponse = groups?.map((c: any) => {
    //   return { ...c, messageHistory: c.messageHistory[c.messageHistory.length - 1] }
    // })

    res.send(populatedUser?.groups)
  } catch (error) {
    next(error)
  }
}
