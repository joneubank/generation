const fs = require('fs');
const dateformat = require('dateformat');
const inquirer = require('inquirer');

const run = async () => {
  const filename = await new Promise(resolve =>
    inquirer
      .prompt([
        { type: 'input', name: 'filename', message: 'Name for new sketch:' },
      ])
      .then(answers => resolve(answers.filename)),
  );

  const now = new Date();
  const datestring = dateformat(now, 'yyyymmddhhMM');

  const template = fs.readFileSync('./src/templates/basic.js');
  fs.writeFileSync(
    `./src/pages/${dateformat(now, 'yyyy')}/${dateformat(
      now,
      'mm',
    )}/${dateformat(now, 'yyyymmddhhMM')}-${filename}.js`,
    template,
  );
};

run();
