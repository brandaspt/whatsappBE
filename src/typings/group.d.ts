import { Document, Schema } from "mongoose"
import { IMessage } from "./messages"

export interface IGroup {
  title: string
  messageHistory: IMessage[]
  avatar: string
  description?: string
  background?: string
  users: [
    {
      _id: Schema.Types.ObjectId
      role: string
      banned: boolean
    }
  ]
  closed?: boolean
  groupType: string
}

export interface IGroupDocument extends Document, IGroup {}
