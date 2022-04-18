const express = require('express');
const helmet = require('helmet');
const chalk = require('chalk');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT;


/*Express configuration*/
app.set('port', port);
app.use(helmet());
//app.use(cors());
app.use(cors({
    origin: ['http://localhost:4200', 'https://esc-app.dok-dev.intra.renault.fr']
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 1000000
}));

app.use(express.static('public'));


//defining router 
const co2Route = require('./src/services/co2/co2Router');


/* Routes */
app.use('/co2', co2Route);


__ = require('./src/helpers/globalFunctions');


/* Start Express server. */
app.listen(app.get('port'), (req, res) => {
  console.log(`%s App is running at ${__.serverBaseUrl()} `, chalk.green('✓'));
  console.log('Press CTRL-C to exit');
});

module.exports = app;