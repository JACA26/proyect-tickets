const fs = require('fs');
const path = require('path');

class TicketControl {
    
    constructor() {
        
        /* *** Propiedades *** */
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.last4 = [];
        let data = require('../data/ticket-data.json');
        
        if(data.hoy === this.hoy){
            
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.last4 = data.last4;
            
        }else {
            this.restartTicket();
        }
    }
    
    
    /*  *** Métodos *** */
    //pasar al siguiente ticket
    nextTicket(){
        this.ultimo += 1;
        let ticket = new TicketPendiente(this.ultimo, null);
        this.tickets.push(ticket);
        this.updateData();
        return `Ticket número: ${this.ultimo}`;
    }
    
    //retornar el último ticket
    getLastTicket(){
        return `Ticket número: ${this.ultimo}`;
    }
    
    getLast4Tickets(){
        return this.last4;
    }
    //atender al ticket
    attendTicket(escritorio){
        if(this.tickets.length === 0){
            return "No hay tickets pendientes";
        }
        
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new TicketPendiente(numeroTicket, escritorio);
        this.last4.unshift(atenderTicket);
        
        if(this.last4.length > 4){
            this.last4.splice(-1,1); //delete last element
        }
        
        console.log('Ultimos 4');
        console.log(this.last4);
        this.updateData();
        
        return atenderTicket;
    }
    
    
    //volver a iniciar los datos
    restartTicket(){
        this.ultimo = 0;
        this.tickets = [];
        this.last4 = [];
        this.updateData();
        console.log('datos reinicializador correctamente');
    }
    
    //grabar datos en el archivo json
    updateData(){
        
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            last4: this.last4
        }
        
        const jsonDataString = JSON.stringify(jsonData);
        const pathjsonData = path.resolve(__dirname, '../data/ticket-data.json');
        
        if(fs.existsSync(pathjsonData)){
            fs.writeFileSync(pathjsonData, jsonDataString);
        }
    }
}


class TicketPendiente {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
module.exports = {
    TicketControl
}