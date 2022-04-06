const { auditSite } = require("../../../lighthouse/lighthouse-wrapper.js");

const __ = require("../../helpers/globalFunctions");

class Co2 {
  async calculate(req, res) {
    try {
      let urlVal = req.query.url || "";
      if (urlVal != "") {
        const co2 = await auditSite(decodeURI(urlVal+'?test=true'));

        __.out(res, 200, { co2 });
      } else {
        __.log("url not found");
        __.out(res, 500, "url not found");
      }
    } catch (err) {
      __.log(err);
      __.out(res, 500, err);
    }
  }
}
const co2 = new Co2();
module.exports = co2;
