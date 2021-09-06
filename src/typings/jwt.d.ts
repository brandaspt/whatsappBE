import { IUserDocument } from "./users"

export interface IJWTPayload {
  _id: IUserDocument["_id"]
}
