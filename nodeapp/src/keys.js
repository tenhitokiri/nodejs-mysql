module.exports = {
	database: {
		host: process.env.MYSQL_SERVER || 'localhost',
		user: process.env.MYSQL_USER || 'root',
		password: process.env.MYSQL_PW || '.4C3r04dm1n',
		database: process.env.MYSQL_DB || 'links',
		port: process.env.MYSQL_PORT || 3306
	}
};