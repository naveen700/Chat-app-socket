var socket = io();
socket.on('connect', function () {
    console.log('connected to the server');
    var params = jQuery.deparam(window.location.search);
    //location is an object present in the js to access the param send from the user
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    })
});

socket.on('updateUserList', function(users){

    var ol = jQuery('<ol> </ol>');
    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));

    }); 

    jQuery('#users').html(ol);



})


socket.on('disconnect', function () {
    console.log('disconnected from the server');

});



// socket.on('newEmail', function (email) {

//     console.log('new email', email.from + "\n" + email.text, email);

// })



socket.on('newMessageEvent', (message) => {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // // console.log(message.from + message.text + message.createdAt);
    // var li = jQuery('<li></li>'); // to create element using jquery
    // li.text(`${message.from}:${formattedTime} :     ${message.text}`); // to add contet to element

    // jQuery('#messages').append(li);
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();



})
// this is for autoscrolling 
function scrollToBottom() {
    // selectors  
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // heights, prop  is used to fetch the property it is cross browser compatible
    var clientHeight = messages.prop('clientHeight');
    var scrolltop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrolltop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        // console.log('should scroll');
        messages.scrollTop(scrollHeight);

    }

}


socket.on('newLocationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>')
    // li.text(`${message.from} : ${formattedTime} `);

    // a.attr('href', message.url); //if we pass singe value to it thenit fetches the content of attribute and if we pass two values then its going to replace
    // li.append(a);
    // jQuery('#messages').append(li);
    var template = jQuery('#location-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    jQuery('#messages').append(html);
    scrollToBottom();



})
















//using jquery here
// we can use selector jQuery or the $ --> both are selector
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery(`[name=message]`);
    socket.emit('createMessageEvent', {
          text: messageTextBox.val()
        }, function () {
            messageTextBox.val('');
        }

    )





});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation does not supported');

    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');


    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position);
        locationButton.removeAttr('disabled').text('Send');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })


    }, function () {
        locationButton.removeAttr('disabled').text('Send');
        console.log('user denied  the access to location');
    })



})






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