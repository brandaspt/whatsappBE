import mongoose from "mongoose"
import { IGroupDocument } from "src/typings/group"
import { IMessageDocument } from "src/typings/messages"

const { Schema, model } = mongoose

const AutoIncrement = require("mongoose-sequence")(mongoose)

const MessageSchema = new Schema<IMessageDocument>(
  {
    _id: Number,
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
  { timestamps: true, _id: false }
)

MessageSchema.plugin(AutoIncrement)

const GroupSchema = new Schema<IGroupDocument>(
  {
    title: {
      type: String,
      required: false,
    },
    messageHistory: [MessageSchema],
    avatar: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=http%3A%2F%2Fgetdrawings.com%2Fwhatsapp-group-icon-images-for-friends&psig=AOvVaw3MjmykrKIX7R8MgE0LFdGL&ust=1631007723474000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCZq7-H6vICFQAAAAAdAAAAABAD",
    },
    description: String,
    background: String,
    users: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        role: {
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
      enum: ["PRIVATE, PUBLIC"],
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
