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
                    .json({"message": "Operation fail.", "error": err});
            }
        });
}

exports.create = function (req, res) {
    var geobject = new Geobject(req.body);
    geobject.save(function (err) {
        if (err) {
            return res
                .status(400)
                .json({"message": "Operation fail.", "error": err});
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
            .json({"message": "lat, lon and maxDistance parameters required!"});
    } else {
        var lat = parseFloat(req.query.lat);
        var lon = parseFloat(req.query.lon);
        var maxDistance = parseFloat(req.query.maxDistance);

        var point = {
            type: "Point",
            coordinates: [lon, lat]
        };
        var geoOptions = {
            spherical: true,
            maxDistance: maxDistance,
            num: 10
        };

        Geobject.geoNear(point, geoOptions, function (err, results, stats) {
            if (err) {
                return res
                    .status(400)
                    .json({"message": "Operation fail.", "error": err});
            } else {
                return res
                    .status(200)
                    .json(results);
            }
        });
    }
}