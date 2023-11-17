import { readFileSync } from 'fs';

const data = readFileSync('./urls.json');

const urls = JSON.parse(data);

let loginUrl;

// this doesn't seem to handle the case where login url doesn't exist
try {
  loginUrl = process.env.LOGIN_URL;
} catch (ex) {
  // can't seem to figure out how to
  process.exit(1);
}

import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  for (const item of urls) {
    console.log( await visitPage(page, item.url) );
  }

  await browser.close();
})();

async function visitPage(page, url){
  // Navigate the page to a URL

  await page.goto(loginUrl);

  await page.goto(url);

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  const selector = ".msk-tabs";
  await page.waitForSelector(selector);

  await page.waitForNetworkIdle();

  return { message: `successfully loaded ${url}` };

}