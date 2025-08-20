const userModel = require('../models/userModel');

const preferences= (req, res) => {
    const { email } = req.user;
    const user = userModel.user.find(u => u.email === email);
res.status(200).send(user.preferences);
};

module.exports = { preferences };