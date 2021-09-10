import { createServer } from "http"
import { Server } from "socket.io"
import app from "./server"
import GroupsModel from "./services/groups/model"
import { ISocketDictionary } from "./typings/sockets"
import { IUser, IUserDocument } from "./typings/users"

const server = createServer(app)

const io = new Server(server, { allowEIO3: true })

const sockets: ISocketDictionary = {}

// adding "event listeners"
io.on("connection", (socket) => {
  socket.on("setId", (id) => {
    sockets[id as string] = socket
  })
  socket.on("joinGroups", (groups) => {
    socket.join(groups)
  })

  socket.on("createdGroup", (groupId) => {
    socket.join(groupId)
  })

  socket.on("newMessage", ({ message, room }) => {
    io.to(room).emit("message", { message: message.data, room })
  })

  socket.on("invitedPeople", (data) => {
    const users = data.users
    const group = data.group
    const myId = data.myId

    const userIdArray = Object.keys(users)
    const userSockets = userIdArray.map((u: string) => sockets[u])

    for (const socketInvited of userSockets) {
      socketInvited.join(group._id)
    }

    const userSocketsId = userIdArray
      .map((u: string) => sockets[u].id)
      .filter((id) => id !== sockets[myId].id)

    io.to(userSocketsId).emit("invited", { group, users })
  })

  socket.on("inviteToPrivate", ({ users, group, myId }) => {
    const userIdArray = Object.keys(users)
    const userSockets = userIdArray.map((u: string) => sockets[u])

    for (const socketInvited of userSockets) {
      socketInvited.join(group._id)
    }

    const userSocketsId = userIdArray
      .map((u: string) => sockets[u].id)
      .filter((id) => id !== sockets[myId].id)
    io.to(userSocketsId).emit("invited", { group, users })
  })

  socket.on("typing", (groupId) => {
    socket.broadcast.to(groupId).emit("typing", {
      groupId,
      userId: Object.keys(sockets).find((key) => sockets[key].id === socket.id),
    })
  })
})

export default server
