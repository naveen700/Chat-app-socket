const expect =  require('expect');
const {isRealString} =  require('./validation');

describe('validation test' , ()  => {

    it('test the validation' , ()=>{
        var validData  =  isRealString('naveenrana');
        var space = isRealString('   ');
        
        expect(validData).toBeA('string');
        expect(space).toBe('string');

    })





})