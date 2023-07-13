import { Socket } from "socket.io";
import { dashConnections } from "../../index"



module.exports = {
    name: "unlink_console",
    once: false,
    Callback: async (args: any, socket: Socket) => {
      console.log(args)
      console.log("unlink server")
          
     

     
        if(dashConnections[args].sockets.includes(socket.id)){
        let index = dashConnections[args].sockets.indexOf(socket.id)
        dashConnections[args].sockets.splice(index, 1)
        }
        console.log(dashConnections[args])
    }
}

