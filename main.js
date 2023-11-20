const readFileSync = require("fs").readFileSync;
const puppeteer = require("puppeteer");

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless:"new"});
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', interceptedRequest => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;
        if (
            interceptedRequest.url().includes("/api/")
        ) {
            requestLog.push(interceptedRequest.url());
            //console.log(`Calling api request: ${interceptedRequest.url()}`)
        }

        interceptedRequest.continue();
    });

    for (const item of global.config.urls) {
        console.log( await visitPage(page, item.url) );
        requestLog = [];
    }

    await browser.close();
})();

let requestLog = [];

async function visitPage(page, url){
    // Navigate the page to a URL
    console.log("Visiting " + url);

    await page.goto(global.config.loginUrl);

    await page.goto(url);

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    const selector = ".msk-tabs";
    await page.waitForSelector(selector);

    await page.waitForNetworkIdle();

    return { message: `Successfully loaded ${url}`, apiRequests:requestLog.length };


}