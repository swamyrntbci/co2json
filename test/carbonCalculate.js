const puppeteer = require("puppeteer");
const { navigation } = require("lighthouse/lighthouse-core/fraggle-rock/api");

function calculateCo2(itemsArr) {
  let totalBytes = 0;
  itemsArr.forEach((item) => {
    const numberValue = +JSON.stringify(item.transferSize);
    totalBytes += numberValue;
  });
  console.log("---totalBytes---", totalBytes);
  const bytes = totalBytes * 0.75 + 0.02 * totalBytes * 0.25;
  const energy = bytes * (1.805 / 1073741824);
  co2 = energy * 475;
  console.log("co2 without renewable energy\n" + co2);
  co2Renewable = energy * 0.1008 * 33.4 + energy * 0.8992 * 475;
  console.log("co2 with renewable energy\n" + co2Renewable);

  return co2.toFixed(2);
}
(async () => {
  const url = "https://www.google.com/";
  const browser = await puppeteer.launch();
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

  await browser.close();
})();
