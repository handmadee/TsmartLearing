const jwt = require('jsonwebtoken');
const { ForbiddenError } = require('../core/error.response');

module.exports = (roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                throw new ForbiddenError('Token is required');
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                throw new ForbiddenError('Token is required');
            }
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (!roles.includes(payload.role)) {
                throw new ForbiddenError('You do not have access to this resource');
            }
            req.user = payload;
            next();
        } catch (error) {
            next(new ForbiddenError('Invalid or missing token'));
        }
    };
}
