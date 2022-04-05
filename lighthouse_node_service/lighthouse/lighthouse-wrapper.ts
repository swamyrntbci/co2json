import { join } from "path";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { launch } from "chrome-launcher";
import dataContent from "../resources/data.json";
import lighthouse from "lighthouse";

import { CalculateCO2 } from "./calculate-co2";


export class LightHouseWrapper {
  private currentDateTime = new Date().toISOString();
  private reportFolder = join(process.cwd(), `Reports`);
  private chrome: any;

  async auditSite(url:any): Promise<any> {
    let co2g:any =0;
    console.log("lih"+url);
    await this.setup();
    let urls = await this.getUrls();
    let options = await this.getBrowserConfig();
    await this.triggerLightHouseAuditAndGetResults(url, options);

let bytesToCo2 = new CalculateCO2();
(async () => {
    co2g =  await bytesToCo2.calculateCo2();
    console.log('llco2'+co2g);
})();
    await this.teardown();
    return co2g;
  }

  async triggerLightHouseAuditAndGetResults(
    url: any,
    options: any
  ): Promise<void> {
    console.log("INSIDE lighthouse")
      let runnerResult = await lighthouse(url, options);
      let reportHtml = await runnerResult.report;
      await writeFileSync(
        `${this.reportFolder}/report.json`,
        reportHtml
      );

  }


  async setup(): Promise<void> {
    await this.makeReportDirectory();
    console.log("INSIDE LAUNCh")
  //  this.chrome = await launch({ chromeFlags: ["--headless"] });
    this.chrome = await launch({ chromeFlags: ["--headless"] });
  }

  async getUrls(): Promise<{}[]> {
    return dataContent.APP_NAME;
  }

  async makeReportDirectory(): Promise<void> {
    try {
      if (!(await existsSync(`${this.reportFolder}`))) {
        await mkdirSync(`${this.reportFolder}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async teardown(): Promise<void> {
    await this.chrome.kill();
  }

  async getBrowserConfig(): Promise<any> {
    const options = {
      logLevel: "info",
      output: "json",
      onlyCategories: ['performance'],
      port: this.chrome.port,
    };
    return options;
  }
}
