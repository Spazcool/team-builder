const Employee = require('./Employee.js');

class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email);
        this.role = "Intern";
        this.school = school;
    }

    getSchool(school){
        return this.school;
    }
}

module.exports = Intern;