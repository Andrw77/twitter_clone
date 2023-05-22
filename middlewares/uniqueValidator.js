function uniqueValidator(error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const props = {
      type: "unique",
      path: "username and/or email",
      message: "There was a duplicate key error",
    };
    req.flash = { type: "failureFlash", message: "Hola" };
    next(new mongoose.Error.ValidatorError(props));
  }
  next();
}

module.exports = uniqueValidator;
