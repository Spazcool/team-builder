const Employee = require('./lib/Employee.js');

class Intern extends Employee {
    constructor(
        school
    ){
        super(name, id, email, role);
        this.school = school;
        this.role = "Intern";
    }

    getSchool(school){
        return this.school;
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

module.exports = Intern;