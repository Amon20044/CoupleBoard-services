import multer from 'multer';
import path from 'path';
// Storage setup for uploaded files
const storage = multer.memoryStorage();

// File filter (allow only images)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);
  return cb(new Error('Only images are allowed!'), false);
};

// Upload instance
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 5MB file limit
  fileFilter
}).array('images', 100);

export { upload };
