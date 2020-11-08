const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.next();
        console.log(next);

        callback(next)
    });

    client.emit('currentTicket', {
        current: ticketControl.getLastTicket(),
        last4Tickets: ticketControl.getLast4Tickets()
    });

    client.on('serveTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'Desk must be provided'
            })
        }

        let serveTicket = ticketControl.serveTicket(data.desk);
        callback(serveTicket)

        client.broadcast.emit('last4', {
            last4: ticketControl.getLast4Tickets()
        })
    });

});