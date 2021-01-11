//establecer conexión con el socket
let socket = io();

socket.on('estadoActual', (data) => {
    
    updateHTML(data);
});

socket.on('refreshLast4', (data) => {
    var audio = new Audio('./audio/new-ticket.mp3');
    audio.play();
    updateHTML(data);
});

function updateHTML(data){
    
    for(var i = 0; i < 4; i++){
        $(`#lblTicket${i+1}`).text('Ticket: '+data.last4[i].numero);
        $(`#lblEscritorio${i+1}`).text('Escritorio: '+data.last4[i].escritorio);
    }
}
