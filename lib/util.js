const { clickElement } = require("./commands.js");

module.exports = {
  selectSeance: async function (page, day, seance) {
    try {
      await page.waitForSelector(`nav a:nth-child(${day})`);
      await clickElement(page, `nav a:nth-child(${day})`);
    } catch (error) {
      throw new Error(`Failed to select ${day}-th day`);
    };    
    try {
      await clickElement(page, seance);
    } catch (error) {
      throw new Error(`Failed to select seance ${seance}`);
    }
  },
  selectSeat: async function (page, row, seat) {
    try {
      await page.waitForSelector(
        `div div[class='buying-scheme__row']:nth-child(${row}) span:nth-child(${seat})`
      );
      await clickElement(
        page,
        `div div[class='buying-scheme__row']:nth-child(${row}) span:nth-child(${seat})`
      );
    } catch (error) {
      throw new Error(`Incorrect values: seat ${seat} or row ${row}`);
    }
  },
};
