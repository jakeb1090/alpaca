
import { Builder, By, Key, until } from 'selenium-webdriver'

async function loginAndFetchNextPage() {
  // Set up the Selenium driver
  // const driver = await new Builder().forBrowser('chrome').build();
  const driver = await new Builder().forBrowser('chrome').build();
  await driver.wait(until.urlIs('https://account.t-mobile.com/signin/v2/'), 10000);

  try {
    // Open the login page
    await driver.get('https://account.t-mobile.com/signin/v2/');
    await setTimeout(() => console.log('waiting'), 2000)
    // Replace these values with the actual IDs of the input fields

    // Set your login credentials
    const username = '6024817008';
    const password = 'POkemon22@@';


    const usernameInput = await driver.findElement(By.id('usernameTextBox'))
    const nextButton = await driver.findElement(By.id('lp1-next-btn'))

    // Fill in the input fields
    // Click the submit button
    await usernameInput.sendKeys(username);
    await nextButton.click();



    const passwordInput = await driver.findElement(By.id('passwordTextBox'))
    const loginButton = await driver.findElement(By.id('lp2-login-btn'))

    await passwordInput.sendKeys(password);

    await loginButton.click();

    await setTimeout(() => console.log('waiting'), 2000)

    await console.log('logged in')
    // Wait for the next page to load
    // await driver.wait(until.urlIs('https://myutility.glendaleaz.com'), 7000)

    setTimeout(async () => {
      let obj = {}
      const total = await driver.findElement(By.id('bill-total-balance-511')).getText()
      const dueDate = await driver.findElement(By.id('bill-duedate-511')).getText()
      obj.type = 'Water'
      obj.total = total
      obj.dueDate = dueDate
      await console.log(obj)
    }
, 4000)


    // Fetch the HTML of the next page after logging in
    // const nextPageHtml = await driver.getPageSource();

    // return nextPageHtml;
  } finally {
    // Close the browser window
    // await driver.quit();
  }
}

// Call the function to perform the login and fetch the next page HTML
loginAndFetchNextPage()
  .then(html => console.log(html))
  .catch(error => console.error('Error:', error));
