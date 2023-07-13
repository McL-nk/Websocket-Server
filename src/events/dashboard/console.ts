import { Socket, Server } from "socket.io";
import { Connections, dashConnections } from "../../index"

module.exports = {
    name: "console",
    once: false,
    Callback: async (args: any, socket: Socket, io: Server) => {
        if(dashConnections[args.UUID]){
           let sockets = dashConnections[args.UUID].sockets
                console.log(sockets)
                 io.to(sockets).emit("Console", args.message)
            
        }


    }
}

