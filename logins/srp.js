
import { Builder, By, Key, until } from 'selenium-webdriver'
import moment from 'moment'

async function srp() {
  // Set up the Selenium driver
  // const driver = await new Builder().forBrowser('chrome').build();
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open the login page
    await driver.get('https://myaccount.srpnet.com/power/login');

    // Replace these values with the actual IDs of the input fields

    const usernameInput = await driver.findElement(By.id('username_desktop'))
    const passwordInput = await driver.findElement(By.id('password_desktop'))
    const submitButton = await driver.findElement(By.className('btn srp-btn btn-green'))


    // Set your login credentials
    const username = 'lemery54@gmail.com';
    const password = 'Dividedby0';

    // Fill in the input fields
    await usernameInput.sendKeys(username);
    await passwordInput.sendKeys(password);

    // Click the submit button
    await submitButton.click();

    // Wait for the next page to load
    // await driver.wait(until.urlIs('https://myutility.glendaleaz.com'), 7000)

    setTimeout(async () => {
      let obj = {}
      const total = await driver.findElement(By.className('d-flex flex-column align-items-center text-white'))
        .findElement(By.className('h4'))
        .getText()
      const dueDate = await driver.findElement(By.className('col-5 text-right srp-green-text')).getText()
      //class:d-flex flex-column align-items-center text-white > class:h4
      obj.type = 'Electric'
      obj.total = total
      obj.dueDate = moment(dueDate, "MM/D/YYYY").format("MMMM DD, YYYY")
      // await console.log(obj)
      return obj
    }
, 4000)

    // await driver.quit();
    // Fetch the HTML of the next page after logging in
    // const nextPageHtml = await driver.getPageSource();

    setTimeout(() => driver.close(), 5000);
    // return nextPageHtml;
  } finally {
    // Close the browser window
    // setTimeout(() => driver.quit(), 10000);
  }
}

// Call the function to perform the login and fetch the next page HTML
srp()
  // .then(html => console.log(html))
  // .catch(error => console.error('Error:', error));

export { srp  }