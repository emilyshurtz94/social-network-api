const { connect, connection} = require('mongoose');

connect('mongodb://localhost/thoughtsAndResponses', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = connection;