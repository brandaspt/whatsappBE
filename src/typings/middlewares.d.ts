import { Request, Response, NextFunction } from "express"
import createError from "http-errors"

export type TMiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void
export type TErrorMiddlewareFunction = (err: createError.HttpError, req: Request, res: Response, next: NextFunction) => void
