module.exports = function (req, res, next) {
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  } else {
    next();
  }
};
