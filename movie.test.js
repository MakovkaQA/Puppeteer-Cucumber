const { clickElement, getText } = require("./lib/commands.js");

const { selectSeance, selectSeat } = require("./lib/util.js");

let page;
const seance = "a[data-seance-id='178']";

describe("Ticket booking", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await page.setDefaultNavigationTimeout(0);
    await selectSeance(page, 2, seance);
  });

  afterEach(() => {
    page.close();
  });

  test("Check hall", async () => {
    const actual = await getText(page, ".buying__info-hall");
    const expected = "Зал 1";
    expect(actual).toContain(expected);
  });

  test("Ticket successfully selected", async () => {
    await selectSeat(page, 5, 6);
    await clickElement(page, "button[class='acceptin-button']");
    const actual = await getText(page, "h2");
    const expected = "Вы выбрали билеты";
    expect(actual).toContain(expected);
  });

  test("Can't book a ticket until have selected a seat", async () => {
    const actual = await page.$eval("button", (button) => {
      return button.disabled;
    });
    expect(actual).toEqual(true);
  });
});
