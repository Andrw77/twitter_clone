function alerts(req, res, next) {
  res.locals.failureFlash = req.flash();
  next();
}

module.exports = alerts;
