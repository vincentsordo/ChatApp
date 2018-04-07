//initiating a request from the client to the server
let socket = io();

function scrollToBottom () {
  // selectors
  let messages = jQuery('#messages');
  let newMessage = messages.children('li:last-child');
  //heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server');
  let params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if(err) {
      alert(err);
      window.location.href = "/";
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append('<li></li>').text(user);
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
  let template = jQuery('#messageTemplate').html();
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(locationMessage) {
  let template = jQuery('#locationMessageTemplate').html();
  var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
  let html = Mustache.render(template, {
    from: locationMessage.from,
    url: locationMessage.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#messageForm').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(data) {
    jQuery('[name=message]').val('');
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
