let co2 = 0;
let co2Renewable = 0;
class CalculateCO2 {
  calculateCo2(data) {
    const itemsArr = data["audits"]["network-requests"]["details"]["items"];
    let totalBytes = 0;
    itemsArr.forEach((item) => {
      const numberValue = +JSON.stringify(item.transferSize);
      totalBytes += numberValue;
    });
    const bytes = totalBytes * 0.75 + 0.02 * totalBytes * 0.25;
    const energy = bytes * (1.805 / 1073741824);
    co2 = energy * 475;
    console.log("co2 without renewable energy\n" + co2);
    co2Renewable = energy * 0.1008 * 33.4 + energy * 0.8992 * 475;
    console.log("co2 with renewable energy\n" + co2Renewable);

    return co2.toFixed(2);
  }
}
CalculateCO2 = new CalculateCO2();
module.exports = CalculateCO2;
