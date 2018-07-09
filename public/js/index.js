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

   // console.log(message.from + message.text + message.createdAt);
    var li = jQuery('<li></li>');// to create element using jquery
    li.text(`${message.from}: ${message.text}`); // to add contet to element

    jQuery('#messages').append(li);


})

//using jquery here
// we can use selector jQuery or the $ --> both are selector
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessageEvent', {
            from: 'user',
            text: $('[name = message]').val()
        }, function () {

        }

    )


});




// socket.emit('createMessageEvent' , {
//         from : 'praveen',
//         text: 'yup hey nassada'
// });

// socket.emit('createEmail', {
//     to: 'shivamshakya91@gmail.com',
//     msg: 'hi how are you doing'
// });

// to broadcast 
// socket.emit('createMessageEvent', {
//     from: 'naveen',
//     text: 'Heyy',

// }, function (data) {
//     console.log('Got it,', data);

// })
