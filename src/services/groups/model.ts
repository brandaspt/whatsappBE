import mongoose from "mongoose"
import { IGroupDocument } from "src/typings/group"
import { IMessageDocument } from "src/typings/messages"

const { Schema, model } = mongoose

const MessageSchema = new Schema<IMessageDocument>(
  {
    content: String,
    attachments: [String],
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    replyTo: Schema.Types.ObjectId,
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const GroupSchema = new Schema<IGroupDocument>(
  {
    title: {
      type: String,
      required: false,
    },
    messageHistory: [MessageSchema],
    avatar: {
      type: String,
    },
    description: String,
    background: String,
    users: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["ADMIN", "GUEST"],
          default: "GUEST",
        },
        banned: {
          type: Boolean,
          default: false,
        },
      },
    ],
    closed: Boolean,
    groupType: {
      type: String,
      enum: ["PRIVATE", "PUBLIC"],
      required: true,
    },
  },
  { timestamps: true }
)

GroupSchema.methods.toJSON = function () {
  const group = this.toObject()
  delete group.__v
  return group
}

export default model<IGroupDocument>("Group", GroupSchema)
