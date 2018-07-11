// https://infinite-savannah-35646.herokuapp.com/
const express = require('express');
//path  is  better api to handle the paths
const path = require('path');
const http = require('http');
// console.log(__dirname + '../public/index.html');  // old way to resolve path
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const {
    Users
} = require('./utils/users');



// console.log(publicPath);
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
const {
    isRealString
} = require('./utils/validation');
var app = express();

var server = http.createServer(app);

var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => { // when client gets connected
    // generally we do not attach anything to io other then connecct

    console.log('user connected');
    // socket.emit('newEmail', {
    //     from: 'naveenrana921@gmail.com',
    //     text: 'simple text message',
    //     createAt: new Date



    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) && !isRealString(params.room)) {
            return callback('Name and Root name are requred');
        }
        socket.join(params.room); // to join to the room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave('the office fans');


        //io.to('room no').emit() -> to emit to all in the room including myself
        // socket.broadcast.to('room n').emit() // to broadcast to all in the room except me
        //socket.emit() -> o target specific user

        socket.emit('newMessageEvent', generateMessage('Admin', 'welcome to chat app'));

        socket.broadcast.to(params.room).emit('newMessageEvent', generateMessage('admin', `${params.name} has joined the Room`));


        callback();

    })



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
        var user = users.getUser(socket.id);
        if(user   && isRealString(message.text)){
            io.to(user.room).emit('newMessageEvent', generateMessage(user.name, message.text))

        }


        callback();


    })

    socket.on('createLocationMessage', function (coords) {
       var user = users.getUser(socket.id);
       if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
       }

    });



    socket.on('disconnect', () => {
        // console.log('user is disconnected');
        var user = users.removeUser(socket.id);
        
        if(user){
            io.to(user.room).emit('updateUserList' , users.getUserList(user.room));
            io.to(user.room).emit('newMessageEvent', generateMessage('Admin',`${user.name} has left`));
        }

    });




})



server.listen(port, () => {

    console.log('server started at 3000', port);

})


// var add = () => {
//     return new Promise((reject, resolve) => {

//         var c = a + b;
//         if(c){
//             resolve(c);
//         }
//         else{
//             reject();
//         }

//     })
// };
// add().then((data)=>{console.log(data);} ,() =>{}   )