//establecer conexión con el socket
let socket = io();
let lbl_ticket = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log("conectado al servidor");
});

socket.on('disconnect', () => {
    console.log("Desconectado del servidor");
});

socket.on('estadoActual', (data) => {
    lbl_ticket.text(data.lastTicket);
});

//Manipulando el DOM
$('#btn-generar-ticket').on('click', function() {
    
    socket.emit('siguienteTicket', null, (ticket) => {
        lbl_ticket.text(ticket);
    })
});