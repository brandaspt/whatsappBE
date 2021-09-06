// Packages
import createError from "http-errors"

// Model
import UserModel from "./model"

import { getTokens } from "../auth/tools"
import { TController } from "src/typings/controllers"

export const registerUser: TController = async (req, res, next) => {
  const newUser = { ...req.body }
  newUser.avatar = `https://ui-avatars.com/api/?name=${req.body.name}+${req.body.surname}`
  try {
    res.status(201).json(await new UserModel(newUser).save())
  } catch (error) {
    next(createError(400, error as Error))
  }
}

export const loginUser: TController = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.checkCredentials(email, password)
    if (!user) return next(createError(401, "Invalid credentials"))
    const { accessToken, refreshToken } = await getTokens(user)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
    })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
    })
    res.status(204).send()
  } catch (error) {
    next(createError(500, error as Error))
  }
}

export const getMe: TController = async (req, res, next) => {
  res.json(req.user)
}
