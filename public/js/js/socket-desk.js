//Command to stablish conection
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html'; //Leave current page
    throw new Error('Desk parameter must be provided')
}

var desk = searchParams.get('desk');
var label = $('small');

$('h1').text('Desk: ' + desk);

$('button').on('click', function() {

    socket.emit('serveTicket', { desk: desk }, function(resp) {
        if (resp === 'Currently, there are no tickets on the queue') {
            alert(resp);
            label.text('There are no more tickets')
            return
        }
        label.text('Ticket: ' + resp.number)
    })

});