var appdb = 'mongodb://localhost/geoinfo';

if (process.env.NODE_ENV) 
    appdb = 'mongodb://localhost/geoinfo';

module.exports = {
    db: appdb,    
    sessionSecret: '!6!4pzGRL*=s?ge-',
    secret: '$8gBva%$pG#&v!Jk'
};