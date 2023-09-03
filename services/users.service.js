const User = require('../models/user.schema');

// const getUser = async body => User.findOne(body);

// module.exports = { getUser };

const getUserByEmail = async email => {
	return User.findOne({ email });
};

module.exports = {
	getUserByEmail,
};
