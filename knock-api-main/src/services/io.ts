import { Server } from 'socket.io'

import { TokenPayload, verifyToken } from '../security'

let io: Server

export default (httpServer: any) => {
  // Set up Socket.IO server.
  io = new Server(httpServer, {
    serveClient: false,
    cors: {
      origin: '*',
    },
  })

  io.use((socket, next) => {
    try {
      const { id } = <TokenPayload>verifyToken(socket.handshake.auth.token)
      const s = socket as any
      s.userId = id
    } catch (e) {
      return next(new Error('Failed to verify JWT token.'))
    }
    next()
  })

  return io
}

export {
  io
}
