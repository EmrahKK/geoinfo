module.exports = function (app) {
    var geobjectController = require('../controller/geobjectCtrlr');

    // list geobjects
    app
        .route('/geoinfo/v1/geobject')
        .get(geobjectController.list);
    // get near geobjects
    app
        .route('/geoinfo/v1/geobject/near')
        .get(geobjectController.near);    
    // cerate new a geobject
    app
        .route('/geoinfo/v1/geobject')
        .post(geobjectController.create);
    // delete a geobject
    app
        .route('/geoinfo/v1/geobject/:objectId')
        .delete(geobjectController.checkObjectIdMiddleware, geobjectController.delete);
    // get a geobject
    app
        .route('/geoinfo/v1/geobject/:objectId')
        .get(geobjectController.checkObjectIdMiddleware, geobjectController.get);    
    // upsert a geobject
    app
        .route('/geoinfo/v1/geobject/:objectId')
        .put(geobjectController.checkObjectIdMiddleware, geobjectController.update);
};