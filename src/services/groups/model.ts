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
    // replyTo: { type: Schema.Types.ObjectId, ref: "Message" },
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
      default:
        "https://www.google.com/url?sa=i&url=http%3A%2F%2Fgetdrawings.com%2Fwhatsapp-group-icon-images-for-friends&psig=AOvVaw3MjmykrKIX7R8MgE0LFdGL&ust=1631007723474000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCZq7-H6vICFQAAAAAdAAAAABAD",
    },
    description: String,
    background: String,
    users: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        role: {
          type: ["admin", "guest"],
          default: "guest",
        },
        banned: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
)

GroupSchema.methods.toJSON = function () {
  const group = this.toObject()
  delete group.__v
  return group
}

export default model<IGroupDocument>("Group", GroupSchema)
