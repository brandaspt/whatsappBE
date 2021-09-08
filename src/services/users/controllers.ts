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

export const getAll: TController = async (req, res, next) => {
  try {
    const users = await UserModel.find().populate("groups", { title: 1, avatar: 1})
    res.send(users)
  } catch (error) {
    next(createError(500, "An Error ocurred while getting the list of users"))
  }
}

export const getSingle: TController = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id).populate("groups", { title: 1, avatar: 1})
    if(user) {
      res.send(user)
    } else {
      next(createError(404, `user Not Found!`))
    }
  } catch (error) {
    next(createError(500, "An Error ocurred while getting the user"))
  }
}

export const editUser: TController = async (req, res, next) => {
  try {
    const modifiedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    if(modifiedUser) {
      res.send(modifiedUser)
    } else {
      next(createError(404, "user Not Found!"))
    }
  } catch (error) {
    next(createError(500, "An Error ocurred while updating the user"))
  }
}

export const editMe: TController = async (req, res, next) => {
  try {
    const modifiedUser = await req.user?.updateOne(req.body) 

    if(modifiedUser) {
      res.send(modifiedUser)
    } else {
      next(createError(404, "user Not Found!"))
    }
  } catch (error) {
    next(createError(500, "An Error ocurred while updating the user"))
  }
}

export const deleteUser: TController = async (req, res, next) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id)

    if(deletedUser) {
      res.status(204).send()
    } else {
      next(createError(createError(404, "user Not Found!")))
    }
  } catch (error) {
    next(createError(500, "An Error ocurred while deleting the user"))
  }
}

export const deleteMe: TController = async (req, res, next) => {
  try {
    await req.user?.deleteOne()
    res.status(204).send()
  } catch (error) {
    next(createError(500, "An Error ocurred while deleting the user"))
  }
}

export const uploadAvatar: TController = async (req, res, next) => {
  try {
    
    const modifiedUser = await UserModel.findByIdAndUpdate(req.params.id, {$set: {avatar: req.file?.path} }, {new: true, runValidators: true} )
    if(modifiedUser) {
      res.send(modifiedUser)
    } else {
      next(createError(404, "user Not Found!"))
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "An Error ocurred while uploading avatar image to user"))
  }
}

export const uploadAvatarMe: TController = async (req, res, next) => {
  try {
    // const modifiedUser = await req.user?.updateOne({$set: {avatar: req.file?.path} })
    const modifiedUser = await UserModel.findByIdAndUpdate(req.user?._id, {$set: {avatar: req.file?.path} }, {new: true, runValidators: true} )
    
    if(modifiedUser) {
      
      res.send(modifiedUser)
    } else {
      next(createError(404, "user Not Found!"))
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "An Error ocurred while uploading avatar image to user"))
  }
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
