var Geobject = require('mongoose').model('geobject');

exports.list = function (req, res) {
    var page = 0;
    if (!isNaN(req.query.page))
        page = req.query.page;
    Geobject
        .find()
        .skip(page * 50)
        .limit(50)
        .exec(function (err, geobjects) {
            if (!err) {
                return res
                    .status(200)
                    .json(geobjects);
            } else {
                return res
                    .status(400)
                    .json({ "message": "Operation fail.", "error": err });
            }
        });
}

exports.create = function (req, res) {
    var geobject = new Geobject(req.body);
    geobject.save(function (err) {
        if (err) {
            return res
                .status(400)
                .json({ "message": "Operation fail.", "error": err });
        } else {
            return res
                .status(200)
                .json(geobject);
        }
    });
}

exports.near = function (req, res) {
    if (isNaN(req.query.lat) || isNaN(req.query.lon) || isNaN(req.query.maxDistance)) {
        return res
            .status(404)
            .json({ "message": "lat, lon and maxDistance parameters required!" });
    } else {
        var lat = parseFloat(req.query.lat);
        var lon = parseFloat(req.query.lon);
        var maxDistance = parseFloat(req.query.maxDistance);
        var tags = [];

        if (Array.isArray(req.query.tags)) {
            tags = req.query.tags;
        } else {
            tags = [req.query.tags];
        }

        var point = {
            type: "Point",
            coordinates: [lon, lat]
        };

        var geoOptions = {
            spherical: true,
            maxDistance: maxDistance,
            num: 10
        };
        if (req.query.tags) {
            geoOptions.query = {
                tags: {
                    $in: tags
                }
            }
        }
        //console.log("geoOptions " + req.query.tags);

        Geobject
            .geoNear(point, geoOptions, function (err, results, stats) {
                if (err) {
                    return res
                        .status(400)
                        .json({ "message": "Operation fail.", "error": err });
                } else {
                    return res
                        .status(200)
                        .json(results);
                }
            });
    }
}

exports.delete = function (req, res) {
    Geobject
        .remove({
            _id: req.objecId
        }, function (err) {
            if (err) {
                return res
                    .status(400)
                    .json({ "message": "Operation fail.", "error": err });
            } else {
                // removed!
                return res.json({ "message": "Operation succesfull." })
            }
        });
}

exports.get = function (req, res) {
    Geobject
        .findOne({ _id: req.objecId })
        .exec(function (err, geobject) {
            if (!err) {
                if (geobject) {
                    return res
                        .status(200)
                        .json(geobject);
                } else {
                    return res
                        .status(404)
                        .json({ "message": "Geobject not found." });
                }

            } else {
                return res
                    .status(400)
                    .json({ "message": "Operation fail.", "error": err });
            }
        });
}

exports.update = function (req, res) {
    Geobject
        .findOneAndUpdate({
            _id: req.objecId
        }, req.body, {
            new: true,
            upsert: true
        }, function (err, geobject) {
            if (err) {
                return res
                    .status(400)
                    .json({ "message": "Operation fail.", "error": err });
            } else {
                res.json(geobject);
            }
        });
}

exports.checkObjectIdMiddleware = function (req, res, next) {
    let objecId = req.params.objectId;

    if (!objecId) {
        return res
            .status(404)
            .json({ "message": "ObjectId must be required..." });
    } else {
        req.objecId = objecId;
        next();
    }
}