const fs = require('fs');

class TicketControl {

    constructor() {
        this.last = 0; //Last ticket
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];
        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        } else {
            this.restartCounting();
        }
    }

    restartCounting() {

        this.last = 0;
        this.tickets = [];
        this.last4 = [];
        console.log('System has been restarted');
        this.saveFile();

    }

    next() {

        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${this.last}`;

    }

    saveFile() {

        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLast4Tickets() {
        return this.last4;
    }

    serveTicket(desk) {
        if (this.tickets.length === 0) {
            return 'Currently, there are no tickets on the queue';
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift(); //Here we delete the first element of the array

        let ticketServed = new Ticket(ticketNumber, desk);

        this.last4.unshift(ticketServed); //Here we append to first index of array, this ticket

        if (this.last4.length > 4) {
            this.last4.pop();
        }

        console.log('Last 4 tickets: ', this.last4);

        this.saveFile();

        return ticketServed;
    }

}

class Ticket {

    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }

}

module.exports = {
    TicketControl
}