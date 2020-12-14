const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

managerFunc();

function managerFunc() {
    console.log("Let's build your engineering team!");

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `First, what's the manager's full name?`
            },
            {
                type: 'input',
                name: 'id',
                message: `What's their ID Number?`
            },
            {
                type: 'input',
                name: 'email',
                message: `What's their email?`
            },
            {
                type: 'input',
                name: 'number',
                message: `What's their office number?`
            },
        ])
        .then((response) => {
            // console.log(response);

            const manager = new Manager(
                response.name,
                response.id,
                response.email,
                response.number,
            );
            team.push(manager);
            // function here to continue adding employees or quit application
            // execute();
            console.log(`Manager added to the team!
            Next, let's add engineers...`)
            engineerFunc();
        })
};
        
const engineerFunc = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `What's the engineer's full name?`
            },
            {
                type: 'input',
                name: 'id',
                message: `What's their ID Number?`
            },
            {
                type: 'input',
                name: 'email',
                message: `What's their email?`
            },
            {
                type: 'input',
                name: 'username',
                message: `What's their Github username?`
            },
            {
                type: 'list',
                name: 'add',
                message: 'Are you adding more engineers to the team?',
                choices: ["Yes", "No"],
            }
        ])
        .then((response) => {
            console.log(response);
        
            const engineer = new Engineer(
                response.name,
                response.id,
                response.email,
                response.username,
            );
            team.push(engineer);
            // function here to continue adding employees or quit application
            // execute();
                    
            const add = response.add;

            switch(add){
                case "Yes":
                    engineerFunc();
                    break
                case "No":
                    internFunc();
                    break
            }
        })
};

const internFunc = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `What's the intern's full name?`
                
            },
            {
                type: 'input',
                name: 'id',
                message: `What's their ID Number?`
            },
            {
                type: 'input',
                name: 'email',
                message: `What's their email?`
            },
            {
                type: 'input',
                name: 'school',
                message: `What school did they attend?` 
            },
            {
                type: 'list',
                name: 'add',
                message: 'Are you adding more interns to the team?',
                choices: ["Yes", "No"],
            }
        ])
        .then((response) => {
            console.log(response);

            const intern = new Intern(
                response.name,
                response.id,
                response.email,
                response.school,
            );
            team.push(intern);
            // function here to continue adding employees or quit application
            // execute();

            const add = response.add;

            switch(add){
                case "Yes":
                    intern();
                    break
                case "No":
                    console.log(`You have succesfully created your engineering team!`);
                    execute();
                    break
            }
        });
};

const execute = () => {
    const responseString = render(team);

    fs.writeFile(outputPath, responseString, 'utf8', (err) =>
        err ? console.log(err) : console.log('Success!')
    );
};