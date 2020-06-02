const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// TODO NICE TO HAVES:
// TODO USE EXPRESS AS A TEMPLATE ENGINE
// TODO PUSH TO HEROKU SO I CAN SEE IT RUNNING
// todo move questions to separate json file
let team = [];

const questions = {
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
            validate: function(name){
                return name !== '';
            }
        }, 
        {
            type: 'input',
            name: 'email',
            message: "Email: ",
            // todo add validation that a email is inlcuded
            validate: function(name){
                return name !== '';
            }
        }
    ],

    manager : [
        {
            type: 'input',
            name: 'officeNumber',
            message: "Office Number: ",
            // todo add validation that a number is inlcuded
            validate: function(name){
                return name !== '';
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
            validate: function(name){
                return name !== '';
            }
        }
    ],
    
    add : [
        {
            type: 'list',
            name: 'continue',
            message: "Add another employee? ",
            choices: ["Yes", "No"]
        }, 
    ]
};

function writeToFile(dirName, data) {
    // fs.mkdirSync(`${process.cwd()}/readmes/${dirName}`, {recursive: true}, (error) => {
    //     if(error){console.log(error)}
    // });
    // fs.writeFileSync(`${process.cwd()}/readmes/${dirName}/README.md`, data);
    // console.log(`\nREADME is complete.\nIt is located: ${process.cwd()}/readmes/${dirName}/README.md`);
}

function askQuestions(q){
    let allAnswers = [];
    let role = '';
    let position = "Employee";

    // const second = 42;
    // const third = new Promise((resolve, reject) => {
    //   setTimeout(resolve, 100, 'foo');
    // });

    let first = async() => {
        return await inquirer.prompt(q).then((answers) => {
        // grab role choice from first round of qs
        // askQuestions(questions[answers.role])
        role = questions[answers.role.toLowerCase()];
        position = answers.role;
        allAnswers.push(answers);
        // console.log('something')
        // console.log(answers.role)
        // console.log(role) 
        // console.log('first ', answers)
        // console.log('first ', allAnswers)
        return answers;
    });
    }
  
    // console.log('moo')
    // let second = inquirer.prompt(questions.manager).then((answers) => {
    //     return answers;
    // });
    //     allAnswers.push(answers);
    //     console.log('second', answers)
    //     console.log('second ', allAnswers)

        // console.log('second', position)
    //     // todo randomly/sequentially assing id
    //     // potential instantiate class here
        // let obj = {};
        // if(position === 'Manager'){
        //     // name,
        //     // id,
        //     // email,
        //     // role  
        //     obj = new Manager(answers);
        // }else if(position === 'Engineer'){
        //     obj = new Engineer(answers);
        // }else{
        //     obj = new Intern(answers);
        // }
        // team.push(obj);
        // console.log(team)
    //     inquirer.prompt(questions.add).then((answers) => {
    //         if(answers.continue === "Yes"){
    //             askQuestions(questions.common)
    //         }else{
    //             let HTML = render(team);
    //             writeToFile('dude.html', HTML);
    //         }
    //     })
    // });
    Promise.all([first]).then((values) => {
        console.log(values);
      });
}

function init() {
    askQuestions(questions.common);
}

init();
// after each answer, prompt add another?
// if yes
//     do the thing again
// else
//     build roster

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
