import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import chalk from "chalk"
import * as fs from "fs"
import * as path from "path"

let Connections: any[] = []
let dashConnections: any[] = []
let serverConnections: any[] = []

export { Connections, dashConnections, serverConnections }

let events: any[] = []

async function scan(root: string, dir: string) {
    const files = fs.readdirSync(path.join(`${__dirname}/.././${root}`, dir))
    for (const file of files) {
        const stat = fs.lstatSync(path.join(`${__dirname}/.././${root}`, dir, file))
       
        if (stat.isDirectory()) {
            scan(root, path.join(dir, file))
        } else {
            let event =  require(path.join(`${__dirname}/.././${root}`, dir, file))
            console.log(chalk.blue("[Info]: ") + `Loaded event: ${event.name}`)
            events.push(event)
        }
    }
}

(()=> {
    scan("src", "events")
})()

const app = express()
const httpServer = createServer(app)
export const io = new Server(httpServer, {cors: {origin: "http://localhost:3000", credentials: true} } )

io.on("connection", (socket) => {
    for(const event of events){
        if(event.once){
            socket.once(event.name, (args:any) => {event.Callback(args, socket, io)})
        }else{
            socket.on(event.name, (args:any) => {event.Callback(args, socket, io)})
        }
    }
})

httpServer.listen(8080, () => { console.log(chalk.green("[Info]: ") + "Http server listening on port 8080") } )
