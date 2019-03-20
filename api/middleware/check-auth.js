const jwt = require("jsonwebtoken");
const jwtKEY = require("../../config/keys").jwtKEY;

module.exports = (req, res, next) => {
	// next();
	try {
		const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.cookies.token;
		const decoded = jwt.verify(token, jwtKEY);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: false
		});
	}
};
