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
    // generally we do not attach anything to io other then connecct

    console.log('user connected');
    // socket.emit('newEmail', {
    //     from: 'naveenrana921@gmail.com',
    //     text: 'simple text message',
    //     createAt: new Date



    // }); //scoket.emit is used to fire the evnets

    // socket.on('createEmail', (newMail) => {
    //     console.log('created email event',newMail );

    // });
 
    socket.emit('newMessageEvent', {
        from :'naveen rana',
        text : 'hii this is naveen',
        createdAt :  new Date().getTime() 

    } )

    socket.on('createMessageEvent' , (message) => {
        console.log(message);

    }) 
    socket.on('disconnect', () => {
        console.log('user is disconnected');
    });




})



server.listen(port, () => {

    console.log('server started at 3000', port);

})