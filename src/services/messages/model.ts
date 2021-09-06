import mongoose from "mongoose"
import { IMessageDocument } from "../../typings/messages"

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
    replyTo: { type: Schema.Types.ObjectId, ref: "Message" },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default model<IMessageDocument>("Message", MessageSchema)
