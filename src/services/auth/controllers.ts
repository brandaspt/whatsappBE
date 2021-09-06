import createError from "http-errors"
import { TController } from "src/typings/controllers"
import { refreshTokens } from "./tools"

export const refresh: TController = async (req, res, next) => {
  const { refreshToken } = req.body
  if (!refreshToken) return next(createError(400, "Refresh token must be provided"))
  try {
    const tokens = await refreshTokens(refreshToken)
    if (!tokens) return next(createError(401, "Invalid token"))
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
    })
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
    })
    res.status(204).send()
  } catch (error) {
    next(createError(500, error as Error))
  }
}
