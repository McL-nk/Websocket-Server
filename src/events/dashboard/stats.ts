import { Socket, Server } from "socket.io";
import { isObjectBindingPattern } from "typescript";
import { dashConnections } from "../../index"


module.exports = {
    name: "stats",
    once: false,
    Callback: async (args:any, socket: Socket, io: Server) => {
        if(dashConnections[args.UUID]){
         
            for(const socket of dashConnections[args.UUID].sockets){
             
                io.to(`${socket}`).emit("Stats", args.message)
            }
        }


    }
}