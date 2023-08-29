
import { Builder, By, Key, until } from 'selenium-webdriver'

async function glendale() {
  // Set up the Selenium driver
  // const driver = await new Builder().forBrowser('chrome').build();
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open the login page
    await driver.get('https://myutility.glendaleaz.com/login');

    // Replace these values with the actual IDs of the input fields

    const usernameInput = await driver.findElement(By.id('dnn_dnnLogin_username'))
    const passwordInput = await driver.findElement(By.id('passworddnnLogin'))
    const submitButton = await driver.findElement(By.className('btn btn-default aus-btn aus-btn-default'))


    // Set your login credentials
    const username = 'lemery54';
    const password = 'POkemon22@@';

    // Fill in the input fields
    await usernameInput.sendKeys(username);
    await passwordInput.sendKeys(password);

    // Click the submit button
    await submitButton.click();

    // Wait for the next page to load
    // await driver.wait(until.urlIs('https://myutility.glendaleaz.com'), 7000)

    setTimeout(async () => {
      let obj = {}
      const total = await driver.findElement(By.id('bill-total-balance-511')).getText()
      const dueDate = await driver.findElement(By.id('bill-duedate-511')).getText()
      obj.type = 'Water'
      obj.total = total
      obj.dueDate = dueDate
      // await console.log(obj)
      return obj
    }
, 4000)

  setTimeout(() => driver.close(), 6000)
    // Fetch the HTML of the next page after logging in
    // const nextPageHtml = await driver.getPageSource();

    // return nextPageHtml;
  } finally {
    // Close the browser window
    // await driver.quit();
  }
}

glendale()

// Call the function to perform the login and fetch the next page HTML
export { glendale }
