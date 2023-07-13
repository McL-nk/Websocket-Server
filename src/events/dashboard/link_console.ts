import { Socket } from "socket.io";
import { Connections, dashConnections } from "../../index"


module.exports = {
    name: "link_console",
    once: false,
    Callback: async (args: any, socket: Socket) => {
      console.log(args)
      console.log("link server")
      
      let id = socket.id as unknown as number


        if(Connections[id] == null){
          Connections[id] == args
        }

        if(dashConnections[args] == null){
          dashConnections[args] = {sockets: []}
        }
     
        if(dashConnections[args].sockets.includes(socket.id)) return
        dashConnections[args].sockets.push(socket.id)
     
       
    }
}

