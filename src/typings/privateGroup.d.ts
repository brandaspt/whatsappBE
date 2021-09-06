import { Document } from "mongoose"
import { IMessageDocument } from "./messages"

export interface IPrivateGroup {
  users: [string, string]
  messageHistory: any
}

export interface IPrivateGroupDocument extends Document, IPrivateGroup {}
