const Employee = require('./lib/Employee.js');

class Manager extends Employee {
    constructor(
        officeNumber
    ){
        super(name, id, email, role);
        this.role = "Manager";
    }

    // getName(){
    //     return this.name;
    // }
    
    // getId(){
    //     return this.id;
    // }

    // getEmail(){
    //     return this.email;
    // }
    
    // getRole(){
    //     return this.role;
    // }
}

module.exports = Manager;