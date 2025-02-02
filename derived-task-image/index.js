import 'dotenv/config';

import launchBrowser from './browser.js';
import sleep from './helpers.js';

const {
    EMAIL: userEmail,
    PASSWORD: userPassword
  } = process.env;

(async () => {
try { 
  console.log({
    userEmail,
    userPassword
  });
    const { browser, page } = await launchBrowser();

    await page.goto('https://accounts.shopify.com/login');
  
    console.log('after going');

    const emailSelector = await page.$('#account_email');
    console.log({
      emailSelector
    });

    await emailSelector.type(userEmail);
    await sleep(10);
    const continueButton = await page.$('button[type="submit"]');

    await continueButton.click();
    await sleep(10);
    console.log('After click!');
    const passwordSelector = await page.$('#account_password');

    console.log({
      passwordSelector
    });
  
    await passwordSelector.type(userPassword);

    await sleep(10);

    const loginButton = await page.$('.footer-form-submit');
    await sleep(5);
    await loginButton.click();
    await sleep(10);

    await page.screenshot({ path: '/screenshots/screenshot.png' });


  
    await browser.close();
    } catch (err) {
        console.log({ err });
    }
 
}) ();
