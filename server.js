var express = require('express');
var app = express();
var router = express.Router();
require('./server/api/routes.js')(router);

app.use(express.static(__dirname + '/public'));
app.use('/api/photos', router);

app.listen(8000);



