const cron = require('node-cron');
const scrapper = require("./scrapper");

const runScheduler = () => {
    console.log('called')
    cron.schedule('*/10 * * * * *', () => {
        console.log(`Hitting now`);

        scrapper();
    })
}

module.exports = runScheduler;