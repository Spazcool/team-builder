const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const axios = require('axios');
const emoji = require('node-emoji')
require('dotenv').config();
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");

const questions = {
    team : [
        {
            type: 'input',
            name: 'team',
            message: 'Team Name: (optional)'
        }
    ],

    common : [
        {
            type: 'list',
            name: 'role',
            message: "Role: ",
            choices: ["Manager", "Engineer", "Intern"]
        }, 
        {
            type: 'input',
            name: 'name',
            message: "Name: ",
            validate: function(input){
                if(input.length > 0){
                    return true;
                }
                return 'Please input a name.';
            }
        }, 
        {
            type: 'input',
            name: 'email',
            message: "Email: ",
            validate: (input) => {
                let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                if(valid.test(input)){
                    return true;
                }
                return 'Please input a valid email.';
            }
        }
    ],

    manager : [
        {
            type: 'input',
            name: 'officeNumber',
            message: "Office Number: ",
            validate: (input) => {
                if(!isNaN(input)){
                    return true;
                }
                return 'Please input a number.';
            }
        }
    ],

    engineer : [
        {
            type: 'input',
            name: 'github',
            message: "Github Username: ",
            validate: async (input) => {
                if(await isValidAcct(input)){
                    return true;
                }
                return 'Please input a valid Github username.';
            }    
        }
    ],

    intern : [
        {
            type: 'input',
            name: 'school',
            message: "School: ",
            validate: function(input){
                if(input.length > 0){
                    return true;
                }
                return 'Please input a school.';
            }
        }
    ],
    
    add : [
        {
            type: 'confirm',
            name: 'continue',
            message: "Add another employee? ",
        }
    ]
};

function writeToFile(data, fileName) {
    let outputPath = path.join(OUTPUT_DIR, `${fileName}.html`);
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR,  (error) => {
            if(error){console.log(error)}
        });
    }
 
    fs.writeFileSync(`${outputPath}`, data, (error) => {
        if(error){console.log(error)}
    });
    console.log(`\nHTML is complete!!!!\nIt is located here ${emoji.emojify(':point_right:')} ${outputPath}`);
}

async function isValidAcct(username){
    return await axios.get(`https://api.github.com/users/${username}`, {
      headers: { 'Authorization': `token ${process.env.token}`}
    })
    .then((response) => response )
    .then((data) => {
        if(data.status === 200){
            return true;
        } 
        return false;
    })
    .catch((error) => {
        return false;
    })
}

let allEmployees = [];

async function askQuestions(q){
    let obj = {};

    inquirer.prompt(q)
    .then((answers) => {
        obj = answers;
        obj.id = allEmployees.length + 1;

        inquirer.prompt(questions[obj.role.toLowerCase()])
        .then((answers) => {
            for(answer in answers){ //ADD ROLE SPECIFIC ATTRIBUTE TO OBJ
                obj[answer] = answers[answer];
            }

            inquirer.prompt(questions.add)
            .then((answers) => {
                allEmployees.push(obj);

                if(answers.continue){
                    askQuestions(questions.common)
                }else{
                    inquirer.prompt(questions.team)
                    .then((answers) => {
                        let teamName = answers.team ? answers.team : 'My Team';  
                        let team = buildTeamObjs(allEmployees);
                        writeToFile(render(team, teamName), teamName.replace(/\s/g, ""));
                    }) 
                }
            });
        })
    })
}

function buildTeamObjs(arr){
    let team = arr.map((employee) => {
        let {name, email, id, officeNumber, github, school, role} = employee;

        if(role === 'Manager'){
            return new Manager(name, id, email, officeNumber);
        }else if(role === 'Engineer'){
            return new Engineer(name, id, email, github);
        }else{
            return new Intern(name, id, email, school);
        }
    })
    return team;
}

function init() {
    console.log(emoji.emojify(':fire:  Welcome to my fancy smancy CLI team builder! :fire:'));
    if(process.argv.slice(2).length){
        let myArgs = process.argv.slice(2);
        let fileLocation = path.resolve(__dirname, myArgs[0]);
        let teamName = myArgs[1] ? myArgs[1] : 'My Team';
        let file = fs.readFileSync(fileLocation, {encoding:'utf8', flag:'r'});
        let team = buildTeamObjs(JSON.parse(file));

        writeToFile(render(team, teamName), teamName.replace(/\s/g, ""));
    }else{
        askQuestions(questions.common);
    }
}

init();