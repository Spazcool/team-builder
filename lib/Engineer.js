const Employee = require('./lib/Employee.js');

class Engineer extends Employee {
    constructor(
        github
    ){
        super(name, id, email, role);
        this.github = github;
        this.role = "Engineer";
    }

    getGithub(github){
            // async function loadUser(user){
        //     return await axios.get(`https://api.github.com/users/${user}`, {
        //       headers: { 'Authorization': `token ${process.env.token}`}
        //     })
        //     .then((response) => response.data )
        //     .catch((error) => error )
        //   }

        let fake = {
            login : 'Spazcool',
            email : 'douglas.wrightiii@gmail.com'
        }

        return fake;
    
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

module.exports = Engineer;