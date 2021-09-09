import { Socket } from "socket.io"

export interface ISocketDictionary {
  [key: string]: Socket
}
