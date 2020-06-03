const Employee = require('./Employee.js');

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        this.role = "Engineer";
        this.github = github;
    }

    getGithub(){
        return this.github;
            // async function loadUser(user){
        //     return await axios.get(`https://api.github.com/users/${user}`, {
        //       headers: { 'Authorization': `token ${process.env.token}`}
        //     })
        //     .then((response) => response.data )
        //     .catch((error) => error )
        //   }

        // let fake = {
        //     login : 'Spazcool',
        //     email : 'douglas.wrightiii@gmail.com'
        // }

        // return fake.login;
    }
}

module.exports = Engineer;