const { Builder, By } = require("selenium-webdriver");
const { expect } = require("chai");

describe("React Application UI Tests", function () {
  this.timeout(30000);

  let driver;

  before(async function () {
    driver = await new Builder()
      .forBrowser("chrome")
      .build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("should display the React application title", async function () {
    await driver.get("http://localhost:3000");

    const heading = await driver.findElement(By.css("h1"));
    const text = await heading.getText();

    expect(text).to.equal("React Selenium Testing");
  });

  it("should submit the form and display success message", async function () {
    await driver.get("http://localhost:3000");

    const nameInput = await driver.findElement(By.id("name"));
    await nameInput.sendKeys("Ramanaya");

    const button = await driver.findElement(By.id("submit-button"));
    await button.click();

    const message = await driver.findElement(
      By.id("success-message")
    );

    const text = await message.getText();

    expect(text).to.equal(
      "Welcome to the React Selenium Test!"
    );
  });
});