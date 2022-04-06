const { launch } = require("chrome-launcher");
const lighthouse = require("lighthouse");

const { calculateCo2 } = require("./calculate-co2");
let chrome = new Object();
class LightHouseWrapper {
  async auditSite(url) {
    let co2g = 0;
    console.log("url =>" + url);
    chrome = await launch({ chromeFlags: ["--headless"] });
    let options = {
      logLevel: "info",
      output: "json",
      port: chrome.port,
    };
    const runnerResult = await lighthouse(url, options);
    const reportHtml = await runnerResult.report;
    const jsonReport = JSON.parse(reportHtml);
    co2g = await calculateCo2(jsonReport);
    await chrome.kill();

    return co2g.toString();
  }
}
LightHouseWrapper = new LightHouseWrapper();
module.exports = LightHouseWrapper;
