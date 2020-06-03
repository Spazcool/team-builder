const Employee = require('./Employee.js');

class Manager extends Employee {
    constructor(name, id, email, role, officeNumber){
        super();
        this.name = name;
        this.officeNumber = officeNumber;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager;