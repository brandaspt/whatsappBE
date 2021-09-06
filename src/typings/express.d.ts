import * as express from "express"
import { IUserDocument } from "./users"

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument
    }
  }
}
