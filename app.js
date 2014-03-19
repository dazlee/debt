
/**
 * Module dependencies.
 */
require('./db')

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),

    cons = require('consolidate'),
    template_engine = 'dust';

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', template_engine);

app.engine(template_engine, cons.dust);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/account-sheet/:id', routes.accountSheet);
app.post('/create-sheet', routes.createSheet);
app.post('/create-list/:id', routes.createList);

app.listen(3000);
