
const IsBodyExist = ((req: { method: string; body: {}; }, res: { sendStatus: (arg0: number) => void; }, next: () => void) => {
  if ((req.method == 'POST' || req.method == 'PUT') && Object.keys(req.body).length == 0) {
    res.sendStatus(400);
  }
  else
    next();
});

module.exports = IsBodyExist;