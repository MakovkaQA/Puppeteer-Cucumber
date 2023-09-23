const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
const { selectSeance, selectSeat } = require("../../lib/util.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru${string}`, {
    setTimeout: 60000,
  });
});

When(
  "user select seance with selector {string} at {float} day",
  async function (string, float) {
    return await selectSeance(this.page, float, string);
  }
);

When("user select {int} row and {int} seat", async function (row, seat) {
  return await selectSeat(this.page, row, seat);
});

When("user click the button on 1-st page", async function () {
  return await clickElement(this.page, "button[class='acceptin-button']");
});

Then("user sees name of hall {string}", async function (string) {
  const actual = await getText(this.page, ".buying__info-hall");
  expect(actual).contains(string);
});

Then(
  "user has been navigated on page with title {string}",
  async function (string) {
    const actual = await getText(this.page, "h2");
    expect(actual).contains(string);
  }
);

Then("button is disabled", async function () {
  const actual = await page.$eval("button", (button) => {
    return button.disabled;
  });
  expect(actual).equal(true);
});
