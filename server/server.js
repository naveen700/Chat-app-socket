// https://infinite-savannah-35646.herokuapp.com/
const express = require('express');
//path  is  better api to handle the paths
const path = require('path');
const http = require('http');
// console.log(__dirname + '../public/index.html');  // old way to resolve path
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { // when client gets connected


    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user is disconnected');
    });


})



server.listen(port, () => {

    console.log('server started at 3000', port);

})