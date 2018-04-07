require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT;

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

let app = express();
let server = http.createServer(app);
// web sockets server
let io = socketIO(server);
let users = new Users();

// middleware for static files
app.use(express.static(path.join(__dirname, '../public')));

// listen for a new connection, client connected to the server
// socket represents the individual connection to the server for the client user
io.on('connection', (socket) => {
  console.log('New user connected');



  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    // socket.leave(room)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // welcomes the user to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // informs other users that a new user has joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // send new message to all clients
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
})
