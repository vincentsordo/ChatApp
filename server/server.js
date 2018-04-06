require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');

const socketIO = require('socket.io');

const port = process.env.PORT;

let app = express();
let server = http.createServer(app);
// web sockets server
let io = socketIO(server);

// middleware for static files
app.use(express.static(path.join(__dirname, '../public')));

// listen for a new connection, client connected to the server
// socket represents the individual connection to the server for the client user
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'mike',
    text: 'what is going on',
    createAt: 23
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    socket.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
})
