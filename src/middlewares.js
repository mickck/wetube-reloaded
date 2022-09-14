import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  // this is how you going to share w/ data. global variable

  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.loggedInUser = req.session.user || {};
  // It's possible loggedInUser is undefined
  next();
};

export const protectorMiddleware = (req, res, next) => {
  //if that user is loggedIn we gonna allow to connect to continue
  if (req.session.loggedIn) {
    // if user loggedIn just next
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 3000000 },
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 10000000 },
});