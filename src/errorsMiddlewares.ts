import { TErrorMiddlewareFunction } from "./typings/middlewares"

export const errorsMiddleware: TErrorMiddlewareFunction = (err, req, res, next) => {
  const errStatus = [400, 401, 403, 404]
  if (!errStatus.includes(err.status)) {
    console.log(err)
    res.status(500).json("Generic Server Error")
  } else {
    res.status(err.status).json(err)
  }
}
