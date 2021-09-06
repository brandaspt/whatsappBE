// Packages
import createError from "http-errors"

// Model
import UserModel from "./model"

export const getMe: TController = async (req, res, next) => {
  res.json(req.user)
}
