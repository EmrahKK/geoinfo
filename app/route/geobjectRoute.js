module.exports = function (app) {
	var geobjectController = require('../controller/geobjectCtrlr');

	app.route('/geoinfo/v1/geobject').get(geobjectController.list);
    app.route('/geoinfo/v1/geobject/near').get(geobjectController.near);
    app.route('/geoinfo/v1/geobject').post(geobjectController.create);
    app.route('/geoinfo/v1/geobject/:objectId').delete(geobjectController.delete);
    app.route('/geoinfo/v1/geobject/:objectId').get(geobjectController.get);
};