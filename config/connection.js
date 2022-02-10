const { connect, connection} = require('mongoose');

connect('mongodb://localhost/social-network-apiDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

});

module.exports = connection;