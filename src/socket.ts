import { createServer } from "http"
import { Server } from "socket.io"
import app from "./server"
import MessageModel from "./services/messages/model"
import GroupsModel from "./services/groups/model"

const server = createServer(app)

const io = new Server(server, { allowEIO3: true })

io.engine.generateId = function (req: any) {
  console.log(req)
  return 1
}

// adding "event listeners"
io.on("connection", (socket) => {
  console.log(socket.id)

  socket.on("login", (id, groups) => {
    // tell all the users im online
    socket.broadcast.emit("online", { id })

    // connect to all the groups
    socket.join(groups)
  })

  socket.on("sendMessage", async ({ message, room }) => {
    const newMessage = await new MessageModel(message).save()

    await GroupsModel.findByIdAndUpdate(room, {
      $push: {
        messageHistory: newMessage._id,
      },
    })

    socket.to(room).emit("message", newMessage)
  })
  //   socket.on("login", ({ username, room }) => {
  //     // shared.onlineUsers.push({ username, id: socket.id, room })

  //     socket.join(room)
  //     console.log(socket.rooms)

  //     // Emits to everyone excluding this client
  //     socket.broadcast.emit("newLogin")
  //     socket.emit("loggedin")
  //   })

  // //   socket.on("disconnect", () => {
  // //     //console.log("socket disconnected")
  // //     shared.onlineUsers = shared.onlineUsers.filter((user) => user.id !== socket.id)
  // //   })
})

export default server
