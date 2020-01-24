const fs = require('fs');
const dateformat = require('dateformat');
const inquirer = require('inquirer');

const run = async () => {
  const templates = fs.readdirSync('./src/templates');
  const templateFile = await new Promise(resolve =>
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'filename',
          message: 'Template:',
          choices: templates,
        },
      ])
      .then(answers => resolve(answers.filename)),
  );
  const template = fs.readFileSync(`./src/templates/${templateFile}`);

  const filename = await new Promise(resolve =>
    inquirer
      .prompt([{ type: 'input', name: 'filename', message: 'Name:' }])
      .then(answers => resolve(answers.filename)),
  );

  const now = new Date();
  const datestring = dateformat(now, 'yyyymmddhhMM');

  fs.writeFileSync(
    `./src/pages/${dateformat(now, 'yyyy')}/${dateformat(
      now,
      'mm',
    )}/${dateformat(now, 'yyyymmddhhMM')}-${filename}.js`,
    template,
  );
};

run();
