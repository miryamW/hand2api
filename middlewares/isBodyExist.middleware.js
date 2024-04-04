
const IsBodyExist = ((req, res, next) => {
  if ((req.method == 'POST' || req.method == 'PUT') && Object.keys(req.body).length == 0) {
    res.sendStatus(400);
  }
  else
    next();
});

module.exports = IsBodyExist;