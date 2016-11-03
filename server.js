var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect("mongodb://admin:adminpass1010@ds143777.mlab.com:43777/heroku_hgd2t1g7");

var Resource = app.resource = restful.model('resources', mongoose.Schema({
    title: String,
    year: Number,
  }))
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/api/resources');

app.listen(3000);
console.log('Server is running at port 3000');
