const mongoose = require('mongoose');

const signup = new mongoose.Schema({
    username: String,
    email: String,
    role: String,
    key: String,
    password: String,
    token: String,
})

const User = mongoose.model('User', signup)

module.exports = User