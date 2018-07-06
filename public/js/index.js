var socket = io();
socket.on('connect', function () {
    console.log('connected to the server');
});
socket.on('disconnect', function () {
    console.log('disconnected from the server');
});
// socket.on('newEmail', function (email) {

//     console.log('new email', email.from + "\n" + email.text, email);

// })

socket.on('newMessageEvent', (message) => {

    console.log(message.from + message.text);



})


socket.emit('createMessageEvent' , {
        from : 'praveen',
        text: 'yup hey nassada'
});

// socket.emit('createEmail', {
//     to: 'shivamshakya91@gmail.com',
//     msg: 'hi how are you doing'
// });