var appdb = 'mongodb://librausr:H679f#dfh54sh6@mongodb.ibb.gov.tr:27017/geoinfo';

if (process.env.NODE_ENV) 
    appdb = 'mongodb://localhost/geoinfo';

module.exports = {
    db: appdb,    
    sessionSecret: '!6!4pzGRL*=s?ge-',
    secret: '$8gBva%$pG#&v!Jk'
};