const Employee = require('./Employee.js');

class Intern extends Employee {
    constructor(name, id, email, role, school){
        super();
        this.name = name;
        this.id = id;
        this.email = email;
        this.school = school;
        this.role = role;
    }

    getSchool(school){
        return this.school;
    }
}

module.exports = Intern;