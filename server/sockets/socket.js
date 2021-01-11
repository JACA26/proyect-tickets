const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-controller');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    
    console.log('Usuario conectado');
    
    client.on('siguienteTicket', (data, callback) => {
        const ticket = ticketControl.nextTicket();
        console.log(ticket);
        callback(ticket);
    });
    
    //enviar el estado actual con el ultimo ticket
    client.emit('estadoActual', {
        lastTicket: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4Tickets()
    });
    
    
    //atender el ticket
    client.on('atenderTicket', (data, callback) => {
        
        if(!data.escritorio){
            return callback({
                err: true,
                message: "El escritorio es necesario"
            })
        }
        
        let atenderTicket = ticketControl.attendTicket(data.escritorio);
        callback(atenderTicket);
        
        //enviar el refresh de los 4 ultimos
        client.broadcast.emit('refreshLast4',{
            last4: ticketControl.getLast4Tickets()})
    });
    
});