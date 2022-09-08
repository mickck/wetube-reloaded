export const localsMiddleware = (req, res, next) => {
  // this is how you going to share w/ data. global variable

  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'wetube';
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
};
