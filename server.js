const express = require('express');
const http = require('http');
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"]
    }
});
var contagem = 0;
io.on('connection', (socket) => {
    contagem++
    io.sockets.emit('broadcast', contagem)
    console.log(`usuario ${socket.id} conectado`)

    socket.on('mensagem', data => {
      
        socket.broadcast.emit('mensagem:recebida', data)
    }); 

    socket.on('disconnect', () => {
        console.log(`usuario ${socket.id} desconectado.`)  
        contagem--
        io.sockets.emit('broadcast', contagem)
    });
});

server.listen(3000, () => {
    console.log('O chat server está rodando na porta 3000')
})