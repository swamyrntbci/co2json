const _ = require("lodash");
const moment = require("moment");
const os = require("os");
const dotenv = require("dotenv").config();

class globalFunctions {
  checkRequiredFields(req, requiredFields, source = false) {
    if (source == "validate") {
      if (!(req.body.tripId && !isNaN(req.body.tripId))) {
        delete req.body.tripId;
      }
    }

    //req.body = _.pickBy(req.body, _.identity); //remove empty string("") , null, undefined properties
    let noMissingFields = _.reduce(
      requiredFields,
      (result, item) => result && item in req.body,
      true
    );
    if (!noMissingFields) {
      let missingFields = this.getMissingFields(req.body, requiredFields);
      return {
        status: false,
        missingFields: missingFields,
      };
    } else {
      return {
        status: true,
      };
    }
  }
  log() {
    if (os.hostname().indexOf("doodlews-30") > -1) {
      /*localhost*/ for (let i in arguments) {
        console.log(arguments[i]);
      }
    } else {
      for (let i in arguments) {
        console.log(arguments[i]);
      }
    }
  }
  generateOTP() {
    //return Math.floor(Math.random() * 9999) + 1111
    return 1234;
  }
  getMissingFields(requestedJsonInput, requiredFields) {
    let missingFields;
    missingFields = requiredFields.map(function (value, index) {
      if (!(value in requestedJsonInput)) return value;
    });

    function removeUndefined(value) {
      return value !== undefined;
    }

    return missingFields.filter(removeUndefined);
  }
  out(res, statusCode, resultData = null) {
    if (statusCode === 401) {
      res.status(statusCode).json({
        data: {},
        message: "Unauthorized user",
      });
    } else if (statusCode === 500) {
      res.status(statusCode).json({
        data: {},
        message: "Internal server error Or Invalid data",
      });
    } else if (statusCode === 400) {
      res.status(statusCode).json({
        data: {},
        message: "Required fields missing",
        fields: resultData,
      });
    } else if (statusCode === 412) {
      res.status(statusCode).json({
        data: {},
        message: resultData,
      });
    } else {
      /*200*/
      if (
        typeof resultData === "object" &&
        resultData &&
        (resultData.message || resultData.data)
      ) {
        /*with data or messgae */
        const defaultResponse = { data: {}, message: "" };
        resultData = { ...defaultResponse, ...resultData };
        res.status(statusCode).json(resultData);
      } else if (typeof resultData === "object" && resultData) {
        /*only object without data prop*/
        res.status(statusCode).json({
          data: resultData,
          message: "",
        });
      } else {
        /*only string */
        res.status(statusCode).json({
          data: {},
          message: resultData != null ? resultData : "success",
        });
      }
    }
  }
  getDateStringFormat(fullDate = "", timeZone) {
    return moment.utc(fullDate).utcOffset(`${timeZone}`).format("DD-MM-YYYY");
    // var d = new Date(fullDateTrimmed);
    // var date = ("0" + d.getDate()).slice(-2), //to make double digit
    //     month = ("0" + (d.getMonth() + 1)).slice(-2), //to make double digit
    //     year = (d.getYear() + 1900); // getYear () + 1900 = current year (i.e:2017)
    // return date + '-' + month + '-' + year;
  }
  getDayStringFormat(fullDate = "", timeZone) {
    return moment
      .utc(fullDate)
      .utcOffset(`${timeZone}`)
      .format("dddd")
      .toLowerCase();
  }
  getDayStringFormatFromUnix(unix = "", timeZone) {
    return moment
      .unix(unix)
      .utcOffset(`${timeZone}`)
      .format("dddd")
      .toLowerCase();
  }
  timeDiffInHours(start, end = false) {
    const tz = this.getTz();
    const startTime = moment(
      moment.unix(start).utcOffset(tz).format()
    ).utcOffset(tz);
    const endTime = end
      ? moment(moment.unix(end).utcOffset(tz).format()).utcOffset(tz)
      : moment().utcOffset(tz);
    const duration = moment.duration(endTime.diff(startTime));
    const diffInHours = Math.round(duration.asHours());

    if (end) {
      return diffInHours;
    }

    return { diffInHours, endTime: endTime.unix() };
  }
  getDelay(num1, num2) {
    if (num1 > num2) {
      return -(num1 - num2);
    } else {
      return num2 - num1;
    }
  }
  getDurationInHours(startDateTime, endDateTime) {
    const tz = this.getTz();
    var start = moment(startDateTime).utcOffset(tz).unix() * 1000,
      end = moment(endDateTime).utcOffset(tz).unix() * 1000;

    return ((end - start) / 3600000).toFixed(2); //durationInHours
  }
  removeSpaceWithUpperCase(string) {
    return string.replace(/ /g, "").toUpperCase();
  }
  getExpectedEndTime(startTime, distance) {
    const timeTakenInHours = Math.ceil(distance / 40);
    const tz = this.getTz();
    return moment(moment.unix(startTime).utcOffset(tz).format())
      .utcOffset(tz)
      .add(timeTakenInHours, "h")
      .unix();
  }
  getMomentWithTz() {
    const tz = this.getTz();
    return moment().utcOffset(tz);
  }
  getTz() {
    return "+05:30";
  }
  weekNoStartWithMonday(dt) {
    dt = new Date(dt);
    return Math.ceil(
      (dt - new Date(dt.getFullYear(), 0, 1)) / (3600000 * 24 * 7)
    );
  }
  serverIpAddress() {
    return os.networkInterfaces().eth0[0].address;
  }
  serverBaseUrl() {
    if (os.hostname().startsWith("INLH")) {
      /*localhost*/
      return process.env.LOCAL_SERVER_BASEURL;
    } /*live*/ else {
      return process.env.LIVE_SERVER_BASEURL;
    }
  }

  async inviteCodeGenerator(email) {
    email = email.replace(/[^a-zA-Z ]/g, "").toLowerCase();
    var inviteCode = email.substr(0, 3).concat(this.makePwd(5)); //concat first 3 letters of email and random generated string

    inviteCode = inviteCode.charAt(0).toUpperCase() + inviteCode.slice(1); //first letter captital

    return inviteCode;
  }
  // async download(uri, newLocation, callback) {
  //     await request.head(uri, (err, res, body) => {
  //         request(uri).pipe(fs.createWriteStream(newLocation)).on('close', callback);
  //     });
  // }
}
globalFunctions = new globalFunctions();
module.exports = globalFunctions;
