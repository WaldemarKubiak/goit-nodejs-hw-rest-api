const User = require('../models/user.schema');

const getUserByEmail = async email => {
	return User.findOne({ email });
};

const loginUser = async (id, token) => {
	return User.findByIdAndUpdate({ _id: id }, { token: token }, { new: true });
};

const getLogoutUser = async id => {
	return User.findByIdAndUpdate({ _id: id }, { token: null }, { new: true });
};

module.exports = {
	getUserByEmail,
	loginUser,
	getLogoutUser,
};
