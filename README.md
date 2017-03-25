### list geoobjects
GET http://localhost:3017/geoinfo/v1/geobject

### get near objects
GET http://localhost:3017/geoinfo/v1/geobject/near?lat=1&lon=2&maxDistance=30

### create geobject
POST http://localhost:3017/geoinfo/v1/geobject
Content-Type: application/json

{
    "data": {
        "test": "test",
        "numbertest": 123
    },        
    "tags": [
        "Building"
    ],
    "loc": {
        "type": "Point",
        "coordinates": [
            -73.88,
            40.78
        ]
    }
}

### delete geobject
DELETE http://localhost:3017/geoinfo/v1/:objectId