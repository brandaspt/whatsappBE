import { Document } from "mongoose"

export interface IMessage {
  content?: string
  attachments: [string]
  sender: Schema.Types.ObjectId
  replyTo?: Schema.Types.ObjectId
  deleted?: boolean
}

export interface IMessageDocument extends Document, IMessage {}
