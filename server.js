var express = require('express'),
    basicAuth = require('basic-auth-connect'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.use(basicAuth('admin', '12345'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

// mongoose.connect("mongodb://localhost/resources");
mongoose.connect("mongodb://admin:adminpass1010@ds143777.mlab.com:43777/heroku_hgd2t1g7");

var Resource = app.resource = restful.model('resources', mongoose.Schema({
    orderId: { type: Number, required: true, min: 1 }, // Номер заказа
    orderStatus: { type: Number, default: 0 }, // Статус заказа
    orderSum: { type: Number, required: true }, // Сумма заказа
    orderComment: String, // Комментарий к заказу
    customerId: Number, // Id заказчика
    customerName: String, // Имя заказчика
    customerEmail: { type: String, required: true }, // E-mail заказчика
    customerPhone: { type: String, required: true }, // Телефон заказчика
    customerDiscount: Number, // Номер дисконтной карты заказчика
    deliveryAddress: String, // Адрес доставки
    deliveryMethod: { type: Number, default: 1 }, // Тип доставки
    paymentMethod: { type: Number, default: 1 }, // Тип оплаты
    orderProductList: [{
        productId : { type: Number, required: true, min: 1 }, // Id товара
        productQuantity: { type: Number, required: true, min: 1 }, // Количество товара
        productPrice: { type: Number, required: true }, // Стоимость товара
        productStore: { type: Number, required: true }, // Номер склада
    }],
    createdAt: { type: Date, default: Date.now },
  }))
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/api/resources');

app.listen(port);
console.log('Server is running at port ' + port);
