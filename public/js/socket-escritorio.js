//establecer conexión con el socket
let socket = io();
let searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio')){
    
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
    
}

let escritorio = searchParams.get('escritorio');
let lbl_small = $('small');

$('#title').text('Escritorio: ' + escritorio);

$('#atender-siguiente').on('click', () => {
    
    socket.emit('atenderTicket', {escritorio: escritorio}, (resp) => {
        
        if(resp === 'No hay tickets pendientes'){
            alert(resp);
            lbl_small.text(`Ticket número: ${resp}`);
        }else{
            lbl_small.text(`Ticket número: ${resp.numero}`);
        }
        
    })
});

