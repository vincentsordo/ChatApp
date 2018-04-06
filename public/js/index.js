//initiating a request from the client to the server
let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(locationMessage) {
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${locationMessage.from}: `);
  a.attr('href', locationMessage.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#messageForm').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(data) {
    console.log(data);
  });
});

let sendLocationButton = jQuery('#sendLocationButton');
sendLocationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  })
});
