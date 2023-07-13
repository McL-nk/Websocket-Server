import { Socket } from "socket.io";
import { serverConnections } from "../../index"
module.exports = {
    name: "Connect",
    once: true,
    Callback: async (args: any, socket: Socket) => {
      console.log("connect")
      console.log(args)
                serverConnections[args.UUID] = {
                  "SocketID": socket.id,
                   "ServerUUID": args.UUID,
                }
           
    }
}

