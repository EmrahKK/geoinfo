module.exports = function(app) {
    var index = require('../controller/indexCtrlr');
    app.get('/geoinfo/v1', index.render);
};