const puppeteer = require("puppeteer");
const { navigation } = require("lighthouse/lighthouse-core/fraggle-rock/api");

function calculateCo2(itemsArr) {
  let totalBytes = 0;
  itemsArr.forEach((item) => {
    const numberValue = +JSON.stringify(item.transferSize);
    totalBytes += numberValue;
  });
  //console.log("---totalBytes---", totalBytes);
  const bytes = totalBytes * 0.75 + 0.02 * totalBytes * 0.25;
  const energy = bytes * (1.805 / 1073741824);
  co2 = energy * 475;
  //console.log("co2 without renewable energy\n" + co2);
  co2Renewable = energy * 0.1008 * 33.4 + energy * 0.8992 * 475;
  console.log("co2 with renewable energy\n" + co2Renewable);

  return co2.toFixed(2);
}

class BrowserHandler {
  constructor() {
    const launch_browser = async () => {
      this.browser = false;
      this.browser = await puppeteer.launch({
        headless:false
      });
      //this.browser.on('disconnected', launch_browser);
    };
    
    (async () => {
      await launch_browser();
    })();
  }
}

const wait_for_browser = browser_handler => new Promise((resolve, reject) => {
  const browser_check = setInterval(() => {
    if (browser_handler.browser !== false) {
      clearInterval(browser_check);
      resolve(true);
    }
  }, 100 );
});

async function wait(time) {

  return new Promise(function(resolve) {

      setTimeout(resolve, time)

  });

}

(async () => {
  const urls = ["https://rntbci.in/",
  "https://www.nissan.in/experience-nissan/latest-news.html",
  "https://www.nissan.in/contact-us.html",
  "https://www.nissan.in/careers.html"];

  const browser_handler = new BrowserHandler;

  await wait_for_browser(browser_handler);
  let resultCo2 = [];
  for(let i=0;i<urls.length;i++)
  {
    let url = urls[i]
    //const user='z035919';
    //const password='india222';
    let page = await browser_handler.browser.newPage();
    //await page.authenticate({username:user, password:password});
    await page.goto(url,{waitUntil: 'load', timeout:0 });
    await wait(30000); 
    await page.screenshot({path: 'example'+i+'.png', fullPage: true});
    const { lhr } = await navigation({ url, page });
    const reportHtml = await lhr.audits;
    let co2g = await calculateCo2(
      reportHtml["network-requests"]["details"]["items"]
    );
    console.log("---jsonReport----", co2g);
    resultCo2[url] = co2g
    /*console.log(
      `Lighthouse scores: ${Object.values(lhr.categories)
        .map((c) => c.score)
        .join(", ")}`
    );*/
  }
  await browser_handler.browser.close()
  console.log( resultCo2 )

  /*const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // await Promise.all([
  //   page.click(".idp-login-button"),
  //   page.waitForNavigation({ waitUntil: "networkidle2" }),
  // ]);

  // await page.type("#Ecom_User_ID", "z035919");
  // await page.type("#Ecom_Password", "india111");
  // await Promise.all([
  //   page.waitForNavigation({ waitUntil: "networkidle2", timeout: 0 }),
  //   page.click("#loginButton2"),
  // ]);

  await page.screenshot({ path: `hpc-dashboardtest1.png` });
  // Run Lighthouse.
  const { lhr } = await navigation({ url, page });
  const reportHtml = await lhr.audits;
  let co2g = await calculateCo2(
    reportHtml["network-requests"]["details"]["items"]
  );
  console.log("---jsonReport----", co2g);
  console.log(
    `Lighthouse scores: ${Object.values(lhr.categories)
      .map((c) => c.score)
      .join(", ")}`
  );

  await browser.close();*/
})();
