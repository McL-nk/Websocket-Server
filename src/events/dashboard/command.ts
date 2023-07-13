import {  Server, Socket } from "socket.io";
import { serverConnections } from "../../index"


module.exports = {
    name: "command",
    once: false,
    Callback: async (args: any, socket: Socket, io: Server) => {
 
    const socketid = serverConnections[args.UUID] ? serverConnections[args.UUID].SocketID : null
   
    if(!socketid){
   
        socket.emit("error", true)
        return
    }
    
 
    socket.emit("executed", true)
    io.to(socketid).emit("command", args.command)
    }
}

