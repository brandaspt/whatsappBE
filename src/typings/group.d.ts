import { Document, Schema } from "mongoose"
import { IMessageDocument } from "./messages"

export interface IGroup {
  title: string
  messageHistory: any
  avatar: string
  description?: string
  background?: string
  users: [
    {
      userId: Schema.Types.ObjectId
      role: ["admin", "guest"]
      banned: boolean
    }
  ]
}

export interface IGroupDocument extends Document, IGroup {}
