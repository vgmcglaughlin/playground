var express = require('express');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vmPlayground');

app.configure(function () {
    app.use(express.bodyParser());
});

require('./users')(app);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
