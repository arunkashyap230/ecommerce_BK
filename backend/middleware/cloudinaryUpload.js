// middleware/cloudinaryUpload.js
const multer = require("multer");
const path = require("path");

// Disk storage temp (optional, you can use memory storage too)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // temp folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);
  cb("Only images are allowed");
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
