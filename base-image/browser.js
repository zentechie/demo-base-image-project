import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(stealthPlugin());
const launchBrowser = async () => {
  const browserOpts = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    args: [
      '--headless=new',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-gpu',
      '--disable-features=IsolateOrigins,site-per-process',
      '--start-maximized'
    ]
  };

  const browser = await puppeteer.launch(browserOpts);

  const page = await browser.newPage();

  return { browser, page };
};

export default launchBrowser;
