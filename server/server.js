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
const {generateMessage,generateLocationMessage} = require('./utils/message');

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

    socket.emit('newMessageEvent', generateMessage('Admin', 'welcome to chat app'));

    socket.broadcast.emit('newMessageEvent', generateMessage('admin', 'new user joined'));




    // }); //scoket.emit is used to fire the evnets

    // socket.on('createEmail', (newMail) => {
    //     console.log('created email event',newMail );

    // });

    // socket.emit('newMessageEvent', {
    //     from: 'naveen rana',
    //     text: 'hii this is naveen',
    //     createdAt: new Date().getTime()

    // })

    socket.on('createMessageEvent', (message, callback) => {
        //console.log(message);
        // io.emit is used to broadcast to every user connected to the server
        io.emit('newMessageEvent', generateMessage(message.from, message.text))
        //to broacast to other  socket to ourself
        // socket.broadcast.emit('newMessageEvent', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
        callback();


    })

    socket.on('createLocationMessage', function (coords) {
        io.emit('newLocationMessage', generateLocationMessage('Admin' ,coords.latitude, coords.longitude))


    });



    socket.on('disconnect', () => {
        console.log('user is disconnected');
    });




})



server.listen(port, () => {

    console.log('server started at 3000', port);

})