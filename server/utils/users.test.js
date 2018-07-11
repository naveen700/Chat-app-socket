const expect = require('expect');

const {
    Users
} = require('./users');






describe('generate user object', () => {

    var users;

    beforeEach(() => {
        users =  new Users();
        users.users = [{
          id : '1',
          name : 'Mike',
          room : 'Node Course'

        },{
            id : '2',
            name : 'Naveen',
            room : 'Hero Course'
  
          },
          {
            id : '3',
            name : 'Shailesh',
            room : 'angular'
  
          },
          {
            id : '4',
            name : 'shivam',
            room : 'Node Course'
  
          }
    
    
    
    
    
    
    
    
    ]


    });















    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'naveen',
            room: 'the office room'
        };
        var reuser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);


    })


    it('should return the name lis of all user in particuar room', ()=>{

        var userList  =  users.getUserList('Node Course');
        expect(userList).toEqual(['mike', 'shivam']);

    })







})