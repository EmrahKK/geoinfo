var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var geobjectSchema = new Schema({
    loc: {
        type: {
            type: "String",
            required: true,
            enum: ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon']
        },
        coordinates: []
    },
    data: Schema.Types.Mixed,
    tags: [
        {
            type: String,
            index: true,
            required: true
        }
    ],
    create_date: {
        type: Date,
        default: Date.now
    }
});

geobjectSchema.index({"loc": "2dsphere"});

mongoose.model('geobject', geobjectSchema);