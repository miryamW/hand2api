const Logger = ((req: { url: any; method: any; }, res: any, next: () => void)=> {
  const now = new Date();
  console.log('api request at: ', now.getHours(),':',now.getMinutes(),'time:',now.getTime(),'url:',req.url,'method:',req.method);
  next();
});

module.exports = Logger;