import { WebSocketServer } from "ws"

const port = 3001

const wss = new WebSocketServer({ port }, () => {
  console.log(`WebSocket server listening on port ${port}`)
})

wss.on("error", console.error)

wss.on("connection", socket => {
  console.log("Socket opened by client")

  socket.on("error", console.error)

  socket.on("close", () => console.log("Socket closed by client"))

  socket.on("message", (data, binary) => {
    wss.clients.forEach(c => c !== socket && c.send(data, { binary }))
  })

  socket.send("Liebling, es ist aus")
})