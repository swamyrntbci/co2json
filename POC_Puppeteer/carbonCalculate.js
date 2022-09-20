const fs = require("fs");
const puppeteer = require("puppeteer");
const { navigation } = require("lighthouse/lighthouse-core/fraggle-rock/api");

function totalBytesToCo2(totalBytes, group = "") {
  const bytes = totalBytes * 0.75 + 0.02 * totalBytes * 0.25;
  const energy = bytes * (1.805 / 1073741824);
  const co2 = energy * 475;
  //console.log(`co2 without renewable energy for ${group}\n` + co2);
  const co2Renewable = energy * 0.1008 * 33.4 + energy * 0.8992 * 475;
  //console.log(`co2 with renewable energy for ${group}\n` + co2Renewable);

  return co2.toFixed(2).toString();
}
function calculateCo2(data) {
  let totalBytes = 0;
  const consolidatedResult = {};
  data.forEach((item) => {
    const { url, transferSize, resourceType } = item;
    const fileName = url.substring(url.lastIndexOf("/") + 1);
    const numberValue = +JSON.stringify(transferSize);
    totalBytes += numberValue;
    if (!consolidatedResult[resourceType]) {
      consolidatedResult[resourceType] = { total: 0, items: [] };
    }
    consolidatedResult[resourceType].total += numberValue;
    consolidatedResult[resourceType].items = consolidatedResult[
      resourceType
    ].items.concat({ fileName, transferSize });
  });
  //console.log("----consolidatedResult---", consolidatedResult);
  Object.keys(consolidatedResult).forEach((key) => {
    consolidatedResult[key].total = totalBytesToCo2(
      consolidatedResult[key].total,
      key
    );
    consolidatedResult[key].items.forEach((e) => {
      e.co2 = totalBytesToCo2(e.transferSize);
      return e;
    });
  });
  consolidatedResult.Total = totalBytesToCo2(totalBytes, "Total");

  return consolidatedResult;
}
function calculateCo2Old(itemsArr) {
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
  //console.log("co2 with renewable energy\n" + co2Renewable);

  return co2.toFixed(2);
}

class BrowserHandler {
  constructor() {
    const launch_browser = async () => {
      this.browser = false;
      this.browser = await puppeteer.launch({ headless: true });
      //this.browser.on('disconnected', launch_browser);
    };

    (async () => {
      await launch_browser();
    })();
  }
}

const wait_for_browser = (browser_handler) =>
  new Promise((resolve, reject) => {
    const browser_check = setInterval(() => {
      if (browser_handler.browser !== false) {
        clearInterval(browser_check);
        resolve(true);
      }
    }, 100);
  });

async function wait(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

(async () => {
  const urls = [
      "https://rntbci.in/",
      //"https://www.nissan.in/experience-nissan/latest-news.html",
      //"https://www.nissan.in/contact-us.html",
      //"https://www.nissan.in/careers.html",
    // "https://www.charsur.com/albums/list",
    // "https://www.charsur.com/songs/list",
    // "https://www.charsur.com/artist/detail",
  ];

  const browser_handler = new BrowserHandler();

  await wait_for_browser(browser_handler);
  let resultCo2 = {};
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i];
    let page = await browser_handler.browser.newPage();
    await page.goto(url, { waitUntil: "load", timeout: 0 });
    await wait(30000);
    //await page.screenshot({ path: "src/assets/co2/example" + i + ".png", fullPage: true });
    const { lhr } = await navigation({ url, page });
    const reportHtml = await lhr.audits;
    // console.log(
    //   '---reportHtml["network-requests"]["details"]["items"]--------',
    //   reportHtml["network-requests"]["details"]["items"]
    // );
    let co2g = await calculateCo2(
      reportHtml["network-requests"]["details"]["items"]
    );
    //console.log("---jsonReport----", co2g);
    resultCo2[url] = co2g;
    /*console.log(
      `Lighthouse scores: ${Object.values(lhr.categories)
        .map((c) => c.score)
        .join(", ")}`
    );*/
  }
  await browser_handler.browser.close();
  let path = 'https://github.com/loucia/co2-json/'
  const latestFileName = path+"calc-latest.json";
  let data = JSON.stringify(resultCo2);
  //const datetime = moment(new Date()).format("DDMMYYYYHmmss");
  //const oldFileName = `calc-${datetime}.json`;
 /* const oldFileName = `calc-old.json`;
  fs.rename(latestFileName, oldFileName, (err) => {
    if (err) {
      throw err;
    }
    console.log("\nFile Renamed!\n");
    fs.writeFileSync(latestFileName, data, "utf8");
  });*/
  if ( fs.existsSync( path ) ) {
  console.log(data)
  }
  fs.writeFileSync(latestFileName, data, "utf8");
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