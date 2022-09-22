import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: "ap-southeast-2",
});

const multerUploader = multerS3({
  s3: s3,
  bucket: "metubeee",
  acl: "public-read",
});
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
    req.flash("error", "Log in first.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 3000000 },
  storage: multerUploader,
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 10000000 },
  storage: multerUploader,
});
