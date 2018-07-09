var expect = require('expect');
var {generateMessage} = require('./message');


describe('generate Message ', () => {

    it('should generate correct message object' , ()=>{

        var msg = generateMessage("naveenranaMesage","hi this is naveen");
        expect(msg.createdAt).toBeA('number');
        expect(msg).toInclude({
            from : from,
            text :text 
        })


    })
 

})