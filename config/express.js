var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    compress = require('compression'),    
    bodyParser = require('body-parser');

module.exports = function () {

    var app = express();

    if (process.env.NODE_ENV)
        app.use(morgan('dev'));
    else
        app.use(morgan('combined'));
        
    app.use(compress());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors());    

    //MIDDLEWARES
    //app.all('/geoinfo/v1/*', [require('../app/middleware/jwtAuthenticate')]);
    //ROUTES
    require('../app/route/indexRoute.js')(app);
    require('../app/route/geobjectRoute')(app);
    // STATIC
    app.use('/geoinfo/static', express.static(__dirname + '/../public'));
    app.use('/geoinfo/view', express.static(__dirname + '/../view'));

    //404 DEFAULT
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err.message);
    });

    return app;
};