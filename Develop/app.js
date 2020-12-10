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

empList();

function empList() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'position',
                message: `What's the employee's position?`,
                choices: ["Manager", "Engineer", "Intern"],
            },
        ])
        .then((response) => {
            console.log(response);
            let position = response.position;
            
            switch(position){
                case "Manager":
                    managerFunc();
                    break
                case "Engineer":
                    engineerFunc();
                    break
                case "Intern":
                    internFunc();
                    break
            }
        });
}

const managerFunc = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `What's the manager's full name?`
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
            console.log(response);

            const manager = new Manager(
                response.name,
                response.id,
                response.email,
                response.number,
            );
            team.push(manager);
            // function here to continue adding employees or quit application
            execute();
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
            execute();
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
            execute();
        })
};

const execute = () => {
    const responseString = render(team);

    fs.writeFile(outputPath, responseString, 'utf8', (err) =>
        err ? console.log(err) : console.log('Success!')
    );
};