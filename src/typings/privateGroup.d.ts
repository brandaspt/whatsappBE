import { Document } from "mongoose"
import { IMessageDocument } from "./messages"

export interface IPrivateGroup {
  users: [string, string]
  messageHistory: [string]
}

export interface IPrivateGroupDocument extends Document, IPrivateGroup {}
