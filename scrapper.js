const puppeteer = require('puppeteer');
const XLSX = require("xlsx");
const userModel = require("./models/scrappedData.model")

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
    
    await page.goto("https://webscraper.io/test-sites/tables", {timeout: 0});

    //Creating screenshot of the page
    await page.screenshot({path: 'screenshot.png', fullPage: true});


    //Scrapping data
    const table = await page.$$eval(" table:nth-child(5) > tbody > tr", items => {
      return items.map(item => [
        item.querySelector("td:nth-child(2)").innerHTML,
        item.querySelector("td:nth-child(3)").innerHTML,
        item.querySelector("td:nth-child(4)").innerHTML
      ])
    }) 
    console.log('table',table);
    let json = table.map(x => ({
      "firstname": x[0],
      "lastname": x[1],
      "username": x[2]
    }));
    console.log(json);

    //creating xlsx file
    const ws = XLSX.utils.json_to_sheet(json, {header: ['firstname', 'lastname', 'username']});
    const wb = XLSX.utils.book_new();
    console.log(ws);
    XLSX.utils.book_append_sheet(wb,ws,"data")
    console.log(wb)
    XLSX.writeFile(wb, 'test.xlsx');


    //Adding to database
    const newuser = await userModel.bulkCreate(json);
    
    browser.close();
}


run(); 

module.exports = run;


