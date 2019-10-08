const {Schema, model} = require('mongoose');

const users = new Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = model('Users', users);