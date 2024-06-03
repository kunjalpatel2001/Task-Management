const bcrypt = require('bcrypt');

exports.signupmidal = async(req, res, next) => {
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = encryptedPassword;
    next();
}