const User = require('../models/user.schema');
const service = require('../services/users.service');
const { validateUserRegistration } = require('../utils/joi/joi');

const registerUser = async (req, res, next) => {
	const { email, password } = req.body;
	const validatedRegistration = validateUserRegistration.validate(req.body);
	if (validatedRegistration.error) {
		const errorMessage = validatedRegistration.error.details.map(
			elem => elem.message
		);
		return res.status(400).json({
			status: 'error',
			code: 400,
			data: 'Bad Request',
			ResponseBody: errorMessage,
		});
	}
	const user = await service.getUserByEmail(email);
	if (user) {
		return res.status(409).json({
			status: 'fail',
			code: 409,
			data: 'Conflict',
			ResponseBody: {
				message: 'Email in use',
			},
		});
	}
	try {
		const newUser = new User({ email, password });
		newUser.setPassword(password);
		await newUser.save();
		const response = {
			user: {
				email: newUser.email,
				subscription: newUser.subscription,
			},
		};
		res.status(201).json({
			status: 'success',
			code: 201,
			data: 'Created',
			ResponseBody: response,
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
};

module.exports = {
	registerUser,
};
