const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
require('dotenv').config();


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// TODO PUSH TO HEROKU SO I CAN SEE IT RUNNING
// todo allow json import of team
// todo inject team name
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
            validate: function(name){
                return name !== '';
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

function writeToFile(file, data) {
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR,  (error) => {
            if(error){console.log(error)}
        });
    }
 
    fs.writeFileSync(`${outputPath}`, data, (error) => {
        if(error){console.log(error)}
    });
    console.log(`\n HTML is complete.\nIt is located: ${outputPath}`);
}

let allEmployees = [];

function askQuestions(q){
    let obj = {};

    inquirer.prompt(q)
    .then((answers) => {
        position = answers.role;
        obj = answers;
        obj.position = answers.role
        obj.id = allEmployees.length + 1;

        inquirer.prompt(questions[obj.position.toLowerCase()])
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
                        let team = allEmployees.map((employee) => {
                            let {name, email, id, officeNumber, github, school, position} = employee;
    
                            if(position === 'Manager'){
                                return new Manager(name, id, email, officeNumber);
                            }else if(position === 'Engineer'){
                                return new Engineer(name, id, email, github);
                            }else{
                                return new Intern(name, id, email, school);
                            }
                        })
                        // let team = buildTeamObjs(allEmployees, position);
                        writeToFile('team.html', render(team, teamName));
                    }) 
                }
            });
        })
    })
}

function init() {
    askQuestions(questions.common);
}

init();