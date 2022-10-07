const puppeteer = require('puppeteer');
const fs = require('fs');

// // If passing url from command line
// const url = process.argv[2];
// console.log(url);
// if (!url) {
//     throw "Please provide URL as a first argument";
// }

const run = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //await page.goto(url);
    await page.goto("https://www.passportjs.org/");

    //Creating screenshot of the page
    await page.screenshot({path: 'screenshot.png', fullPage: true});


    //Fetching nav items from page
    const navItems = await page.evaluate( () => {         //this function helps us run browrser based js
       const items = Array.from(document.querySelectorAll("#menu >  div.menu-items >  ul > li > a")).map(x => x.textContent);
       return items;
    });
    fs.writeFileSync("Navigation-buttons.txt", navItems.join("\n"));


    //using $$eval function  => This method runs Array.from(document.querySelectorAll(selector))
    const navItems2 = await page.$$eval("#menu >  div.menu-items >  ul > li > a", items => {
        return items.map(x => x.textContent);
    }) 
    console.log('NavItems',navItems2);


    //Using $eval function => This method runs document.querySelector
    const navItems3 = await page.$eval("#menu >  div.menu-items >  ul > li > a", item => item.textContent) 
    console.log('First navItem',navItems3);
   
    browser.close();
}

run();


// //TO run every 5 seconds 
// setInterval(run, 5000);