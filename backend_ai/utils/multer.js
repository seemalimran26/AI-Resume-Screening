const multer = require("multer");

// Store uploaded PDF in memory
const storage = multer.memoryStorage();

// Only allow PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

exports.upload = upload;
