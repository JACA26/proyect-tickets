//================
// == REQUIRES ==
//================

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
let server = require('http').createServer(app);
module.exports.io = socketIO(server);

//public path
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
require('./sockets/socket');


server.listen(port, (err) => {
    
    if (err) throw new Error(err);
    
    console.log(`Servidor corriendo en puerto ${ port }`);
    
});