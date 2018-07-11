// class  Person{ 

//  constructor(name, age){
//     this.name =  name;
//     this.age =  age;
//  }

//  getUserDescription(){

//     return ` ${this.name} is ${this.age} year old`;
//  }






// }


// var me =  new Person('naveen',22);  
// console.log(me.getUserDescription());

class Users {
    constructor() {
        this.users = [];

    }

    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        };
        this.users.push(user);
        //    console.log(this.users);

    }


    removeUser(id) {
        //remove the user by id
        var user = this.getUser(id);
        console.log(user);
        
        if (user) {
            this.users = this.users.filter((userss) =>userss.id !== id);
        } 
       

        return user;

    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        //console.log(this.users);
        var users = this.users.filter((user) => {

            return user.room === room;

        });

        ///map can e used to fetch the name only from the object
        var namesArray = users.map((user) => user.name);
        
        return namesArray;



    }





}

module.exports = {
    Users
};