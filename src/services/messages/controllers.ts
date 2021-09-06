// Packages
import createError from "http-errors"

// Model
import MessageModel from "./model"

import { TController } from "src/typings/controllers"
import { IUserDocument } from "src/typings/users"

export const newMessage: TController = async (req, res, next) => {
  const newMessage = { ...req.body }
  try {
    const user = req.user as IUserDocument
    newMessage.sender = user._id
    await new MessageModel(newMessage).save()
    res.sendStatus(204)
  } catch (error) {
    next(createError(400, error as Error))
  }
}
