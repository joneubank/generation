/**
 * Run this to update the pages.json object to include all page files.
 */

const fs = require('fs');

const run = async () => {
  const pagesDir = fs.readdirSync('./src/pages');

  const years = pagesDir.filter(
    item =>
      !item.includes('.') && fs.lstatSync(`./src/pages/${item}`).isDirectory(),
  );

  const pageData = years.map(year => {
    const yearDir = fs.readdirSync(`./src/pages/${year}`);
    const months = yearDir.filter(
      item =>
        !item.includes('.') &&
        fs.lstatSync(`./src/pages/${year}/${item}`).isDirectory(),
    );

    const yearContent = months.map(month => {
      const monthDir = fs.readdirSync(`./src/pages/${year}/${month}`);
      const pages = monthDir
        .filter(
          item =>
            item.includes('.js') &&
            fs.lstatSync(`./src/pages/${year}/${month}/${item}`).isFile(),
        )
        .map(page => page.slice(0, -3));
      return { month, content: pages };
    });
    return { year, content: yearContent };
  });

  fs.writeFileSync('./src/pages.json', JSON.stringify(pageData));
  console.log(pageData);
};

run();
