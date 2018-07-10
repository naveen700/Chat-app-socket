var expect = require('expect');
var {
    generateMessage,
    generateLocationMessage
} = require('./message');


describe('generate Message ', () => {

    it('should generate correct message object', () => {
        var from =  "naveenranaMesage";
        var text= "hi this is naveen";
        var msg = generateMessage(from, text);
        // expect(msg.createdAt).toBeA('number');
       console.log(expect);
        expect(msg).toInclude({
            from: from,
            text: text
        })


    })


})


describe('generate location Message', () => {

    it('should generate location', (done) => {

        var user = 'admin';
        var lat = 28;
        var long = 77;
        var url = 'https://www.google.com/maps?q=280,77';
        var loc = generateLocationMessage(user, lat, long);
        // expect(loc.createdAt).toBeA('number');
        expect(loc).toInclude({
            from: user,
            url
        })





    })


})