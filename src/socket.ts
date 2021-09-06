import { createServer } from "http"
import { Server } from "socket.io"
import app from "./server"
import GroupsModel from "./services/groups/model"

const server = createServer(app)

const io = new Server(server, { allowEIO3: true })

// adding "event listeners"
io.on("connection", (socket) => {
  socket.on("login", (id, groups) => {
    socket.broadcast.emit("online", { id })

    socket.join(groups)
  })

  socket.on("sendMessage", async ({ message, room }) => {
    const newMessage = { ...message }

    await GroupsModel.findByIdAndUpdate(room, {
      $push: {
        messageHistory: newMessage._id,
      },
    })

    socket.to(room).emit("message", newMessage)
  })
})

export default server
