require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT;

const {generateMessage} = require('./utils/message');

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
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // informs other users that a new user has joined
  socket.broadcast.emit('newMessage', generateMessage('Admin','New user has joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // send new message to all clients
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
})
