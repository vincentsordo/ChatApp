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

  // welcomes the user to the chat app
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  // informs other users that a new user has joined
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user has joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
})
