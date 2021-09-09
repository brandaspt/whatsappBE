import { createServer } from "http"
import { Server } from "socket.io"
import app from "./server"
import GroupsModel from "./services/groups/model"
import { ISocketDictionary } from "./typings/sockets"

const server = createServer(app)

const io = new Server(server, { allowEIO3: true })

const sockets: ISocketDictionary = {}

// adding "event listeners"
io.on("connection", socket => {
  socket.on("setId", id => {
    console.log(id)
    sockets[id as string] = socket
  })
  socket.on("joinGroups", groups => {
    socket.join(groups)
    console.log(socket.rooms)
  })

  socket.on("newMessage", ({ message, room }) => {
    io.to(room).emit("message", { message: message.data, room })
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
