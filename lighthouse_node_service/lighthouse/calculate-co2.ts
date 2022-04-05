const fs = require("fs");

export class CalculateCO2 {

  co2 : number = 0;
  co2Renewable : number = 0;
   audits:any = '';
   calculateCo2() {

let rawdata = fs.readFileSync('../innovation_lighthouse_node/Reports/report.json');
let data = JSON.parse(rawdata);
    console.log("data ee"+data);
    let keyArr: any[] = Object.keys(data);
          //console.log('keyArr'+keyArr);
                //console.log('audits'+JSON.stringify(data["audits"]));
                //console.log('network-requests'+audits[keyArr[8]]['network-requests']['details']['items']);
                let itemsArr: any[]  = data["audits"]['network-requests']['details']['items'];
                var totalBytes = 0;
                          itemsArr.forEach((item: any) => {
                            var itemData:any = JSON.stringify(item);
                            //console.log('itemData'+itemData);
                            //console.log('transferSize'+JSON.stringify(item.transferSize));

                            var numberValue: number = +JSON.stringify(item.transferSize);
                            totalBytes += numberValue;
                          });
                          //console.log('totalBytes \n'+totalBytes);

                          var bytes: number = (totalBytes * 0.75) + (0.02 * totalBytes * 0.25);

                          var energy: number = bytes * (1.805 / 1073741824);

                          this.co2 = energy * 475;
                          console.log('co2 \n' +this.co2);
                          this.co2Renewable = ((energy * 0.1008) * 33.4) + ((energy * 0.8992) * 475);
                          console.log('co2 \n' +this.co2Renewable);

                          return this.co2.toFixed(2);
    //} catch (err) {
      //    console.error(err);
        //}

 //   console.log(this.audits ); // Print users
  // });




  }

}
