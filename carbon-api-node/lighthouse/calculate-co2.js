function totalBytesToCo2(totalBytes, group) {
  const bytes = totalBytes * 0.75 + 0.02 * totalBytes * 0.25;
  const energy = bytes * (1.805 / 1073741824);
  const co2 = energy * 475;
  console.log(`co2 without renewable energy for ${group}\n` + co2);
  const co2Renewable = energy * 0.1008 * 33.4 + energy * 0.8992 * 475;
  console.log(`co2 with renewable energy for ${group}\n` + co2Renewable);

  return co2.toFixed(2).toString();
}

class CalculateCO2 {
  calculateCo2(data) {
    const itemsArr = data["audits"]["network-requests"]["details"]["items"];
    let totalBytes = 0;
    const consolidatedResult = {};
    itemsArr.forEach((item) => {
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
}

CalculateCO2 = new CalculateCO2();
module.exports = CalculateCO2;
