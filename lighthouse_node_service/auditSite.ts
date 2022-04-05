import { LightHouseWrapper } from "./lighthouse/lighthouse-wrapper";
const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json());
const port = 3000;

/*app.use(cors({
    origin: 'http://localhost:4200'
}));*/
app.use(cors());
app.get('/co2', async  (req, res) => {
let co2g_check:number = 0;
let c02grams : any = '';
if(co2g_check == 0) {
console.log("execution audit site");
(async () => {
   let urlVal:string = decodeURI(req.query.url);
    console.log('url'+urlVal);
    let lighthouse = new LightHouseWrapper();
     let co2g :any = 0;
     co2g = await lighthouse.auditSite(urlVal);
    console.log('co2g'+co2g);
    c02grams = co2g;

    console.log(JSON.stringify({co2:co2g.toString()}));
    co2g_check = co2g;
    res.json(JSON.stringify({co2:co2g}));

})();
}
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));