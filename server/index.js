import express from 'express'
import { Server } from "socket.io"

const PORT = 3500

const app = express()

const expressApp = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const io = new Server(expressApp, {
    cors: {
        origin: "*",
    },
})

io.on('connection', socket => {
    console.log (`User ${socket.id} connected`)

    socket.emit('message', "Welcome to Chat App!")

    socket.broadcast.emit('message', `${socket.id} has joined the chat`)

    socket.on('message', message => {
        io.emit('message', `${socket.id}: ${message}`)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `${socket.id} has left the chat`)
    })

    socket.on('typing', message => {
        socket.broadcast.emit('typing', message)
    })
})
