import { Document } from "mongoose"
import { IMessageDocument } from "./messages"

export interface IGroup {
  title: string
  messageHistory: [string]
  avatar: string
  description?: string
  background?: string
  users: [
    {
      userId: string
      role: ["admin", "guest"]
      banned: boolean
    }
  ]
}

export interface IGroupDocument extends Document, IGroup {}
