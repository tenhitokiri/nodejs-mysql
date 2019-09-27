const bcrypt = require('bcryptjs');

const helpers = {};

helpers.Encryptpwd = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

helpers.comparepwd = async (password, savedpwd) => {
	try {
		return await bcrypt.compare(password, savedpwd);
	} catch (e) {
		console.log(e);
	}
};

module.exports = helpers;
