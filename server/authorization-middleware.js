const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
function authorizationMiddleware(req, res, next) {
  const { 'react-context-jwt': token } = req.headers;
  if (!token) {
    throw new ClientError(401, 'authentication required');
  }
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
}
module.exports = authorizationMiddleware;
