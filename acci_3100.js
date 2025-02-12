var https = require('https');
var fs = require('fs');
const express = require('express');
const app = express();

var https_options = {
    key: fs.readFileSync("/etc/apache2/ssl/private.key"),
    cert: fs.readFileSync("/etc/apache2/ssl/public.crt"),
    ca: fs.readFileSync('/etc/apache2/ssl/intermediate.crt')
};

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

// const api = require('./service/app');
// app.use(api);

var server = https.createServer(https_options, app);
var port = process.env.PORT || 3100;
server.listen(port, function () {
    console.log('Hello IREALLYHOST listening on port ' + server.address().port);
});

app.use(express.static(__dirname + '/www'));

const api = require('./service/app');
app.use(api);

const app2022 = require('./service/app2022');
app.use(app2022);

