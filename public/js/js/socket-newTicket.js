//Command to stablish conection
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected to the server');
});

socket.on('currentTicket', function(resp) {
    console.log(resp);
    label.text(resp.current)
});

//'$' symbol is for Jquery
$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});