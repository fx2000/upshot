const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  (req.session.currentUser) ? next() : next(createError(401));
};

exports.isNotLoggedIn = () => (req, res, next) => {
  (!req.session.currentUser) ? next() : next(createError(403));
};
